import sanitize from 'sanitize-html';

export function sanitizeHtml(html: string) {
  return sanitize(html, {
    allowedTags: [
      ...sanitize.defaults.allowedTags,
      'img',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'pre',
      'code',
      'span',
      'hr',
    ],
    allowedAttributes: {
      '*': ['class'],
      code: ['class'],
      span: ['class'],
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height'],
    },
  });
}
