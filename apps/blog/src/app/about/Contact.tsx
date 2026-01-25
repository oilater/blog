import * as styles from './Contact.css';
import { SectionTitle } from './SectionTitle';

export function Contact() {
  return (
    <section className={styles.wrapper}>
      <SectionTitle>📬 Contact</SectionTitle>
      <div className={styles.contactContainer}>
        <div className={styles.contactItem}>
          <span className={styles.contactLabel}>Phone</span>
          <span className={styles.contactValue}>010-2717-6906</span>
        </div>
        <div className={styles.contactItem}>
          <span className={styles.contactLabel}>Email</span>
          <span className={styles.contactValue}>oilater@naver.com</span>
        </div>
        <div className={styles.contactItem}>
          <span className={styles.contactLabel}>Linkedin</span>
          <a
            href="https://www.linkedin.com/in/seonghyeonkim"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactValue}
          >
            Seonghyeon Kim
          </a>
        </div>
        <div className={styles.contactItem}>
          <span className={styles.contactLabel}>Github</span>
          <a
            href="https://github.com/oilater"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactValue}
          >
            @oilater
          </a>
        </div>
      </div>
    </section>
  );
}
