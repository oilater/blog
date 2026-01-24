import type { MDXComponents } from 'mdx/types';
import type { ImageProps } from 'next/image';
import { MdxImage } from './mdx-image';

export const components: MDXComponents = {
  h1: (props) => <h1 className="markdown-h1" {...props} />,
  h2: (props) => <h2 className="markdown-h2" {...props} />,
  h3: (props) => <h3 className="markdown-h3" {...props} />,
  h4: (props) => <h4 className="markdown-h4" {...props} />,
  h5: (props) => <h5 className="markdown-h5" {...props} />,
  h6: (props) => <h6 className="markdown-h6" {...props} />,
  p: (props) => <p className="markdown-p" {...props} />,
  ul: (props) => <ul className="markdown-ul" {...props} />,
  ol: (props) => <ol className="markdown-ol" {...props} />,
  li: (props) => <li className="markdown-li" {...props} />,
  blockquote: (props) => <blockquote className="markdown-blockquote" {...props} />,
  code: (props) => {
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
  pre: (props) => <pre className="markdown-pre" {...props} />,
  a: (props) => {
    const isExternal = props.href?.startsWith('http');
    if (isExternal) {
      return <a className="markdown-link" target="_blank" rel="noopener noreferrer" {...props} />;
    }
    return <a className="markdown-link" {...props} />;
  },
  img: (props: ImageProps) => <MdxImage {...props} />,
  table: (props) => (
    <div className="markdown-table-wrapper">
      <table className="markdown-table" {...props} />
    </div>
  ),
  thead: (props) => <thead className="markdown-thead" {...props} />,
  tbody: (props) => <tbody className="markdown-tbody" {...props} />,
  tr: (props) => <tr className="markdown-tr" {...props} />,
  th: (props) => <th className="markdown-th" {...props} />,
  td: (props) => <td className="markdown-td" {...props} />,
  hr: (props) => <hr className="markdown-hr" {...props} />,
  strong: (props) => <strong className="markdown-strong" {...props} />,
  em: (props) => <em className="markdown-em" {...props} />,
  del: (props) => <del className="markdown-del" {...props} />,
  input: (props) => {
    if (props.type === 'checkbox') {
      return <input {...props} readOnly />;
    }
    return <input {...props} />;
  },
};
