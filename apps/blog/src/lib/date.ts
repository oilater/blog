export function formatDate(date: string | Date): string {
  if (typeof date === 'string') return date;

  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDotDate(date: string | Date): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return String(date);

  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getUTCFullYear()}.${pad(d.getUTCMonth() + 1)}.${pad(d.getUTCDate())}`;
}
