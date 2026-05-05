import * as styles from './OpenSource.css';
import { SectionTitle } from './SectionTitle';

interface OpenSourceItem {
  text: string;
  href: string;
}

interface OpenSourceData {
  id: number;
  title: string;
  items: OpenSourceItem[];
}

const openSourceData: OpenSourceData[] = [
  {
    id: 1,
    title: 'Vite-plus',
    items: [
      {
        text: 'feat(vscode): add language-specific formatter overrides',
        href: 'https://github.com/vitejs/vite-plus/pulls?q=add+language-specific+formatter+overrides',
      },
    ],
  },
  {
    id: 2,
    title: 'Vitest',
    items: [
      {
        text: 'fix: detect fixture that returns without calling use',
        href: 'https://github.com/vitest-dev/vitest/pull/9861',
      },
      {
        text: 'fix: hideSkippedTests should not hide test.todo',
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
          <div key={item.id} className={styles.item}>
            <div className={styles.leftColumn}>
              <div className={styles.titleRow}>
                <span className={styles.dot} />
                <span className={styles.title}>{item.title}</span>
              </div>
            </div>
            <div className={styles.rightColumn}>
              <ul className={styles.bulletList}>
                {item.items.map((subItem) => (
                  <li key={subItem.text} className={styles.bullet}>
                    <a
                      href={subItem.href}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.link}
                    >
                      {subItem.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
