import { marked } from 'marked';
import Prism from 'prismjs';

export function parseMarkdown(markdown: string) {
  return marked(markdown, {
    gfm: true,
    breaks: true,
  });
}
