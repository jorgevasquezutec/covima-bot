import { TipoAsistencia } from "./models"

export const options = ['ma', 'mc', 'gp', 'd13', 'salir']
export const boleanOption = ['si', 'no']
export const days = ['1', '2', '3', '4', '5', '6', '7']
export const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
export const mapTipoDescripcion = {
    [TipoAsistencia.MA]: 'Maranatha Adoración',
    [TipoAsistencia.MC]: 'Maranatha Class',
    [TipoAsistencia.GP]: 'Grupo Pequeño',
    [TipoAsistencia.D13]: 'Dicipulo 13',
}

export const OptionsText = Object.entries(mapTipoDescripcion)
    .map(([key, value]) => `*${key.toLowerCase()}* - ${value}`)


export const MAP_MA_ROL = {
    'Bienvenida': 'Bienvenida',
    'OracionInicial': 'Oración Inicial',
    'EspacioDeCantos': 'Espacio de Cantos',
    'OracionIntercesora': 'Oración Intercesora',
    'NotiJoven': 'NotiJoven',
    'Dinamica': 'Dinámica',
    'Reavivados': 'Reavivados',
    'Especial': 'Especial',
    'Tema': 'Tema',
    'HimnoFinal': 'Himno Final',
    'OracionFinal': 'Oración Final', 
}
