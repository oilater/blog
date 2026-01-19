import dynamic from 'next/dynamic';
import { Content } from './(home)/Content';
import { Intro } from './(home)/Intro';
import { Introduce } from './(home)/Introduce';
import { Recent } from './(home)/Recent';

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
      <Recent />
      <Content />
      <Education />
      <Outro />
    </main>
  );
}
