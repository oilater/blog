import { header, innerNav } from '#/app/layout.css';
import { ThemeSwitch } from '#components/ThemeSwitch';
import { NavItem } from './NavItem';

export function FloatingNav() {
  return (
    <header className={header}>
      <div className={innerNav}>
        <NavItem href="/" label="Home" prefetch={false} />
        <NavItem href="/posts" label="Post" prefetch={false} />
        <NavItem href="/about" label="About" prefetch={false} />
        <ThemeSwitch />
      </div>
    </header>
  );
}
