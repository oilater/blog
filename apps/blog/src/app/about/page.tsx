import * as styles from './about.css';
import { Content } from './Content';
import { Education } from './Education';
import { Intro } from './Intro';
import { Outro } from './Outro';

export default function AboutPage() {
  return (
    <main className={styles.container}>
      <Intro />
      <Content />
      <Education />
      <Outro />
    </main>
  );
}
