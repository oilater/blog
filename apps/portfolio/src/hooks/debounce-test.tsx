'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';

export function DebounceTest() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      console.log(debouncedQuery);
    }
  }, [debouncedQuery]);
  return (
    <div>
      <p>{query === '' ? '입력하세요' : query}</p>
      <input type="text" onChange={(e) => setQuery(e.target.value)} />
    </div>
  );
}
