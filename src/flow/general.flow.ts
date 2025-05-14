import { addKeyword, EVENTS } from "@builderbot/bot";
import { toAskGemini } from "~/ia/gemini";


export const generalFlow =  addKeyword(EVENTS.WELCOME)
.addAction(async (ctx,{flowDynamic}) => {
    const message = ctx.body;
    const contents = [
        {
            role: 'user',
            parts: [
                {
                    text: message,
                },
            ],
        },
    ];
    const response = await toAskGemini(message, contents);
    for (const text of response) {
        await flowDynamic(text);
    }
    // return response;
})