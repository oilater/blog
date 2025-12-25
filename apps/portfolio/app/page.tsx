import dynamic from 'next/dynamic';
import { Content, Education, Intro, Introduce, Work } from './(home)';

const Outro = dynamic(() =>
  import('./(home)/Outro').then((module) => module.Outro),
);

export default function Home() {
  return (
    <main>
      <Intro />
      <Introduce />
      <Work />
      <Content />
      <Education />
      <Outro />
    </main>
  );
}
