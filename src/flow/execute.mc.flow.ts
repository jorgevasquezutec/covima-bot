import { addKeyword,EVENTS } from '@builderbot/bot'
import { googleSheets } from '~/services/googleSheets'
import { config } from '~/config'
import { formatDateToCustomString } from '~/utils'
import { mapTipoDescripcion } from '~/constants'
import { boleanOption, days } from '~/constants'

export const executeMCFlow = addKeyword(EVENTS.ACTION)
    .addAnswer(`Cuentas con leccion de escuela sabatica? *si/no*`, { capture: true }, async (ctx, { state, fallBack, gotoFlow }) => {
        if (!boleanOption.includes(ctx.body.toLocaleLowerCase())) {
            return fallBack('Tiene que ingresar *si* o *no*')
        }
        await state.update({ leccion: ctx.body })
    })
    .addAnswer(`Cuantos dias leiste la leccion? *1-7*`, { capture: true }, async (ctx, { state, fallBack }) => {
        if (!days.includes(ctx.body.toLocaleLowerCase())) {
            return fallBack('Tiene que ingresar un numero entre *1-7*')
        }
        await state.update({ dias: ctx.body })
    })
    .addAction(async (ctx, { flowDynamic, state }) => {
        await googleSheets.append(config.SPREADSHEET_ID, `${config.REGISTRO_SHEET}`, [
            [state.get('tipo'), formatDateToCustomString(), ctx.name, ctx.from, state.get('leccion'), state.get('dias')],
        ], 'USER_ENTERED');
        const tipo = await state.get("tipo");
        const fecha = await state.get("fecha");
        return await flowDynamic(
            `Gracias ${ctx.name}, has registrado tu asistencia a ${mapTipoDescripcion[tipo]} *(${tipo})* el ${fecha}`
        );
    })