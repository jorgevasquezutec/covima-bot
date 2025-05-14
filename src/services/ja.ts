import { convertToArrayOfObject } from "~/utils";
import { googleSheets } from "~/services/googleSheets";
import { config } from "~/config";
import { enableToRegister, filterAsistencia, mapActividades } from "./logic";
import { FilterAsistencia,TipoAsistencia} from "~/models";
import { getCurrentDateString } from "~/utils";
import { mapTipoDescripcion } from "~/constants";
import { diasSemana } from "~/constants";
import { formato12Horas } from "~/utils";

export const getCurrentJAData = async (filter: FilterAsistencia) => {
    const [
        actividades,
        asistencias,
    ] = await Promise.all([
        googleSheets.read(config.SPREADSHEET_ID, `${config.ACTIVIDADES_SHEET}`),
        googleSheets.read(config.SPREADSHEET_ID, `${config.REGISTRO_SHEET}`),
    ])

    const asistenciasData = filterAsistencia(convertToArrayOfObject(asistencias),filter);
    const mapActividadesData = mapActividades(convertToArrayOfObject(actividades));

    return {
        asistenciasMap: asistenciasData,
        actividadesMap: mapActividadesData,
    }

}
export const valid = async (tipo: TipoAsistencia, phone: string): Promise<string[]> => {
    const fecha = getCurrentDateString()
    const { asistenciasMap, actividadesMap } = await getCurrentJAData({ tipo, fecha })

    const errores: string[] = []

    // const actividad = actividadesMap.get(tipo)
    // if (!enableToRegister(actividadesMap, tipo)) {
    //     if (actividad) {
    //         errores.push(`No puedes registrar tu asistencia a ${mapTipoDescripcion[tipo]} *(${tipo})*  en este momento. *El horario es los dias ${actividad.dias.map(i => diasSemana[i - 1])} de ${formato12Horas(actividad.hora_inicio)} a ${formato12Horas(actividad.hora_fin)}*`)
    //     } else {
    //         errores.push(`No se encontró configuración horaria para ${tipo}.`)
    //     }
    //     return errores
    // }

    const key = `${fecha}-${tipo}-${phone}`
    if (asistenciasMap.has(key)) {
        errores.push(`Ya registraste tu asistencia el ${fecha} a ${mapTipoDescripcion[tipo]} *(${tipo})*.`)
    }

    return errores
}