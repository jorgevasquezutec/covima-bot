import { Actividades, TipoAsistencia, Asistencia, FilterAsistencia } from '~/models';
import { parseCustomDate,parseDateAtMidnight } from '~/utils';

export const enableToRegister = (
  actividadesMap: Map<TipoAsistencia, Actividades>,
  TipoAsistencia: TipoAsistencia,
) => {
  const actividad = actividadesMap.get(TipoAsistencia);
  if (!actividad) {
    return false;
  }
  const currentDate = new Date();
  const currentDay = currentDate.getDay() + 1;
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const currentTime = hours * 60 + minutes;
  const startTime = parseTime(actividad.hora_inicio);
  const endTime = parseTime(actividad.hora_fin);

  if (actividad.dias.includes(currentDay)) {
    if (currentTime >= startTime && currentTime <= endTime) {
      return true;
    }
  }
  return false;
}

export const filterAsistencia = (
  asistencias: Asistencia[],
  filter: FilterAsistencia | null = null
): Map<string, Asistencia> => {
  const result = new Map<string, Asistencia>();

  const tipo = filter?.tipo ?? null;
  const fecha = filter?.fecha ?? null;

  asistencias.forEach(asistencia => {
   
    const asistenciaDate = parseCustomDate(asistencia.fecha);
    // console.log('asistenciaDate', asistenciaDate);

    const day = asistenciaDate.getDate().toString().padStart(2, '0');
    const month = (asistenciaDate.getMonth() + 1).toString().padStart(2, '0');
    const year = asistenciaDate.getFullYear().toString();
    // const key = `${day}/${month}/${year}-${asistencia.tipo}-${asistencia.telefono}`;
    const key = `${day}/${month}/${year}-${asistencia.tipo}-${asistencia.telefono}`;

    const matchesTipo = !tipo || asistencia.tipo === tipo;
    const matchesFecha = !fecha || (() => {
      const filterDate = parseDateAtMidnight(fecha);
      return (
        asistenciaDate.getFullYear() === filterDate.getFullYear() &&
        asistenciaDate.getMonth() === filterDate.getMonth() &&
        asistenciaDate.getDate() === filterDate.getDate()
      );
    })();

    if (matchesTipo && matchesFecha) {
      result.set(key, asistencia);
    }
  });

  return result;
};


function parseTime(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export const mapActividades = (data: Actividades[]): Map<TipoAsistencia, Actividades> => {
  const actividadesMap: Map<TipoAsistencia, Actividades> = new Map(
    data.map((a: any) => {
      const actividad = new Actividades(
        a.actividades,
        a.descripcion,
        a.hora_inicio,
        a.hora_fin,
        a.dias,
        Number(a.tolerancia)
      );
      return [actividad.actividades, actividad];
    })
  );
  return actividadesMap;
}


