import { useState } from "react";
import "./App.css";
import ReactAudioPlayer from "react-audio-player";
import Uploader from "./components/Uploader";
import { Button, Drawer, Input, Select } from "antd";
import useTranscription, { ApiType } from "./hooks/useTranscription";
import Editor from "./components/Editor";
import { SettingOutlined } from "@ant-design/icons";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState("");
  const [api, setApi] = useState<ApiType>("assemblyAi");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [language, setLanguage] = useState<"de" | "en">("de");

  const [fileName, setFileName] = useLocalStorage("fileName");

  const { transcribe, loading } = useTranscription({
    api,
    apiKey,
    language: language,
  });

  const handleSubmit = async () => {
    if (loading) return;
    const result = await transcribe(audioFile!);
    setTranscript(result || "");
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

        <Uploader
          onChange={(file) => {
            if (!file) return;
            setAudioFile(file);
            setFileName(file.name.split(".")[0]);
          }}
        />
        <Button
          onClick={handleSubmit}
          type="primary"
          style={{ height: 50 }}
          loading={loading}
        >
          Transcribe
        </Button>
      </div>

      <ReactAudioPlayer
        src={audioFile ? URL.createObjectURL(audioFile) : ""}
        style={{ width: "100%" }}
        controls
      />
      <h2 style={{ width: "100%", marginBottom: 0 }}>{fileName}</h2>
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
          <Select
            defaultValue={language}
            onChange={setLanguage}
            style={{ width: 120 }}
            options={[
              { label: "German", value: "de" },
              { label: "English", value: "en" },
            ]}
          ></Select>
          <Button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            danger
            style={{ marginTop: 50 }}
          >
            Clear transcript
          </Button>
        </div>
      </Drawer>
    </div>
  );
}

export default App;
