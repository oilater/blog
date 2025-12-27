'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { linkItem } from './FloatingNav.css';

type NavItemProps = {
  href: string;
  label: string;
  icon?: string;
};

export function NavItem({ href, label }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      prefetch={false}
      className={`${linkItem} ${isActive ? 'active' : ''}`}
    >
      {label}
    </Link>
  );
}
