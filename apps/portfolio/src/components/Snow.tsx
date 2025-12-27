'use client';

import type { Container, Engine } from '@tsparticles/engine';
import { loadSnowPreset } from '@tsparticles/preset-snow';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { useEffect, useState } from 'react';

export function Snow() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSnowPreset(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (
    container?: Container,
  ): Promise<void> => {
    console.log(container);
  };

  return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={{
            preset: 'snow',
            background: {
              opacity: 0,
            },
            particles: {
              size: {
                value: { min: 2, max: 8 },
              },
              move: {
                speed: { min: 0.01, max: 0.05 },
              },
              opacity: {
                value: { min: 0.05, max: 0.4 },
              },
              number: {
                value: 30,
              },
            },
          }}
        />
      )}
    </>
  );
}
