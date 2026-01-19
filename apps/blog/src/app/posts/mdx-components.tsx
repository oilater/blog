import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import type { ComponentPropsWithoutRef } from 'react';

export const components: MDXComponents = {
  h1: (props: ComponentPropsWithoutRef<'h1'>) => <h1 className="markdown-h1" {...props} />,
  h2: (props: ComponentPropsWithoutRef<'h2'>) => <h2 className="markdown-h2" {...props} />,
  h3: (props: ComponentPropsWithoutRef<'h3'>) => <h3 className="markdown-h3" {...props} />,
  h4: (props: ComponentPropsWithoutRef<'h4'>) => <h4 className="markdown-h4" {...props} />,
  h5: (props: ComponentPropsWithoutRef<'h5'>) => <h5 className="markdown-h5" {...props} />,
  h6: (props: ComponentPropsWithoutRef<'h6'>) => <h6 className="markdown-h6" {...props} />,
  p: (props: ComponentPropsWithoutRef<'p'>) => <p className="markdown-p" {...props} />,
  ul: (props: ComponentPropsWithoutRef<'ul'>) => <ul className="markdown-ul" {...props} />,
  ol: (props: ComponentPropsWithoutRef<'ol'>) => <ol className="markdown-ol" {...props} />,
  li: (props: ComponentPropsWithoutRef<'li'>) => <li className="markdown-li" {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote className="markdown-blockquote" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<'code'>) => {
    const { className, children, ...rest } = props;
    const isInline = !className;
    if (isInline) {
      return (
        <code className="markdown-inline-code" {...rest}>
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...rest}>
        {children}
      </code>
    );
  },
  pre: (props: ComponentPropsWithoutRef<'pre'>) => <pre className="markdown-pre" {...props} />,
  a: (props: ComponentPropsWithoutRef<'a'>) => {
    const isExternal = props.href?.startsWith('http');
    if (isExternal) {
      return <a className="markdown-link" target="_blank" rel="noopener noreferrer" {...props} />;
    }
    return <a className="markdown-link" {...props} />;
  },
  img: (props: ComponentPropsWithoutRef<'img'>) => {
    if (!props.src) return null;

    return (
      <Image
        className="markdown-img"
        src={props.src}
        alt={props.alt || ''}
        width={800}
        height={600}
        quality={90}
        style={{ width: '100%', height: 'auto' }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
        priority={false}
      />
    );
  },
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="markdown-table-wrapper">
      <table className="markdown-table" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<'thead'>) => <thead className="markdown-thead" {...props} />,
  tbody: (props: ComponentPropsWithoutRef<'tbody'>) => <tbody className="markdown-tbody" {...props} />,
  tr: (props: ComponentPropsWithoutRef<'tr'>) => <tr className="markdown-tr" {...props} />,
  th: (props: ComponentPropsWithoutRef<'th'>) => <th className="markdown-th" {...props} />,
  td: (props: ComponentPropsWithoutRef<'td'>) => <td className="markdown-td" {...props} />,
  hr: (props: ComponentPropsWithoutRef<'hr'>) => <hr className="markdown-hr" {...props} />,
  strong: (props: ComponentPropsWithoutRef<'strong'>) => <strong className="markdown-strong" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => <em className="markdown-em" {...props} />,
  del: (props: ComponentPropsWithoutRef<'del'>) => <del className="markdown-del" {...props} />,
  input: (props: ComponentPropsWithoutRef<'input'>) => {
    if (props.type === 'checkbox') {
      return <input {...props} readOnly />;
    }
    return <input {...props} />;
  },
};
