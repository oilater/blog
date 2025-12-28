import { ThemeSwitch } from '#components/ThemeSwitch';
import { header, innerNav } from './FloatingNav.css';

export function FloatingNav({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <header className={header}>
      <div className={innerNav}>
        {children}
        <ThemeSwitch />
      </div>
    </header>
  );
}
