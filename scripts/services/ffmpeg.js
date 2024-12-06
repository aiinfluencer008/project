import ffmpeg from 'fluent-ffmpeg';
import { createRequire } from 'module';
import path from 'path';
import { FRAMES_DIR, OUTPUT_DIR } from '../config/paths.js';
import { ensureDirectoryExists } from '../utils/filesystem.js';

const require = createRequire(import.meta.url);
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
ffmpeg.setFfmpegPath(ffmpegPath);

export async function generateVideo(questionIndex, audioPath) {
  ensureDirectoryExists(OUTPUT_DIR);
  const outputPath = path.join(OUTPUT_DIR, `quiz-${questionIndex}.mp4`);
  
  return new Promise((resolve, reject) => {
    ffmpeg()
    .input(path.join(FRAMES_DIR, 'frame-%03d.png'))
    .inputFPS(1)
    .input(audioPath)
    .input("assets/ramji_song.mp3")
    .complexFilter([
      {
        filter: 'volume',
        options: '1.0',
        inputs: '[1:a]',
        outputs: 'a1'
      },
      {
        filter: 'volume',
        options: '0.3',  // Lowered volume for second audio input
        inputs: '[2:a]',
        outputs: 'a2'
      },
      {
        filter: 'amix',
        options: {
          inputs: 2,
          duration: 'longest'
        },
        inputs: ['a1', 'a2']
      }
    ])
    .audioCodec('aac')
    .videoCodec('libx264')
    .outputOptions([
      '-pix_fmt yuv420p',
      '-preset ultrafast',
      '-r 30'
    ])
    .output(outputPath)
    .on('end', () => resolve(outputPath))
    .on('error', reject)
    .run();
  });
}