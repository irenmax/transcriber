import { message } from "antd";

type UseTranscriptionProps = {
  audioFile: File | null;
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

const useTranscription = ({ audioFile }: UseTranscriptionProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  const transcribe = async () => {
    if (!audioFile) {
      messageApi.error("No audio file provided");
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
    messageContext: contextHolder,
  };
};

export default useTranscription;
