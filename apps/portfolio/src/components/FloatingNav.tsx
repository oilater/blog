import { header, innerNav } from '#/app/layout.css';
import { ThemeSwitch } from '#components/ThemeSwitch';
import { BlogConfig } from '#constants/config';
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
