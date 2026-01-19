import * as styles from './ListSkeleton.css';

export function ListSkeleton() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.blogList}>
          <div>
            <div className={styles.cardTitle} />
            <div className={styles.descContainer}>
              <div
                className={`${styles.descLine} ${styles.descLineFull}`}
              />
              <div
                className={`${styles.descLine} ${styles.descLineMedium}`}
              />
            </div>
          </div>
          <div className={styles.tagContainer}>
            <div className={styles.tag} />
            <div className={styles.tag} />
            <div className={styles.tag} />
          </div>
        </div>
        <div className={styles.cardDate} />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.blogList}>
          <div>
            <div className={styles.cardTitle} />
            <div className={styles.descContainer}>
              <div
                className={`${styles.descLine} ${styles.descLineFull}`}
              />
              <div
                className={`${styles.descLine} ${styles.descLineMedium}`}
              />
            </div>
          </div>
          <div className={styles.tagContainer}>
            <div className={styles.tag} />
            <div className={styles.tag} />
            <div className={styles.tag} />
          </div>
        </div>
        <div className={styles.cardDate} />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.blogList}>
          <div>
            <div className={styles.cardTitle} />
            <div className={styles.descContainer}>
              <div
                className={`${styles.descLine} ${styles.descLineFull}`}
              />
              <div
                className={`${styles.descLine} ${styles.descLineMedium}`}
              />
            </div>
          </div>
          <div className={styles.tagContainer}>
            <div className={styles.tag} />
            <div className={styles.tag} />
            <div className={styles.tag} />
          </div>
        </div>
        <div className={styles.cardDate} />
      </div>
    </>
  );
}
