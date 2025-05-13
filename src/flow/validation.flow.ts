
import { addKeyword,EVENTS } from '@builderbot/bot'
import { valid } from '~/services/ja';
import { getCurrentDateString } from '~/utils';
import { TipoAsistencia } from '~/models';
import {executeSimple,executeMCFlow} from '~/flow';


export const validationFlow = addKeyword(EVENTS.ACTION).addAction(
    async (_, { state, gotoFlow, endFlow }) => {
        const tipo = await state.get("tipo");
        const number = await state.get("number");
        const errors = await valid(tipo, number)
        if (errors.length > 0) {
            return endFlow(errors.join('\n'))
        }
        await state.update({ fecha: getCurrentDateString(), valid: true })
        if(tipo === TipoAsistencia.MC){
            return gotoFlow(executeMCFlow)
        }
        return gotoFlow(executeSimple)
    }
);
