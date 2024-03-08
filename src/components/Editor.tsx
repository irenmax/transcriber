import TextArea from "antd/es/input/TextArea";
import { FC, useEffect, useState } from "react";
import Markdown from "react-markdown";

type EditorProps = {
  initialValue: string;
};

const Editor: FC<EditorProps> = ({ initialValue }) => {
  const [text, setText] = useState(initialValue);

  useEffect(() => {
    setText(initialValue);
  }, [initialValue]);

  const handleTextEdit = (value: string) => {
    setText(value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        gap: "20px",
        paddingTop: 50,
        width: "100%",
      }}
    >
      <div style={{ flex: 1, maxWidth: "30%", paddingTop: "1em" }}>
        <TextArea
          autoSize
          placeholder="Transcription"
          value={text}
          onChange={(e) => handleTextEdit(e.target.value)}
        />
      </div>
      <div style={{ flex: 1 }}>
        <Markdown>{text}</Markdown>
      </div>
    </div>
  );
};

export default Editor;
