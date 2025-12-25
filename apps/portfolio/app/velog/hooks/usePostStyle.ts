import { marked, Tokens } from 'marked';
import Prism from 'prismjs';
import { useCallback } from 'react';
import * as styles from '../styles/Markdown.css';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-typescript';

const LANGUAGE_MAPPING: Record<string, string> = {
  tsx: 'ts',
  jsx: 'js',
};

const HEADING_CLASS = {
  1: styles.postHeading1,
  2: styles.postHeading2,
  3: styles.postHeading3,
  4: styles.postHeading4,
  5: styles.postHeading5,
  6: styles.postHeading6,
} as const;

export function useVelogStyle() {
  const addStyleAsync = useCallback(async (markdown: string) => {
    if (typeof window === 'undefined' || !markdown) return markdown;

    const decodedMarkdown = markdown
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&#39;/g, "'")
      .replace(/&#x27;/g, "'")
      .replace(/&#x2F;/g, '/');

    const renderer = new marked.Renderer();

    renderer.code = ({ text, lang }: Tokens.Code) => {
      const language =
        (lang && LANGUAGE_MAPPING[lang]) || lang || 'ts';

      const highlighted = Prism.languages[language]
        ? Prism.highlight(text, Prism.languages[language], language)
        : text;

      return `
        <pre class="${styles.postPreBlock}">
          <code class="${styles.postCodeInPre} language-${language}">
${highlighted}
          </code>
        </pre>
      `;
    };

    renderer.paragraph = ({ tokens }: Tokens.Paragraph) =>
      `<p class="${styles.postParagraph}">
        ${renderer.parser.parseInline(tokens)}
      </p>`;

    renderer.heading = ({ tokens, depth }: Tokens.Heading) => {
      const text = renderer.parser.parseInline(tokens);
      const headingClass =
        HEADING_CLASS[depth as 1 | 2 | 3 | 4 | 5 | 6];

      return `
    <h${depth} class="${headingClass}">
      ${text}
    </h${depth}>
  `;
    };

    renderer.strong = ({ tokens }: Tokens.Strong) =>
      `<strong class="${styles.postStrong}">
        ${renderer.parser.parseInline(tokens)}
      </strong>`;

    renderer.em = ({ tokens }: Tokens.Em) =>
      `<em class="${styles.postEm}">
        ${renderer.parser.parseInline(tokens)}
      </em>`;

    renderer.codespan = ({ text }: Tokens.Codespan) =>
      `<code class="${styles.postCode}">${text}</code>`;

    renderer.link = ({ href, title, tokens }: Tokens.Link) =>
      `<a
        class="${styles.postLink}"
        href="${href}"
        ${title ? `title="${title}"` : ''}
        target="_blank"
        rel="noopener noreferrer"
      >
        ${renderer.parser.parseInline(tokens)}
      </a>`;

    return marked(decodedMarkdown, {
      gfm: true,
      breaks: true,
      renderer,
    });
  }, []);

  return { addStyleAsync };
}
