import { useState } from "react";
import "./App.css";
import ReactAudioPlayer from "react-audio-player";
import Uploader from "./components/Uploader";
import { Button, Drawer, Input, Select } from "antd";
import useTranscription from "./hooks/useTranscription";
import Editor from "./components/Editor";
import { SettingOutlined } from "@ant-design/icons";

type TransciptionApi = "openAi" | "assemblyAi";

function App() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState("");
  const [api, setApi] = useState<TransciptionApi>("openAi");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const { transcribe } = useTranscription({
    audioFile,
    api,
    apiKey,
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
          alignItems: "flex-start",
          gap: 20,
          marginBottom: 20,
          width: "100%",
        }}
      >
        <Button
          icon={<SettingOutlined />}
          onClick={() => setSettingsOpen(true)}
        />

        <Uploader onChange={setAudioFile} />
        <Button onClick={handleSubmit} type="primary" style={{ height: 50 }}>
          Transcribe
        </Button>
      </div>

      <ReactAudioPlayer
        src={audioFile ? URL.createObjectURL(audioFile) : ""}
        style={{ width: "100%" }}
        controls
      />
      <Editor
        initialValue={transcript}
        fileName={audioFile?.name.split(".")[0] || "transcript"}
      />
      <Drawer
        title="API Settings"
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        placement="left"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Select
            defaultValue={api}
            onChange={setApi}
            style={{ width: 120 }}
            options={[
              { label: "OpenAI", value: "openAi" },
              { label: "AssemblyAI", value: "assemblyAi" },
            ]}
          ></Select>
          <Input
            onChange={(e) => setApiKey(e.target.value)}
            value={apiKey}
            placeholder="API Key"
          />
        </div>
      </Drawer>
    </div>
  );
}

export default App;
