import * as styles from './Contact.css';
import { SectionTitle } from './SectionTitle';

const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/seonghyeonkim' },
  { label: 'Github', href: 'https://github.com/oilater' },
];

export function Contact() {
  return (
    <section className={styles.wrapper}>
      <SectionTitle>📬 Contact</SectionTitle>
      <div className={styles.row}>
        <span>010-2717-6906</span>
        <span className={styles.dot}>·</span>
        <span>oilater@naver.com</span>
      </div>
      <div className={styles.row}>
        {links.map((link, i) => (
          <span key={link.label} className={styles.group}>
            {i > 0 && <span className={styles.dot}>·</span>}
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {link.label}
            </a>
          </span>
        ))}
      </div>
    </section>
  );
}
