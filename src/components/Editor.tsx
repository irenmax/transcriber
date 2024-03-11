import { FileMarkdownOutlined } from "@ant-design/icons";
import { Button, Radio, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FC, useEffect, useState } from "react";
import Markdown from "react-markdown";
import useLocalStorage from "../hooks/useLocalStorage";

type EditorProps = {
  initialValue: string;
  fileName: string;
};

const Editor: FC<EditorProps> = ({ initialValue, fileName }) => {
  const [mode, setMode] = useState<"raw" | "formatted">("formatted");
  const [transcript, setTranscript] = useLocalStorage("transcript");

  useEffect(() => {
    if (!initialValue || initialValue === "") return;
    setTranscript(initialValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue]);

  const downloadTextAsFile = () => {
    if (!transcript) {
      message.error("No text to download");
      return;
    }
    const element = document.createElement("a");
    const file = new Blob([transcript], { type: "text/plain" });

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
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />
        </div>
      ) : (
        <div style={{ flex: 1 }}>
          <Markdown>{transcript}</Markdown>
        </div>
      )}
    </div>
  );
};

export default Editor;
