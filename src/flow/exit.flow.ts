import { addKeyword } from '@builderbot/bot'

export const exitFlow = addKeyword(['salir','chau','adios','Salir','Chau','Adios'])
.addAction( async (ctx, { endFlow }) => {
    return endFlow(`Gracias ${ctx.name}, por usar el bot de asistencia.`)
})


export default exitFlow;
