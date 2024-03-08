import { useState } from "react";
import "./App.css";
import ReactAudioPlayer from "react-audio-player";
import Uploader from "./components/Uploader";
import { Button } from "antd";
import useTranscription from "./hooks/useTranscription";
import Editor from "./components/Editor";

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
      <Editor initialValue={transcript} />
      {messageContext}
    </div>
  );
}

export default App;
