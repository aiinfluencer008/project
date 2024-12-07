import { captureFrames } from "./services/puppeteer.js";
import { generateVideo } from "./services/ffmpeg.js";
import { uploadToYoutube } from "./services/youtube.js";
import { generateAudio } from "./services/audio.js";
import { cleanDirectory } from "./utils/filesystem.js";
import { FRAMES_DIR } from "./config/paths.js";
import fs from "fs/promises"; 
import path from "path";
import { fileURLToPath } from 'url'; 
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename);

const QUESTIONS_FILE = path.join(__dirname, "questions.json");

async function loadQuestions() {
  const data = await fs.readFile(QUESTIONS_FILE, "utf-8");
  return JSON.parse(data);
}

async function saveQuestions(question) {
  await fs.writeFile(path.join(__dirname, "currentques.json"), JSON.stringify(question, null, 2));
}

let questions = await loadQuestions();
let cur = 0;

async function main() {
  try {
    // Load questions from file
     

    if (questions.length === 0 || cur >= questions.length) {
      console.log("No more questions to process.");
      return;
    }

    // Take the first question

    await saveQuestions(questions[cur]);

    console.log(`Processing question: ${questions[cur].question}`);

    // Capture frames
    await captureFrames();

    const audioPath = await generateAudio(
      cur,
      questions[cur].question + " " + 
      questions[cur].options.map((option, index) => `${index + 1}. ${option}`).join(", ")
    );


    const videoPath = await generateVideo(0, audioPath);

    // // Upload to YouTube
    const videoId = await uploadToYoutube(videoPath, questions[cur]);
    console.log(`Uploaded video: https://youtu.be/${videoId}`);

    // Clean up frames
    cleanDirectory(FRAMES_DIR);

    cur++;

    console.log("Task completed successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Service is running!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


main();

let isProcessing = false;

async function main1() {
  if (isProcessing) {
    console.log("A process is already running. Skipping.");
    return;
  }

  try {
    isProcessing = true;
    if (cur >= questions.length) {
      console.log("All questions processed. Stopping.");
      return;
    }
    main();
  } catch (error) {
    console.error("Processing error:", error);
  } finally {
    isProcessing = false;
  }
}


const intervalId = setInterval(main1, 5*5 * 60 * 1000);


process.on('SIGINT', () => {
  clearInterval(intervalId);
  console.log("Process terminated");
  process.exit();
});


export default  main1;