
import { addKeyword } from '@builderbot/bot'
import {validationFlow} from './validation.flow'
import { generalFlow } from './general.flow'

export const registerFlow = addKeyword(['d13', 'D13', 'ma', 'MA', 'mc', 'MC', 'gp', 'GP'])
    .addAction(async (ctx, { state, gotoFlow }) => {
        // console.log('ctx', ctx.body)
        const tipo = ctx.body.toLocaleUpperCase().trim()
        if(!['D13', 'MA', 'MC', 'GP'].includes(tipo)) {
            return gotoFlow(generalFlow)
        }
        await state.update({ tipo: tipo, number: ctx.from })
        return gotoFlow(validationFlow)
})
