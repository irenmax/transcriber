import { useCallback, useEffect, useMemo, useState } from "react";
import OpenAI from "openai";
import { message } from "antd";
import formatTranscription from "../utils/assemblyAI/formatTranscription";
import { AssemblyTranscript } from "../types/AssemblyTranscript";

const mockAssemblyTranscript: AssemblyTranscript = {
  utterances: [
    {
      speaker: "A",
      text: "Hello",
    },
    {
      speaker: "B",
      text: "World",
    },
    {
      speaker: "A",
      text: "How are you?",
    },
    {
      speaker: "B",
      text: "I'm fine",
    },
  ],
};

type UseOpenAiProps = {
  api: ApiType;
  apiKey: string;
  language: Language;
};

export type Language = "de" | "en";

export type ApiType = "openAi" | "assemblyAi";

export type TranscriptionApi = {
  transcribe: (audioFile: File) => Promise<string | null>;
};

const useTranscription = ({
  apiKey,
  language,
  api,
}: UseOpenAiProps): TranscriptionApi => {
  const [openAi, setOpenAi] = useState<OpenAI | null>(null);

  const initOpenAi = (key: string) => {
    try {
      const client = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true });
      setOpenAi(client);
    } catch (e) {
      console.log(e);
      message.error("Invalid API key");
    }
  };

  useEffect(() => {
    if (!apiKey) {
      return;
    }

    if (api === "openAi") {
      initOpenAi(apiKey);
      return;
    }
  }, [apiKey, api]);

  const transcribeOpenAi = useCallback(
    async (audioFile: File) => {
      if (api !== "openAi") {
        return null;
      }
      if (!openAi) {
        message.error("Invalid API key");
        return null;
      }
      try {
        const transcription = await openAi?.audio.transcriptions.create({
          file: audioFile,
          language: language,
          response_format: "json",
          model: "whisper-1",
        });
        return transcription.text;
      } catch (e) {
        console.error(e);
        message.error("Error transcribing audio");
      }
      return null;
    },
    [openAi, api, language]
  );

  const transcriptionApi: TranscriptionApi = useMemo(() => {
    if (api === "openAi") {
      return {
        transcribe: transcribeOpenAi,
      };
    }

    return {
      transcribe: () =>
        Promise.resolve(formatTranscription(mockAssemblyTranscript)),
    };
  }, [api, transcribeOpenAi]);

  return transcriptionApi;
};

export default useTranscription;
