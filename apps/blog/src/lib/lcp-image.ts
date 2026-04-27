const LCP_IMAGE_PATTERN = /!\[([^\]]*\[lcp\][^\]]*)\]\(([^)\s]+)\)/;

export function findLcpImageSrc(markdownContent: string): string | null {
  const match = markdownContent.match(LCP_IMAGE_PATTERN);
  return match?.[2] ?? null;
}
