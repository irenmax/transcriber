import { useCallback, useEffect, useState } from "react";
import OpenAI from "openai";
import { message } from "antd";
import formatTranscription from "../utils/assemblyAI/formatTranscription";
import { AssemblyAI } from "assemblyai";

type UseOpenAiProps = {
  api: ApiType;
  apiKey: string;
  language: Language;
};

export type Language = "de" | "en";

export type ApiType = "openAi" | "assemblyAi";

export type TranscriptionApi = {
  transcribe: (audioFile: File) => Promise<string | null>;
  loading: boolean;
};

const useTranscription = ({
  apiKey,
  language,
  api,
}: UseOpenAiProps): TranscriptionApi => {
  const [client, setClient] = useState<OpenAI | AssemblyAI | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!apiKey) {
      return;
    }
    setLoading(true);
    try {
      if (api === "openAi") {
        const client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
        setClient(client);
      }
      if (api === "assemblyAi") {
        const client = new AssemblyAI({ apiKey });
        setClient(client);
      }
    } catch (e) {
      console.log(e);
      message.error("Invalid API key");
    } finally {
      setLoading(false);
    }
  }, [apiKey, api]);

  const transcribe = useCallback(
    async (audioFile: File) => {
      if (!apiKey) {
        message.error("Please enter your API key");
        return null;
      }
      if (!client) {
        message.error("Invalid API key");
        return null;
      }
      setLoading(true);
      try {
        if (api === "openAi") {
          const openAi = client as OpenAI;
          const transcribt = await openAi?.audio.transcriptions.create({
            file: audioFile,
            language: language,
            response_format: "json",
            model: "whisper-1",
          });
          setLoading(false);
          return transcribt.text;
        }
        if (api === "assemblyAi") {
          console.log("transcribe with assembly");
          const assemblyAI = client as AssemblyAI;
          const transcript = await assemblyAI.transcripts.transcribe({
            audio: audioFile,
            speaker_labels: true,
            language_code: language,
          });
          return formatTranscription(transcript);
        }
      } catch (e) {
        console.error(e);
        message.error({ content: "Error transcribing audio", duration: 0 });
      } finally {
        setLoading(false);
      }
      return null;
    },
    [client, api, language, apiKey]
  );

  return {
    transcribe,
    loading,
  };
};

export default useTranscription;
