import { useState } from "react";
import "./App.css";
import ReactAudioPlayer from "react-audio-player";
import Uploader from "./components/Uploader";
import { Button } from "antd";
import Markdown from "react-markdown";
import TextArea from "antd/es/input/TextArea";
import useTranscription from "./hooks/useTranscription";

function App() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState("");
  const { transcribe, messageContext } = useTranscription({
    audioFile,
  });

  const handleSubmit = async () => {
    const result = await transcribe();
    setTranscript(result);
  };

  const handleTextEdit = (text: string) => {
    setTranscript(text);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 50,
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
          marginBottom: 20,
        }}
      >
        <Uploader onChange={setAudioFile} />
        <Button onClick={handleSubmit} type="primary">
          Transcribe
        </Button>
      </div>

      <ReactAudioPlayer
        src={audioFile ? URL.createObjectURL(audioFile) : ""}
        style={{ width: "100%" }}
        controls
      />
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
            value={transcript}
            onChange={(e) => handleTextEdit(e.target.value)}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Markdown>{transcript}</Markdown>
        </div>
      </div>
      {messageContext}
    </div>
  );
}

export default App;
