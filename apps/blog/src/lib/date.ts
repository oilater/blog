export function formatDate(date: string | Date): string {
  if (typeof date === 'string') return date;

  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
