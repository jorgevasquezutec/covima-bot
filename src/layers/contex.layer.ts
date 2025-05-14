// import { geminiLayer } from "@builderbot-plugins/gemini-layer"

// export default async (...bot: any) => await geminiLayer({
//     context: {
//         name: 'Jorge',
//         email: 'jvasquez@utec.edu.pe',
//         summary: 'que debo decir?'
//         // and more properties
//     },
//     // apiKey: process.env.GEMINI_API_KEY, // Removed as it's not part of GeminiOpts
//      cb: async (_, { state, flowDynamic }) => {
//         const { answer } = state.getMyState()
//         console.log('answer about image', answer)

//         return flowDynamic(`*${answer}*`)
//         // if (answer === 'anything else you want to validate') {
//         //     return gotoFlow('any flow you want to go')
//         // }
//     }
// }, bot)