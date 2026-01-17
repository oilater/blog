'use client';

import { track } from '@vercel/analytics';
import Link from 'next/link';
import { ComponentProps } from 'react';
import { linkItem } from '#/app/layout.css';

type NavItemProps = ComponentProps<typeof Link> & {
  href: string;
  label: string;
};

export function NavItem({ href, label, ...props }: NavItemProps) {
  return (
    <Link
      {...props}
      href={href}
      className={linkItem}
      onClick={() => {
        track('Navigation Click', {
          label,
          target_url: href,
        });
      }}
    >
      {label}
    </Link>
  );
}
