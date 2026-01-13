'use client';

import { AnimateCounter } from '#/hooks/AnimateCounter';
import { DebounceTest } from '#/hooks/debounce-test';

export default function TestPage() {
  return (
    <>
      <AnimateCounter target={100000} />
      <DebounceTest />
    </>
  );
}
