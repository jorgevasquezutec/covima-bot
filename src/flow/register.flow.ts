
import { addKeyword } from '@builderbot/bot'
import {validationFlow} from './validation.flow'

export const registerFlow = addKeyword(['d13', 'D13', 'ma', 'MA', 'mc', 'MC', 'gp', 'GP'])
    .addAction(async (ctx, { state, gotoFlow }) => {
        const tipo = ctx.body.toLocaleUpperCase().trim()
        await state.update({ tipo: tipo, number: ctx.from })
        return gotoFlow(validationFlow)
    })
