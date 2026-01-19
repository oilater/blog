import dynamic from 'next/dynamic';
import { Content } from './Content';
import { Intro } from './Intro';
import { Introduce } from './Introduce';
import { Recent } from './Recent';

const Education = dynamic(() => import('./Education').then((module) => module.Education));
const Outro = dynamic(() => import('./Outro').then((module) => module.Outro));

export default function AboutPage() {
  return (
    <main>
      <Intro />
      <Introduce />
      <Recent />
      <Content />
      <Education />
      <Outro />
    </main>
  );
}
