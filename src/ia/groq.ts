import fs from "fs";
import Groq from "groq-sdk";

const groq = new Groq(
    { apiKey: process.env.GROQ_API_KEY }
);
export async function fromAudioToText(filePath: string) {
    const transcription = await groq.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: "whisper-large-v3-turbo",
        response_format: "verbose_json",
    });
    // console.log(transcription.text);
    return transcription.text;
}
// main();    