import * as styles from './loading.css';

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.title} />
        <div className={styles.subtitle} />
      </div>
      <div className={styles.content}>
        <section className={styles.section}>
          <div className={styles.sectionTitle} />
          <div className={styles.bodyContainer}>
            <div
              className={`${styles.bodyLine} ${styles.bodyLineFull}`}
            />
            <div
              className={`${styles.bodyLine} ${styles.bodyLineShort}`}
            />
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.sectionTitle} />
          <div className={styles.bodyContainer}>
            <div
              className={`${styles.bodyLine} ${styles.bodyLineFull}`}
            />
            <div
              className={`${styles.bodyLine} ${styles.bodyLineShort}`}
            />
            <div
              className={`${styles.bodyLine} ${styles.bodyLineShort}`}
            />
            <div
              className={`${styles.bodyLine} ${styles.bodyLineShort}`}
            />
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.sectionTitle} />
          <div className={styles.bodyContainer}>
            <div
              className={`${styles.bodyLine} ${styles.bodyLineFull}`}
            />
            <div
              className={`${styles.bodyLine} ${styles.bodyLineShort}`}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
