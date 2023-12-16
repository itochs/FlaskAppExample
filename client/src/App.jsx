import { useRef, useState } from "react";

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
    setMemos([...memos, parsed_memo_content]);
  }

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
        {memos.map((memo, index) => {
          return (
            <>
              <article key={index}>
                <p>
                  {memo.map((line) => (
                    <>
                      {line}
                      <br />
                    </>
                  ))}
                </p>
              </article>
              <div style={style_spacer} />
            </>
          );
        })}
      </article>
    </>
  );
}

export default App;
