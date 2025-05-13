export class  Actividades {
    actividades : TipoAsistencia
    descripcion : string
    hora_inicio : string
    hora_fin : string
    dias : number []
    tolerancia : number

    constructor(actividades: string, descripcion: string, hora_inicio: string, hora_fin: string, dias: string, tolerancia: number) {
        this.actividades = TipoAsistencia[actividades as keyof typeof TipoAsistencia];
        this.descripcion = descripcion;
        this.hora_inicio = hora_inicio;
        this.hora_fin = hora_fin;
        this.dias = dias ? dias.split(',').map((dia) => parseInt(dia.trim())) : [];
        this.tolerancia = tolerancia;
    }
}

export enum TipoAsistencia {
    MC = 'MC',
    MA = 'MA',
    GP = 'GP',
    D1 = 'D1',
    D2 = 'D2',
    D13 = 'D13',
    R7 = 'R7',
}

export class Asistencia{
    tipo: TipoAsistencia
    fecha: string
    nombres_y_apellidos: string
    telefono: string
    leccion: string;
    dias_estudiados: number

    constructor(tipo: string, fecha: string, nombres_y_apellidos: string, telefono: string, leccion: string, dias_estudiados: string) {
        this.tipo = TipoAsistencia[tipo as keyof typeof TipoAsistencia];
        this.fecha = fecha;
        this.nombres_y_apellidos = nombres_y_apellidos;
        this.telefono = telefono;
        this.leccion = leccion;
        this.dias_estudiados = parseInt(dias_estudiados);
    }
}


export type FilterAsistencia = {
  tipo: TipoAsistencia | null;
  fecha: string | null;
}

