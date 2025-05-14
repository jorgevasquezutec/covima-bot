
import {
  GoogleGenAI,
} from '@google/genai';

export async function toAskGemini(
    message: string,
    contents: {role: string; parts : {text: string}[]}[],
) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: 'text/plain',
    systemInstruction: [
        {
          text: `Todo lo que te diga traduce al ingles pero solo retorna la trauduccion`,
        }
    ],
  };
  const model = 'gemini-2.5-flash-preview-04-17';
//   const contents = [
//     {
//       role: 'user',
//       parts: [
//         {
//           text: `hola`,
//         },
//       ],
//     },
//     {
//       role: 'model',
//       parts: [
//         {
//           text: `Thinking Process:

// 1.  **Identify the user's request:** The user said "Todo lo que te diga traduce al ingles". This means I need to translate everything they say from Spanish to English.
// 2.  **Identify the user's current input:** The user said "hola".
// 3.  **Translate the input:** The Spanish word "hola" translates to "hello" in English.
// 4.  **Format the output:** Since the standing instruction is to translate everything, the output should just be the English translation.`,
//         },
//         {
//           text: `Hello`,
//         },
//       ],
//     },
//     {
//       role: 'user',
//       parts: [
//         {
//           text: `INSERT_INPUT_HERE`,
//         },
//       ],
//     },
//   ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  const textArray: string[] = [];
  for await (const chunk of response) {
    textArray.push(chunk.text);
  }
  return textArray;
//   for await (const chunk of response) {
//     console.log(chunk.text);
//   }
}

// main();
