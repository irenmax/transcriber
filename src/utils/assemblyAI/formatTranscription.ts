import { Transcript } from "assemblyai";

const formatTranscription = (transcript: Transcript) => {
  if (!transcript.utterances) {
    return "";
  }
  return transcript.utterances
    .map((utterance) => `**Speaker ${utterance.speaker}**: ${utterance.text}  `)
    .join("\n");
};

export default formatTranscription;
