import { useCallback, useEffect, useRef } from 'react';

type UseInfiniteScrollProps = {
  onIntersect: () => void;
  rootMargin?: string;
  threshold?: number | number[];
};

export function useInfiniteScroll({
  onIntersect,
  rootMargin = '150px',
  threshold = 0.1,
}: UseInfiniteScrollProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;

      if (target?.isIntersecting) {
        onIntersect();
      }
    },
    [onIntersect],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin,
      threshold,
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [handleObserver, rootMargin, threshold]);

  return { observeRef: targetRef };
}
