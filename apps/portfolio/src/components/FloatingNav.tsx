import { ThemeSwitch } from '#components/ThemeSwitch';
import { BlogConfig } from '#constants/config';
import { header, innerNav } from '#styles/layout.css';
import { NavItem } from './NavItem';

export function FloatingNav() {
  return (
    <header className={header}>
      <div className={innerNav}>
        {BlogConfig.menu.map((link) => (
          <NavItem
            key={link.label}
            href={link.path}
            label={link.label}
          />
        ))}
        <ThemeSwitch />
      </div>
    </header>
  );
}
