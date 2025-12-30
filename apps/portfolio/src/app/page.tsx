import dynamic from 'next/dynamic';
import { Content } from './(home)/Content';
import { Intro } from './(home)/Intro';
import { Introduce } from './(home)/Introduce';
import { Work } from './(home)/Work';

const Education = dynamic(() =>
  import('./(home)/Education').then((module) => module.Education),
);
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
