import Link from 'next/link';
import { linkItem } from '#/app/layout.css';

type NavItemProps = {
  href: string;
  label: string;
  icon?: string;
};

export function NavItem({ href, label }: NavItemProps) {
  return (
    <Link href={href} prefetch={false} className={linkItem}>
      {label}
    </Link>
  );
}
