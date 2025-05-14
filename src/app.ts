
import { createBot, createFlow } from '@builderbot/bot'
import { config } from './config'
import {
    welcomeFlow,
    validationFlow,
    executeMCFlow,
    executeSimple,
    exitFlow,
    registerFlow,
    generalFlow,
    localtionFlow,
    voiceFlow,
    
} from './flow'
import { adapterDB } from './database'
import { adapterProvider } from './provider'


const PORT = config.PORT ?? 3008

const main = async () => {
    const adapterFlow = createFlow([
        generalFlow,
        welcomeFlow,
        validationFlow,
        executeSimple,
        executeMCFlow,
        registerFlow,
        exitFlow,
        voiceFlow,
        localtionFlow,
    ])
    const { handleCtx, httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    }, {
        queue: {
            timeout: 20000, //👌
            concurrencyLimit: 50 //👌
        }
    })

    adapterProvider.server.post(
        '/v1/messages',
        handleCtx(async (bot, req, res) => {
            const { number, message, urlMedia } = req.body
            await bot.sendMessage(number, message, { media: urlMedia ?? null })
            return res.end('sended')
        })
    )

    adapterProvider.server.post(
        '/v1/register',
        handleCtx(async (bot, req, res) => {
            const { number, name } = req.body
            await bot.dispatch('REGISTER_FLOW', { from: number, name })
            return res.end('trigger')
        })
    )

    adapterProvider.server.post(
        '/v1/samples',
        handleCtx(async (bot, req, res) => {
            const { number, name } = req.body
            await bot.dispatch('SAMPLES', { from: number, name })
            return res.end('trigger')
        })
    )

    adapterProvider.server.post(
        '/v1/blacklist',
        handleCtx(async (bot, req, res) => {
            const { number, intent } = req.body
            if (intent === 'remove') bot.blacklist.remove(number)
            if (intent === 'add') bot.blacklist.add(number)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({ status: 'ok', number, intent }))
        })
    )

    httpServer(+PORT)
}

main()

