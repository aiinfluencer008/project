import fs from 'fs';
import {  OUTPUT_DIR } from '../config/paths.js';
import path from 'path';

export async function generateAudio(questionIndex, text) {
    console.log(text);
    const finaltext = '{"text":' + `"${text}",` + '"model_id":"eleven_turbo_v2_5"}';
    console.log(finaltext);
    const options = {
        method: 'POST',
        headers: {
          'xi-api-key': 'sk_b69d6dee5c0d39af732cdfbd378700b853dd7a5e7a65dd8a',
          'Content-Type': 'application/json'
        },
        body: finaltext
    };

  const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/yRis6UiS4dtT4Aqv72DC', options);
  const audioBuffer = await response.arrayBuffer();
  const audioPath = path.join(OUTPUT_DIR, `audio-question-${questionIndex}.mp3`);
  fs.writeFileSync(audioPath, Buffer.from(audioBuffer));
  return audioPath;
}