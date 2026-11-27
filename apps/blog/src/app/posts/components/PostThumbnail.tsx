import Image from 'next/image';
import * as styles from '../thumbnail.css';
import { hasPostIcon, PostIcon } from './PostIcon';

export function PostThumbnail({ src, icon }: { src?: string; icon?: string }) {
  if (src) {
    return (
      <span className={styles.thumbnail}>
        <Image src={src} alt="" fill sizes="72px" className={styles.image} />
      </span>
    );
  }

  if (hasPostIcon(icon)) {
    return (
      <span className={`${styles.thumbnail} ${styles.iconBox}`}>
        <PostIcon name={icon} />
      </span>
    );
  }

  return null;
}
