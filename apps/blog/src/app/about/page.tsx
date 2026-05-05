import * as styles from './about.css';
import { Activities } from './Activities';
import { Certifications } from './Certifications';
import { Contact } from './Contact';
import { WorkExperiences } from './WorkExperiences';
import { Education } from './Education';
import { Intro } from './Intro';
import { OpenSource } from './OpenSource';

export default function AboutPage() {
  return (
    <main className={styles.container}>
      <Intro />
      <WorkExperiences />
      <Activities />
      <OpenSource />
      <Education />
      <Certifications />
      <Contact />
    </main>
  );
}
