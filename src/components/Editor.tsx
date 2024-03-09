import { Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FC, useEffect, useState } from "react";
import Markdown from "react-markdown";

type EditorProps = {
  initialValue: string;
};

const Editor: FC<EditorProps> = ({ initialValue }) => {
  const [text, setText] = useState(initialValue);
  const [mode, setMode] = useState<"raw" | "formatted">("formatted");

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
        flexDirection: "column",
        gap: 20,
        paddingTop: 50,
        width: "100%",
      }}
    >
      <Radio.Group
        defaultValue={mode}
        onChange={(e) => setMode(e.target.value)}
      >
        <Radio.Button value="raw">Raw</Radio.Button>
        <Radio.Button value="formatted">Formatted</Radio.Button>
      </Radio.Group>
      {mode === "raw" ? (
        <div style={{ flex: 1, paddingTop: "1em" }}>
          <TextArea
            autoSize={{ minRows: 10 }}
            placeholder="Transcription"
            value={text}
            onChange={(e) => handleTextEdit(e.target.value)}
          />
        </div>
      ) : (
        <div style={{ flex: 1 }}>
          <Markdown>{text}</Markdown>
        </div>
      )}
    </div>
  );
};

export default Editor;
