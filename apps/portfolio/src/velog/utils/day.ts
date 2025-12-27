export function getRelativeDays(createdAt: string | Date): string {
  const now = new Date();
  const postDate = new Date(createdAt);
  const diffTime = now.getTime() - postDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffTime / (1000 * 60));

  const isSameDay = now.toDateString() === postDate.toDateString();
  const isYesterday =
    new Date(now.getTime() - 24 * 60 * 60 * 1000).toDateString() ===
    postDate.toDateString();

  if (isSameDay) {
    if (diffHours === 0) {
      if (diffMinutes === 0) {
        return '방금 전';
      }
      return `${diffMinutes}분 전`;
    }
    return `${diffHours}시간 전`;
  }

  if (isYesterday) {
    return '어제';
  }

  if (diffDays < 7) {
    return `${diffDays}일 전`;
  }

  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks}주 전`;
  }

  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months}개월 전`;
  }

  const years = Math.floor(diffDays / 365);
  return `${years}년 전`;
}
