import { type ButtonHTMLAttributes } from 'react';
import { button } from './styles/Article.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      aria-label={`${children}으로 이동`}
      className={button}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
