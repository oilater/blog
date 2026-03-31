import * as styles from './OpenSource.css';
import { SectionTitle } from './SectionTitle';

const openSourceData = [
  {
    id: 1,
    title: 'Vitest',
    items: [
      {
        text: 'vitest-dev/vitest#9861',
        href: 'https://github.com/vitest-dev/vitest/pull/9861',
      },
      {
        text: 'vitest-dev/vitest#9781',
        href: 'https://github.com/vitest-dev/vitest/pull/9781',
      },
    ],
  },
];

export function OpenSource() {
  return (
    <section className={styles.wrapper}>
      <SectionTitle>📦 Open Source Contribution</SectionTitle>
      <div className={styles.contentSection}>
        {openSourceData.map((item) => (
          <div key={item.id} className={styles.educationItem}>
            <div className={styles.educationContent}>
              <span className={styles.educationTitle}>{item.title}</span>
              <div className={styles.educationDescription}>
                {item.items.map((subItem) => (
                  <p key={subItem.text}>
                    •{' '}
                    <a
                      href={subItem.href}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.link}
                    >
                      {subItem.text}
                    </a>
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
