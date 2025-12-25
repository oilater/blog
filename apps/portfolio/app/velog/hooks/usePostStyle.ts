import { marked } from 'marked';
import Prism from 'prismjs';
import { useCallback } from 'react';
import * as styles from '../styles/Markdown.css';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-typescript';

const LANGUAGE_MAPPING: Record<string, string> = {
  tsx: 'ts',
  jsx: 'js',
};

export function useVelogStyle() {
  const addStyleAsync = useCallback(async (html: string) => {
    if (typeof window === 'undefined' || !html) return html;

    const decodedHtml = html
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&#39;/g, "'")
      .replace(/&#x27;/g, "'")
      .replace(/&#x2F;/g, '/');

    const renderer = new marked.Renderer();

    renderer.code = ({ text, lang }) => {
      const language =
        lang && LANGUAGE_MAPPING[lang]
          ? LANGUAGE_MAPPING[lang]
          : (lang ?? 'ts');

      let highlightedCode: unknown;
      if (Prism.languages[language]) {
        highlightedCode = Prism.highlight(
          text,
          Prism.languages[language],
          language,
        );
      } else {
        highlightedCode = text;
      }

      return `<pre class="${styles.postPreBlock}">
<code class="${styles.postCodeInPre} language-${language}">${highlightedCode}</code>
</pre>`;
    };

    const htmlContent = await marked(decodedHtml, {
      pedantic: false,
      gfm: true,
      breaks: true,
      silent: false,
      renderer: renderer,
    });

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    doc.querySelectorAll('p').forEach((p) => {
      p.classList.add(styles.postParagraph);
    });
    doc.querySelectorAll('span').forEach((span) => {
      span.classList.add(styles.postSpan);
    });
    doc.querySelectorAll('strong').forEach((strong) => {
      strong.classList.add(styles.postStrong);
    });
    doc.querySelectorAll('em').forEach((em) => {
      em.classList.add(styles.postEm);
    });
    doc.querySelectorAll('a').forEach((link) => {
      link.classList.add(styles.postLink);
    });
    doc.querySelectorAll('h1').forEach((h) => {
      h.classList.add(styles.postHeading1);
    });
    doc.querySelectorAll('h2').forEach((h) => {
      h.classList.add(styles.postHeading2);
    });
    doc.querySelectorAll('h3').forEach((h) => {
      h.classList.add(styles.postHeading3);
    });
    doc.querySelectorAll('h4').forEach((h) => {
      h.classList.add(styles.postHeading4);
    });
    doc.querySelectorAll('h5').forEach((h) => {
      h.classList.add(styles.postHeading5);
    });
    doc.querySelectorAll('h6').forEach((h) => {
      h.classList.add(styles.postHeading6);
    });
    doc.querySelectorAll('ul, ol').forEach((list) => {
      list.classList.add(styles.postList);
    });
    doc.querySelectorAll('li').forEach((item) => {
      item.classList.add(styles.postListItem);
    });
    doc.querySelectorAll('hr').forEach((hr) => {
      hr.classList.add(styles.postHr);
    });
    doc.querySelectorAll('code').forEach((code) => {
      code.classList.add(styles.postCode);
    });
    doc.querySelectorAll('blockquote').forEach((quote) => {
      quote.classList.add(styles.postBlockquote);
    });

    return doc.body.innerHTML;
  }, []);

  return { addStyleAsync };
}
