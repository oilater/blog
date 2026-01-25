import * as styles from './about.css';
import { Certifications } from './Certifications';
import { Contact } from './Contact';
import { Content } from './Content';
import { Intro } from './Intro';

export default function AboutPage() {
  return (
    <main className={styles.container}>
      <Intro />
      <Content />
      <Certifications />
      <Contact />
    </main>
  );
}
