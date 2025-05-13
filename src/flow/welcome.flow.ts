import { addKeyword } from '@builderbot/bot'
import { OptionsText,options } from '~/constants'
import { exitFlow } from './exit.flow'
import { registerFlow } from './register.flow'



export const welcomeFlow = addKeyword(['hi', 'hello', 'hola', 'Hola', 'Holi', 'oli', 'registar'])
    .addAnswer(`🙌 Bievenido a *CovimaBot*
    \nSoy un bot de asistencia para la iglesia *Covima*.
    \nPor favor selecciona la asistencia que deseas registrar:
        `)
    .addAnswer(
        [
             ...OptionsText,
            '*salir* - Salir',
        ].join('\n'),
        { delay: 800, capture: true },
        async (ctx, { fallBack, gotoFlow, endFlow }) => {
            const option = ctx.body.toLocaleLowerCase().trim()
            if (!options.includes(option)) {
                return fallBack('Tiene que ingresar *ma*, *mc*, *gp* o *d13* o *salir*')
            }
            if (option === 'salir') {
                return gotoFlow(exitFlow)
            }
            return gotoFlow(registerFlow)
        }
)