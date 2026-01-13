import { useEffect, useState } from 'react';

export function AnimateCounter({ target }: { target: number }) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let rafId: any;

    function animate() {
      setCounter((prev) => {
        if (prev < target) {
          rafId = requestAnimationFrame(animate);
          return prev + 1;
        }
        return prev;
      });
    }

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [target]);
  return <div>{counter}</div>;
}
