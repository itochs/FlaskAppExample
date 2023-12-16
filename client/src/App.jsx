import { useEffect, useRef, useState } from "react";
import { singIn, auth } from "./api/auth/firebase";
import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";

async function getMemos(callback) {
  if (!auth.currentUser) {
    const res = await fetch("/api/memos");
    if (res.ok) {
      const data = await res?.json().catch(() => []);
      callback(data ?? []);
    }
    return;
  }

  const idToken = await auth.currentUser?.getIdToken();
  const userId = auth.currentUser?.uid;
  const res = await fetch(`/api/users/${userId}/memos`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
  });
  if (res.ok) {
    const data = await res?.json().catch(() => []);
    callback(data ?? []);
  }
}

function App() {
  const [memos, setMemos] = useState([]);
  const [user, setUser] = useState(null);
  const postMemoRef = useRef();

  const style_block = { display: "block" };

  function onMemoSubmit(e) {
    e.preventDefault();
    if (!postMemoRef.current) {
      return;
    }

    const memo_content = postMemoRef.current.value.trim();
    postMemoRef.current.value = "";
    if (memo_content === "") {
      return;
    }

    const parsed_memo_content = memo_content
      .split("\n")
      .filter((line) => line !== "");

    (async () => {
      const idToken = await auth.currentUser?.getIdToken();
      const res = await fetch("/api/memos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ memo: parsed_memo_content }),
      });
      const data = await res.json();
      const { id } = data;
      setMemos([...memos, { id, memo: parsed_memo_content }]);
    })();
  }

  useEffect(() => {
    getMemos(setMemos);
  }, [user]);
  console.log(user);

  useEffect(() => {
    getMemos(setMemos);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Box bgColor={"gray.100"} minHeight={"100vh"}>
      <Heading
        as={"header"}
        display={"flex"}
        justifyContent={"space-between"}
        alignContent={"center"}
        bgColor={"gray.500"}
      >
        <Heading
          as={"h1"}
          textAlign={"center"}
          alignSelf={"center"}
          paddingLeft={3}
        >
          Y memo
        </Heading>
        <Box padding={2}>
          <Button
            onClick={() => {
              if (auth.currentUser) {
                auth.signOut();
              } else {
                singIn();
              }
            }}
          >
            {user ? "sign out" : "sign in"}
          </Button>
        </Box>
      </Heading>
      <Box padding={3}>
        <Box padding={1}>
          <form
            onSubmit={(e) => onMemoSubmit(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.ctrlKey) {
                onMemoSubmit(e);
              }
            }}
          >
            <Button>メモする</Button>
            <FormControl>
              <FormLabel style={style_block} htmlFor="memo_content">
                メモの内容
              </FormLabel>
              <Textarea
                bgColor={"white"}
                id="memo_content"
                name="memo_content"
                ref={postMemoRef}
              />
              <FormHelperText>Ctl + Enterで送信</FormHelperText>
            </FormControl>
          </form>
        </Box>
        <Box padding={1}>
          <Heading size="md">メモ一覧</Heading>
          <Stack spacing={3}>
            {memos.map(({ memo }, index) => {
              return (
                <Card key={index}>
                  <CardBody>
                    <Text pt="2" fontSize="sm">
                      {memo.map((line) => (
                        <span key={line}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </Text>
                  </CardBody>
                </Card>
              );
            })}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
