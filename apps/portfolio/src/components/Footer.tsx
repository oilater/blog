import Link from 'next/link';
import { GithubIcon } from '#icons/Github';
import { VelogIcon } from '#icons/Velog';
import { footer } from './styles/Footer.css';

export function Footer() {
  return (
    <footer className={footer}>
      <Link href="/" aria-label="홈으로 이동"></Link>
      <Link
        href="https://velog.io/@oilater"
        aria-label="Velog로 이동"
      >
        <VelogIcon />
      </Link>
      <Link
        href="https://github.com/oilater"
        aria-label="Github로 이동"
      >
        <GithubIcon />
      </Link>
    </footer>
  );
}
