import Link from 'next/link';
import { ComponentProps } from 'react';
import { linkItem } from '#/app/layout.css';

type NavItemProps = ComponentProps<typeof Link> & {
  href: string;
  label: string;
};

export function NavItem({ href, label, ...props }: NavItemProps) {
  return (
    <Link {...props} href={href} className={linkItem}>
      {label}
    </Link>
  );
}
