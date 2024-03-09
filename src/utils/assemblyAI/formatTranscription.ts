import { AssemblyTranscript } from "../../types/AssemblyTranscript";

const formatTranscription = (transcript: AssemblyTranscript) => {
  return transcript.utterances
    .map((utterance) => `**Speaker ${utterance.speaker}**: ${utterance.text}  `)
    .join("\n");
};

export default formatTranscription;
