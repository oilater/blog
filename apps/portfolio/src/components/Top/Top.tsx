import { type ReactNode } from 'react';
import { paragraphStyle, rootStyle } from './Top.css';

export function Top({ children }: { children: ReactNode }) {
  return (
    <div className={rootStyle}>
      <p className={paragraphStyle}>{children}</p>
    </div>
  );
}
