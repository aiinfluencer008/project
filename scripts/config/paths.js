import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const FRAMES_DIR = path.join(__dirname, '../../frames');
export const OUTPUT_DIR = path.join(__dirname, '../../output');
export const TEMP_DIR = path.join(__dirname, '../../temp');