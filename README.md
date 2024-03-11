# Transcriber

This simple and basic tool takes an audio file and produces a transcript with the [AsseblyAI](https://www.assemblyai.com/) or [OpenAI](https://platform.openai.com/docs/guides/speech-to-text) transcript API. It comes with a player and Markdown editor to do some basic editing while listening to the audio file.  

> ⚠️ You need an API key for one of these APIs - currently, AssemblyAI offers 100 hours of free transcription

## How to transcribe
1. Open the settings  
  a. Select whether you want to use AssemblyAI or OpenAI  
  b. Enter the API key for the selected API (this has to be done every time, to keep your API key as private as possible)  
  c. Select the language spoken in the audio file  
3. Upload the audio file you want to transcribe
4. Hit **Transcribe** and wait. This might take a while - make sure to stay on the tab
5. Edit the transcript via the _Raw_ tab or download it as MarkDown file right away.

## Reset editor
The tool saves the transcript locally, in case the tab crashes or something goes wrong. You can reset everything by clicking **Clear transcript** in the settings.

##  Local development
1. run `npm install`
2. run `npm run dev`
