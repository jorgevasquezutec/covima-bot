export const convertToArrayOfObject = (data: any): any[] => {
    const [rawHeaders, ...rows] = data;
    const headers = rawHeaders.map(normalizar);
    const result = rows.map(row => {
        const obj: Record<string, string> = {};
        headers.forEach((key, i) => {
            obj[key] = row[i] ?? null; // Usa null si falta el valor
        });
        return obj;
    });

    return result;
}

const normalizar = (str: string): string  =>{
  return str
    .toLowerCase()
    .normalize('NFD') // separa tildes
    .replace(/[\u0300-\u036f]/g, '') // elimina tildes
    .replace(/\s+/g, '_'); // reemplaza espacios por _
}

export const getCurrentDateString = () => {
    return new Date().toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })
}


export function formatDateToCustomString(date: Date = new Date()): string {
  const pad = (n: number) => n.toString().padStart(2, '0');

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // Los meses van de 0 a 11
  const year = date.getFullYear();

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
export function parseCustomDate(dateString: string): Date {
  const [datePart, timePart] = dateString.trim().split(' ');
  const [day, month, year] = datePart.split('/').map(Number);
  const [hours, minutes, seconds] = timePart.split(':').map(Number);

  return new Date(year, month - 1, day, hours, minutes, seconds);
}

export function parseDateAtMidnight(dateString: string): Date | null {
  const [day, month, year] = dateString.trim().split('/').map(Number);

  if ([day, month, year].some(v => isNaN(v))) return null;

  return new Date(year, month - 1, day, 0, 0, 0);
}

export function formato12Horas(hora: string): string {
    const [h, m] = hora.split(':').map(Number)
    const sufijo = h >= 12 ? 'p.m.' : 'a.m.'
    const hora12 = h % 12 === 0 ? 12 : h % 12
    return `${hora12}:${m.toString().padStart(2, '0')} ${sufijo}`
}