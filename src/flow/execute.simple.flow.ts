import { addKeyword,EVENTS } from '@builderbot/bot'
import { googleSheets } from '~/services/googleSheets'
import { config } from '~/config'
import { formatDateToCustomString } from '~/utils'
import { mapTipoDescripcion } from '~/constants'

export const executeSimple = addKeyword(EVENTS.ACTION).addAction(
    async (ctx, { state, flowDynamic }) => {
        await googleSheets.append(config.SPREADSHEET_ID, `${config.REGISTRO_SHEET}`, [
            [state.get('tipo'), formatDateToCustomString(), ctx.name, ctx.from],
        ], 'USER_ENTERED');
        const tipo = await state.get("tipo");
        const fecha = await state.get("fecha");
        return await flowDynamic(
            `Gracias ${ctx.name}, has registrado tu asistencia a ${mapTipoDescripcion[tipo]} *(${tipo})* el ${fecha}`
        );
    })