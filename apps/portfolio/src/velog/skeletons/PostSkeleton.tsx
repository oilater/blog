import * as styles from './PostSkeleton.css';

export function PostSkeleton() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.title}></div>
        <div className={styles.description}></div>
        <div className={styles.tags}>
          <div className={styles.tag}></div>
          <div className={styles.tag}></div>
          <div className={styles.tag}></div>
          <div className={styles.tag}></div>
        </div>
        <div className={styles.bodyContainer}>
          <div
            className={`${styles.bodyLine} ${styles.bodyLineFull}`}
          />
          <div
            className={`${styles.bodyLine} ${styles.bodyLineMedium}`}
          ></div>
          <div
            className={`${styles.bodyLine} ${styles.bodyLineMedium}`}
          />
          <div
            className={`${styles.bodyLine} ${styles.bodyLineShort}`}
          />
        </div>
        <div className={styles.bodyContainer}>
          <div
            className={`${styles.bodyLine} ${styles.bodyLineFull}`}
          />
          <div
            className={`${styles.bodyLine} ${styles.bodyLineMedium}`}
          ></div>
          <div
            className={`${styles.bodyLine} ${styles.bodyLineMedium}`}
          />
          <div
            className={`${styles.bodyLine} ${styles.bodyLineShort}`}
          />
        </div>
        <div className={styles.bodyContainer}>
          <div
            className={`${styles.bodyLine} ${styles.bodyLineFull}`}
          />
          <div
            className={`${styles.bodyLine} ${styles.bodyLineMedium}`}
          ></div>
          <div
            className={`${styles.bodyLine} ${styles.bodyLineMedium}`}
          />
          <div
            className={`${styles.bodyLine} ${styles.bodyLineShort}`}
          />
        </div>
        <div className={styles.bodyContainer}>
          <div
            className={`${styles.bodyLine} ${styles.bodyLineFull}`}
          />
          <div
            className={`${styles.bodyLine} ${styles.bodyLineMedium}`}
          ></div>
          <div
            className={`${styles.bodyLine} ${styles.bodyLineMedium}`}
          />
          <div
            className={`${styles.bodyLine} ${styles.bodyLineShort}`}
          />
        </div>
      </div>
    </div>
  );
}
