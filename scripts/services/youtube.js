import { google } from 'googleapis';
import fs from 'fs';
import dotenv from 'dotenv';


dotenv.config();


export async function uploadToYoutube(videoPath, question) {

  const oauth2Client = new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    process.env.YOUTUBE_REDIRECT_URI
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.YOUTUBE_REFRESH_TOKEN
  });

  const youtube = google.youtube('v3');

  const res = await youtube.videos.insert({
    auth: oauth2Client,
    part: 'snippet,status',
    requestBody: {
      snippet: {
        title: question.title,
        description: question.description,
        tags: question.tags
      },
      status: {
        privacyStatus: 'public',
        selfDeclaredMadeForKids: false
      }
    },
    media: {
      body: fs.createReadStream(videoPath)
    }
  });

  return res.data.id;
}