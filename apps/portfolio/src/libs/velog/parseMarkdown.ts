import he from 'he';
import { Marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-typescript';

const LANGUAGE_MAPPING: Record<string, string> = {
  tsx: 'ts',
  jsx: 'js',
};

export function parseMarkdown(
  post: string | null | undefined,
): string {
  if (!post) return '';

  const decoded = he.decode(post);
  const markedInstance = new Marked();

  markedInstance.use({
    renderer: {
      image({ href, title, text }) {
        const titleAttr = title ? ` title="${title}"` : '';
        return `<img class="velog_image" src="${href}" alt="${text}"${titleAttr} />`;
      },

      codespan({ text }) {
        return `<code class="velog_code">${text}</code>`;
      },

      code({ text, lang }) {
        const langKey = lang?.toLowerCase() || 'typescript';
        const language = LANGUAGE_MAPPING[langKey] || langKey;

        const highlighted = Prism.languages[language]
          ? Prism.highlight(text, Prism.languages[language], language)
          : text;

        return `<pre class="velog_preBlock"><code class="velog_codeInPre velog_code language-${language}">${highlighted}</code></pre>\n`;
      },

      paragraph({ tokens }) {
        const content = this.parser.parseInline(tokens);
        if (content.trim().startsWith('<img')) {
          return `${content}\n`;
        }
        return `<p class="velog_paragraph">${content}</p>\n`;
      },

      strong({ tokens }) {
        return `<strong class="velog_strong">${this.parser.parseInline(tokens)}</strong>`;
      },

      em({ tokens }) {
        return `<em class="velog_em">${this.parser.parseInline(tokens)}</em>`;
      },

      heading({ tokens, depth }) {
        const content = this.parser.parseInline(tokens);
        return `<h${depth} class="velog_heading${depth}">${content}</h${depth}>\n`;
      },

      link({ href, title, tokens }) {
        const content = this.parser.parseInline(tokens);
        const titleAttr = title ? ` title="${title}"` : '';
        return `<a class="velog_link" href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer">${content}</a>`;
      },

      blockquote({ tokens }) {
        const content = this.parser.parse(tokens);
        return `<blockquote class="velog_blockquote">${content}</blockquote>\n`;
      },

      hr() {
        return `<hr class="velog_hr" />\n`;
      },

      list({ items, ordered, start }) {
        const type = ordered ? 'ol' : 'ul';
        const startAttr =
          ordered && start !== 1 ? ` start="${start}"` : '';

        let content = '';
        for (const item of items) {
          content += `<li class="velog_listItem">${this.parser.parse(item.tokens)}</li>\n`;
        }

        return `<${type} class="velog_list"${startAttr}>\n${content}</${type}>\n`;
      },
    },
  });

  return markedInstance.parse(decoded, {
    gfm: true,
    breaks: true,
    async: false,
  }) as string;
}
