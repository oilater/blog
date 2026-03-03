---
title: Vitest 알아보기
date: 2026-03-03
---

### 1. Vite와 함께 쓰기

기존 `vite.config.js`에 test를 설정할 수 있다. 근데 vite는 `test:`라는 속성을 이해하지 못한다. <br/>
`/// <reference types="vitest/config" />` 라는 3중 슬래시로 힌트를 주면 된다.

```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    // ... Specify options here.
  },
})
```

`/// <reference types="vitest/config" />` 이건 타입을 확장하는 건데, 어디서 할까? 궁금해서 vitest를 포크했다.

`packages/vitest/src/node/types/vite.ts`에서 타입을 확장하는 부분을 찾을 수 있다.

```ts
// packages/vitest/src/node/types/vite.ts

/* eslint-disable unused-imports/no-unused-vars */

import type { HookHandler } from 'vite'
import type { InlineConfig } from './config'
import type { VitestPluginContext } from './plugin'

type VitestInlineConfig = InlineConfig // 이름 충돌 방지 (Vite에도 InlineConfig 있음)

declare module 'vite' {
  interface UserConfig {
	/**
     * Options for Vitest
     */
     test?: VitestInlineConfig 
   }

  interface Plugin<A = any> {
    configureVitest?: HookHandler<(context: VitestPluginContext) => void>
  }
}
export {}
```

- vitest.config.js가 있다면 우선순위 가지고 덮어씀 - 이 경우에 vite.config.js는 무시함ㄷ
	- `--config` 


### 실행하기

- `npx vitest` (자동으로 node_modules에서 vite.config.ts 또는 vitest.config.ts 찾음)
- `vitest --config ./test/my-test.config.ts`

### vitest를 실행하면 생기는 일 3가지

- `process.env.VITEST=true`가 됨
```ts
import { defineConfig } from 'vite'

export default defineConfig({
  // 평소에 앱을 만들 때 쓰는 설정
  plugins: [react()],
  
  // 만약 npx vitest로 실행해서 VITEST가 true라면?
  test: process.env.VITEST ? {
    // 테스트용 설정만 여기서 발동!
    environment: 'jsdom',
    globals: true
  } : {} // 평소(npm run dev)에는 이 부분이 텅 비게 됨
})
```

- `mode = test`가 됨
```ts
// vite.config.ts
export default defineConfig(({ mode }) => {
  if (mode === 'test') {
    // "아, 지금 테스트 모드구나!" -> 테스트 전용 설정 리턴
  }
  return { /* 평소 설정 */ }
})
```

- 코드에서 이렇게 사용 가능하다. 
```ts
if (import.meta.env.VITEST) { 
  console.log('테스트 중입니다');
}
```

- 이 경우에는 Vite 설정에서 `define: { 'import.meta.vitest': 'undefined' }` 처리를 해줘야 프로덕션 빌드 시 테스트 코드가 포함되지 않는다.
```ts
// math.ts
export function add(a, b) {
  return a + b
}

// 소스 코드 파일 하단에 테스트 작성 가능
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('add works', () => {
    expect(add(1, 2)).toBe(3)
  })
}
```

