import { addKeyword, EVENTS } from "@builderbot/bot";
import { join } from "path";
import { fromAudioToText } from "../ia/groq";
import ffmpeg from "fluent-ffmpeg";

export const voiceFlow = addKeyword(EVENTS.VOICE_NOTE)
    .addAction(async (ctx, { state, provider, flowDynamic }) => {
        try {
            const storagePath = join(process.cwd(), "storage");
            const saveFilePath = await provider.saveFile(ctx, {
                path: storagePath,
            });

            // Convert .oga to .wav
            const convertedFilePath = saveFilePath.replace(/\.oga$/, ".wav");
            await new Promise((resolve, reject) => {
                ffmpeg(saveFilePath)
                    .toFormat("wav")
                    .on("end", resolve)
                    .on("error", (err) => {
                        console.error("Error converting file:", err);
                        reject(err);
                    })
                    .save(convertedFilePath);
            });

            // Process the converted file
            const text = await fromAudioToText(convertedFilePath);
            // console.log("Transcribed text:", text);
            await flowDynamic(text);

        } catch (error) {
            console.error("Error processing voice note:", error);
            await flowDynamic([{
                body: "Lo siento, hubo un error procesando tu audio.",
            }]);
        }

    });