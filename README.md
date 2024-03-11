# Transcriber

This simple and basic tool takes an audio file and produces a transcript with the [AsseblyAI](https://www.assemblyai.com/) or [OpenAI](https://platform.openai.com/docs/guides/speech-to-text) transcript API. It comes with a player and Markdown editor to do some basic editing while listening to the audio file.

☕ [Live version of this tool](https://transcriber.irenmax.xyz)

> ⚠️ You need an API key for one of these APIs - currently, AssemblyAI offers 100 hours of free transcription


## How to transcribe
1. Open the settings  
  a. Select whether you want to use AssemblyAI or OpenAI  
  b. Enter the API key for the selected API (this has to be done every time, to keep your API key as private as possible)  
  c. Select the language spoken in the audio file  
3. Upload the audio file you want to transcribe
4. Hit **Transcribe** and wait. Enjoy a cup of coffee, this might take a while depending on the length of your audio. Make sure to stay on the tab.
5. Edit the transcript via the _Raw_ tab or download it as MarkDown file right away.

## APIs
- **OpenAI** offers basic speech-to-text transcription - it is not suitable for interviews as it does not distinguish between speakers. The transcript is just one text.
- **AssemblyAI** is good for interviews as it offers [speaker diarization](https://www.assemblyai.com/docs/speech-to-text/speaker-diarization). The produced transcript highlights spoken text by each speaker.

## Reset editor
The tool saves the transcript locally, in case the tab crashes or something goes wrong. You can reset everything by clicking **Clear transcript** in the settings.

##  Local development
1. run `npm install`
2. run `npm run dev`
