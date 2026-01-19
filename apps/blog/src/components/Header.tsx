import Link from 'next/link';
import { header, logo, nav } from '#/app/layout.css';
import { BlogConfig } from '#/constants/config';
import { ThemeSwitch } from '#components/ThemeSwitch';
import { NavItem } from './NavItem';

export function Header() {
  return (
    <header className={header}>
      <Link href="/" className={logo}>
        {BlogConfig.author.name}
      </Link>
      <nav className={nav}>
        <NavItem href="/posts" label="Posts" prefetch={false} />
        <NavItem href="/about" label="About" prefetch={false} />
        <ThemeSwitch />
      </nav>
    </header>
  );
}
