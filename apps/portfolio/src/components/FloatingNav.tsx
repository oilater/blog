import { header, innerNav } from '#/app/layout.css';
import { ThemeSwitch } from '#components/ThemeSwitch';
import { NavItem } from './NavItem';

export function FloatingNav() {
  return (
    <header className={header}>
      <div className={innerNav}>
        <NavItem href="/" label="Home" />
        <NavItem href="/feed" label="Feed" />
        <NavItem href="/about" label="About" prefetch={false} />
        <ThemeSwitch />
      </div>
    </header>
  );
}
