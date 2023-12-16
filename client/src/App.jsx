import { useEffect, useRef, useState } from "react";

function App() {
  const [memos, setMemos] = useState([]);
  const postMemoRef = useRef();
  const style_spacer = {
    borderBottomStyle: "solid",
    borderBottomWidth: "1",
    borderColor: "none",
    borderBottomColor: "black",
  };
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
      const res = await fetch("/api/memos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ memo: parsed_memo_content }),
      });
      const data = await res.json();
      const { id } = data;
      setMemos([...memos, { id, memo: parsed_memo_content }]);
    })();
  }

  useEffect(() => {
    fetch("/api/memos")
      .then((res) => res.json())
      .then((data) => {
        setMemos(data);
      });
  }, []);

  return (
    <>
      <header>
        <h1>Y</h1>
      </header>
      <form
        onSubmit={(e) => onMemoSubmit(e)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.ctrlKey) {
            onMemoSubmit(e);
          }
        }}
      >
        <button style={style_block}>メモする</button>
        <label style={style_block} htmlFor="memo_content">
          メモの内容
        </label>
        <textarea
          style={{ ...style_block, width: "20em", height: "10em" }}
          id="memo_content"
          name="memo_content"
          ref={postMemoRef}
        />
      </form>
      <article>
        <h2>メモ一覧</h2>
        {memos.map(({ memo }, index) => {
          return (
            <article key={index}>
              <p>
                {memo.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <div style={style_spacer} />
            </article>
          );
        })}
      </article>
    </>
  );
}

export default App;
