---
title: 왜 Next에서 Emotion CSS를 쓰기 힘들까?
date: 2026-01-21
---
몇 달 전, 포트폴리오를 React에서 Next로 마이그레이션했다. Emotion을 사용하고 있는 대부분의 컴포넌트에서 에러가 터졌다. 그런데 신기하게도 `'use client'` 를 붙이면 에러가 사라졌다.

결국 모든 컴포넌트에 `'use client'`를 붙여야 하는 상황이 되어버렸고, 그러면 Next를 쓰는 의미가 없어졌다. 그래서 난 Emotion을 버리고 Vanilla-Extract로 갈아탔다.

왜 Next App Router에서 `'use client'` 없이 Emotion을 쓰면 오류가 날까?

## RSC의 등장

Next의 App Router는 기본적으로 RSC(React Server Component) 방식을 채택했다. 먼저, RSC의 등장 배경을 살펴보자.

>Next.js는 RSC를 확장해 Server Components를 만들었지만, 기본적으로 React Server Component 설계 철학을 모두 만족하기 때문에 이 글에서는 RSC로 통일해서 표현했다.

당시 SSR의 가장 큰 문제는 컴포넌트가 서버와 클라이언트에서 **이중 호출**된다는 것이었다.

초기 HTML을 빠르게 보여주기 위해 서버에서 리액트 컴포넌트를 실행하여 HTML을 만들어 전송하면, 브라우저는 HTML을 받은 후 컴포넌트를 호출해 기존 DOM에 이벤트와 상태를 연결하는 하이드레이션 과정을 거쳐야 한다. 결국 서버에서 실행된 컴포넌트는 클라이언트에서도 재실행되며, 이는 결국 JS 번들에 포함된다는 뜻이다.

### 실행 환경의 분리

RSC는 컴포넌트의 실행 환경을 서버와 클라이언트로 분리했다. 서버 컴포넌트는 서버에서만 호출되어 가벼운 RSC Payload와 HTML을 전송하고, 클라이언트 컴포넌트는 기존과 같은 하이드레이션 과정을 거친다. 

>그래서 NextJS에서 `'use client'`를 붙여도 기본적으로 SSR(Server Side Rendering)을 시도한다.

Next의 Page Router는 기존의 SSR 방식을 따르고, App Router는 RSC 방식을 따른다.
왜 RSC에서는 Emotion CSS를 쓰면 에러가 날까?

## SSR에서 Emotion을 사용했던 방법

### 1. 기존 SSR: 완성된 HTML 전달하기

일단 기존 SSR의 전송 방식에 대해 알아보자. 그리고 Emotion이 어떻게 SSR 환경에서도 실행될 수 있었는지 살펴보자.

먼저 서버에서 renderToString으로 최상단 컴포넌트인 `<App />`을 호출한다. renderToString은 동기적으로 작동한다.

```javascript
const html = renderToString(<App />);
// html = '<button class="css-abc123">클릭</button>'
```

App 안에 있는 Button같은 컴포넌트들이 호출된다.

```jsx
const Button = styled.button`color: red;`;

function App() {
  return <Button>클릭</Button>;
}
```

Emotion은 renderToString 중에 styled component가 평가될 때 스타일을 생성하고 캐시에 등록한다.

```javascript
// Emotion 내부
collectedStyles = {
  'css-abc123': 'color: red;'
}
```

renderToString 호출의 결과로 HTML이 완성되면, `extractCritical(html)`을 호출해서 메모리에 수집한 CSS 중 HTML에서 쓰이고 있는 CSS를 추출한다. 이때 서버에서 만든 HTML과 클라이언트에서 재실행될 Emotion 결과가 최대한 동일하도록 보정하기 위해 html도 약간 수정해서 반환한다고 한다.

```javascript
const { html: criticalHtml, css, ids } = extractCritical(html)
```

CSS가 추출되면, HTML과 함께 전송한다.

```tsx showLineNumbers {4,6}
const fullHtml = `
  <html>
    <head>
	  <style data-emotion="css ${ids.join(' ')}">
        ${css}
      </style>
    </head>
    <body>${criticalHtml}</body>
  </html>
`;
```

클라이언트에서는 `extractCritical`이 반환한 `ids`를 사용해 `hydrate(ids)`를 호출한다.
클라이언트에서 Emotion이 초기화될 때 서버에서 이미 삽입된 스타일을 캐시에 주입해서 중복 삽입을 방지하기 위함이다.

```tsx
import { hydrate } from '@emotion/css'

hydrate(ids)
```

>정리하면, renderToString 호출로 HTML이 완성되어야 extractCritical이 실행되어 CSS가 추출될 수 있다. 이 모든 과정은 동기적으로 이루어진다.

### 2. RSC: RSC Payload + HTML (+ Streaming)

