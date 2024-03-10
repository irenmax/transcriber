import { FileMarkdownOutlined } from "@ant-design/icons";
import { Button, Radio, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FC, useState } from "react";
import Markdown from "react-markdown";

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
  fileName: string;
};

const Editor: FC<EditorProps> = ({ value, onChange, fileName }) => {
  const [mode, setMode] = useState<"raw" | "formatted">("formatted");

  const downloadTextAsFile = () => {
    if (!value) {
      message.error("No text to download");
      return;
    }
    const element = document.createElement("a");
    const file = new Blob([value], { type: "text/plain" });

    element.href = URL.createObjectURL(file);
    element.download = fileName + ".md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
      <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
        <Radio.Group
          defaultValue={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <Radio.Button value="raw">Raw</Radio.Button>
          <Radio.Button value="formatted">Formatted</Radio.Button>
        </Radio.Group>
        <Button icon={<FileMarkdownOutlined />} onClick={downloadTextAsFile}>
          Download MD
        </Button>
      </div>
      {mode === "raw" ? (
        <div style={{ flex: 1, paddingTop: "1em" }}>
          <TextArea
            autoSize={{ minRows: 10 }}
            placeholder="Transcription"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      ) : (
        <div style={{ flex: 1 }}>
          <Markdown>{value}</Markdown>
        </div>
      )}
    </div>
  );
};

export default Editor;
