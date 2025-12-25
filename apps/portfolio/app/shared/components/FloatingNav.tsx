import {
  header,
  innerNav,
} from '../../styles/components/FloatingNav.css';
import { ThemeSwitch } from './ThemeSwitch';

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