RSC는 서버에서 컴포넌트를 렌더링해 HTML을 생성하고, RSC Payload를 준비한다. 그리고 클라이언트는 RSC Payload를 기반으로 VDOM을 복원한다. RSC Payload에는 아래의 정보들이 담긴다.

- 페이지 정보와 예상 결과물
- `<Suspense>` 상태일 때 보여줄 Fallback
- 서버 컴포넌트에서 클라이언트 컴포넌트로 전달되는 모든 속성

https://roy-jung.github.io/250323-react-server-components/ 
정재남님의 번역글에 더 자세한 설명이 있다. 

실제로 네트워크 탭을 열어서 `Fetch/XMR` 을 필터링 해보면 `_rsc=1r34m` 같은 파일이 보인다.
```
0:{"b":"6cQe1V7CgVBLUCgp_BZws",
"f":[[["",{"children":["__PAGE__",{},
"$undefined","$undefined","$undefined",3]},
"$undefined","$undefined",true,3],null,[null,null],true]],"S":false}
```

## RSC에서 Emotion을 못 쓰는 이유

위에서 살펴본 대로 서버 컴포넌트는 클라이언트에 HTML + RSC Payload만 전달되며, 해당 컴포넌트의 JavaScript 코드는 번들에 포함되지 않는다. 실행될 JavaScript 코드가 없으니 Emotion이 스타일링을 계산하고 주입할 엔진 자체가 실행 될 수 없다. 나는 아래와 같이 정리해봤다.

1. Emotion은 스타일을 적용하고 수집하기 위해 다양한 React hooks을 호출한다고 하는데, RSC는 서버에서만 호출되므로 React hooks를 사용할 수 없다.
2. 서버에서도 이모션의 styled 함수가 실행은 되고 Emotion 내부의 메모리에 수집은 되겠지만, **Emotion이 제공하는 런타임 스타일 생성 과정은 직렬화되어야 하는 RSC Payload에 담기지 못하고 버려진다.**
3. Streaming 방식을 생각해봐도 전체 HTML이 완성될 때까지 기다려주지 않아 extractCritical로 스타일을 적용할 수 없다.

## 당시 Github issue 토론들

깃헙 이슈들을 보면서 MUI의 내부 스타일링 엔진이 Emotion을 사용하고 있었다는 것을 알았다. Emotion 팀은 Next.js가 라이브러리 제작자들과 제대로 소통하지 않고 13 버전 업데이트를 진행했으며, Styled-Components 또한 Emotion과 비슷한 상황이라고 말했다.

>Next.js rushed the release of their docs without consulting library authors. The mentioned Styled-Components "support" looks almost exactly the same as the Emotion support can look like (see the comment [here](https://github.com/emotion-js/emotion/issues/2928#issuecomment-1293012737)). There is no special API in SC that integrates with RSC in any special way.

Emotion 팀에서 Root Layout을 서버 컴포넌트로 사용하기 위해 대안으로 올린 코드도 우회하는 방법일 뿐이었다. 초기 스타일만 적용되고 나머지 스타일링은 다 `'use client'`를 붙여서 사용해야 한다.

https://github.com/emotion-js/emotion/issues/2928#issuecomment-1293012737

>We may want to add an explicit API for this but this works today:
```tsx
// app/emotion.tsx
"use client";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";

export default function RootStyleRegistry({
  children,
}: {
  children: JSX.Element;
}) {
  const [cache] = useState(() => {
    const cache = createCache({ key: "css" });
    cache.compat = true;
    return cache;
  });

  useServerInsertedHTML(() => {
    return (
      <style
        data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: Object.values(cache.inserted).join(" "),
        }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}

// app/layout.tsx
import RootStyleRegistry from "./emotion";

// layout에 use client를 붙이지 않았지만 결국 다른 모든 곳에서 use client를 붙이고 있음
export default function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <html>
      <head></head>
      <body>
        <RootStyleRegistry>{children}</RootStyleRegistry>
      </body>
    </html>
  );
}

// app/page.tsx
/** @jsxImportSource @emotion/react */
"use client";

export default function Page() {
  return <div css={{ color: "green" }}>something</div>;
}
```

## 결론

vanilla-extract, panda CSS 같은 빌드 타임 CSS를 쓰자.

오늘 회사에서 vanilla-extract의 작동방식에 대해 궁금해하면서 이것저것 찾아보다가, 갑자기 Emotion을 Next에서 왜 쓸 수 없을까?가 생각나서 이 글을 작성하게 됐다. 당시에는 *'Emotion이 Next13과 호환이 안되나보네'* 정도로 생각하고 넘어갔는데, 이것저것 찾아보면서 많이 배울 수 있었다.

## 참고 문서

https://emotion.sh/docs/ssr#extractcritical
https://github.com/emotion-js/emotion/issues/2928#issuecomment-1408650306
https://github.com/emotion-js/emotion/issues/2978
https://nextjs.org/learn/dashboard-app/streaming
https://roy-jung.github.io/250323-react-server-components/
