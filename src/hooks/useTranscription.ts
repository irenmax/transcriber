import { message } from "antd";

type UseTranscriptionProps = {
  audioFile: File | null;
  api: "openAi" | "assemblyAi";
  apiKey: string;
};

type Transcript = {
  utterances: {
    speaker: string;
    text: string;
  }[];
};

const mockTranscript: Transcript = {
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

const useTranscription = ({ audioFile, apiKey }: UseTranscriptionProps) => {
  const transcribe = async () => {
    if (!apiKey) {
      message.error("Please provide an API key");
    }
    if (!audioFile) {
      message.error("No audio file provided");
      // return;
    }

    return formatTranscription(mockTranscript);
  };

  const formatTranscription = (transcript: Transcript) => {
    return transcript.utterances
      .map(
        (utterance) => `**Speaker ${utterance.speaker}**: ${utterance.text}  `
      )
      .join("\n");
  };

  return {
    transcribe,
  };
};

export default useTranscription;
