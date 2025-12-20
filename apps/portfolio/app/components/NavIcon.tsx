'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { linkItem } from '../styles/components/FloatingNav.css';

type NavIconProps = {
  href: string;
  label: string;
  icon?: string;
};

export function NavIcon({ href, label, icon }: NavIconProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      prefetch={false}
      className={`${linkItem} ${isActive ? 'active' : ''}`}
    >
      {icon ? (
        <Image src={icon} alt={label} width={24} height={24} />
      ) : (
        label
      )}
    </Link>
  );
}
