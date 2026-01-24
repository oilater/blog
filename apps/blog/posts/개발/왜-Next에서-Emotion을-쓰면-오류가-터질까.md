---
title: 왜 Next에서 Emotion을 쓰면 오류가 터질까
date: 2026-01-21
---
몇 달 전, 포트폴리오를 React에서 Next로 마이그레이션했다. 

그런데 Emotion을 사용하고 있는 대부분의 컴포넌트에서 에러가 터졌다. 신기하게도 `'use client'` 를 붙이면 에러가 사라졌는데, 결국 모든 컴포넌트에 `'use client'`를 붙여야 하는 상황이 되어버렸다. 그러면 Next를 쓰는 의미가 없어졌다. 그래서 Emotion을 버리고 Vanilla-Extract로 갈아탔다. 

왜 Next에서 `'use client'` 없이 Emotion을 쓰면 에러가 날까? 나는 **전달 방식**에서 이 문제가 비롯된다고 생각했다.

## 배경 지식 (간단)

### SSR(Server Side Rendering) 특

Next.js 13 이전 SSR(Server Side Rendering)의 가장 큰 문제는 **컴포넌트가 서버와 클라이언트에서 이중 호출된다**는 것이었다. 서버에서 컴포넌트를 실행해서 만든 HTML을 전송해도 브라우저는 HTML을 받은 후 컴포넌트를 호출해 기존 DOM에 이벤트와 상태를 연결하는 하이드레이션 과정을 거쳐야 한다. 결국 서버에서 실행된 컴포넌트도 자바스크립트 번들에 포함되어 클라이언트에서 다시 실행된다.

### RSC는 어떤가

RSC는 컴포넌트의 실행 환경을 서버와 클라이언트로 분리했다. 서버 컴포넌트는 서버에서만 호출되어 가벼운 RSC Payload와 HTML을 전송하고, 클라이언트 컴포넌트는 기존과 같은 하이드레이션 과정을 거친다. 

>그래서 `'use client'`를 붙여도 기본적으로 SSR(Server Side Rendering)을 시도한다.

## Emotion with SSR

먼저, 어떻게 SSR 환경에서 Emotion이 실행될 수 있었는지 알아보자.

1. 서버에서 renderToString으로 최상단 컴포넌트인 `<App />`을 호출한다.

```javascript
const html = renderToString(<App />);
// html = '<button class="css-abc123">클릭</button>'
```

2. App 안에 있는 Button같은 컴포넌트들이 호출된다.

```jsx
const Button = styled.button`color: red;`;

function App() {
  return <Button>클릭</Button>;
}
```

3. renderToString 중에 styled component가 평가될 때마다 Emotion은 스타일을 생성하고 캐시에 등록한다.

```javascript
collectedStyles = {
  'css-abc123': 'color: red;'
}
```

4. HTML이 완성되면 `extractCritical(html)`을 통해 실제로 쓰이고 있는 CSS를 추출한다. 이때 서버에서 만든 HTML과 클라이언트에서 재실행될 Emotion 결과가 최대한 동일하도록 보정하기 위해 html을 수정해서 반환한다.

```javascript
const { html: criticalHtml, css, ids } = extractCritical(html)
```

5. CSS가 추출되면, HTML과 함께 전송한다.

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

6. 클라이언트에서는 Emotion 라이브러리가 포함된 전체 JS 번들도 내려받는다. 이때 `hydrate(ids)`를 호출해 서버에서 뽑아낸 ids를 Emotion에 그대로 전달한다. 서버에서 이미 삽입된 스타일을 캐시에 주입해서 중복 삽입을 방지하기 위함이다.

```tsx
import { hydrate } from '@emotion/css'

hydrate(ids)
```

정리해보면 `<head>`의 `<style>` 태그에 이미 스타일 정보가 포함되어서 브라우저가 적용하고, 하이드레이션 과정에서 Emotion 런타임이 초기화되어 이후 동적 스타일 변경을 처리할 준비를 한다. 

## RSC 서버 컴포넌트에서 Emotion을 못 쓰는 이유

RSC에서 서버 컴포넌트는 서버에서만 실행되며, 자바스크립트가 클라이언트로 전달되지 않는다. 서버에서는 실행 결과를 바탕으로 RSC Payload를 만들며, 여기엔 리액트 트리를 재구성하기 위한 데이터가 담긴다.

- 페이지 정보와 예상 결과물
- `<Suspense>` 상태일 때 보여줄 Fallback
- 서버 컴포넌트에서 클라이언트 컴포넌트로 전달되는 모든 속성

클라이언트는 RSC Payload를 해석해 기존 React Tree와 병합하고, 필요한 DOM을 업데이트한다. 단, 첫 페이지에서는 아직 React가 초기화되기 전이기 때문에 HTML을 함께 생성해서 보내준다. 이후 우리가 네비게이션같은 거 할 땐 RSC Payload만 받는다. 실제로 페이지 이동 시 네트워크 탭을 보면 `_rsc=1r34m` 같은 파일이 보인다.

```
0:{"b":"6cQe1V7CgVBLUCgp_BZws",
"f":[[["",{"children":["__PAGE__",{},
"$undefined","$undefined","$undefined",3]},
"$undefined","$undefined",true,3],null,[null,null],true]],"S":false}
```

RSC 페이로드에는 스타일에 대한 정보가 담기지 않는다. 따라서 서버에서 수집한 Emotion의 스타일 정보가 클라이언트로 전달될 수 없다. 

더 근본적인 이유는 서버 컴포넌트의 자바스크립트가 클라이언트에 전달되지 않기 때문이다. 기존 SSR에서는 하이드레이션 과정에서 컴포넌트가 렌더링되며 Emotion도 함께 실행될 수 있었지만, RSC 서버 컴포넌트의 경우 자바스크립트 파일 자체가 클라이언트에 없으니 Emotion이 실행될 여지가 없다.

## 당시 Github issue 토론들

깃헙 이슈들을 보니 당시 MUI가 내부 스타일링 엔진으로 Emotion을 사용하고 있었다. 당시 Emotion 팀은 Next.js가 라이브러리 제작자들과 제대로 소통하지 않고 13 버전 업데이트를 진행했으며, Styled-Components 또한 Emotion과 비슷한 상황이라고 말했다.

>Next.js rushed the release of their docs without consulting library authors. The mentioned Styled-Components "support" looks almost exactly the same as the Emotion support can look like (see the comment [here](https://github.com/emotion-js/emotion/issues/2928#issuecomment-1293012737)). There is no special API in SC that integrates with RSC in any special way.

Emotion 팀에서 Root Layout을 서버 컴포넌트로 사용하기 위해 대안으로 올린 코드 또한 우회하는 방법일 뿐이었다. 초기 스타일만 적용될 뿐 나머지 스타일링은 다 `'use client'`를 붙여서 사용해야 한다.

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

회사에서 vanilla-extract의 작동방식에 대해 궁금해하면서 이것저것 찾아보다가 '그럼 Emotion을 Next에서 왜 쓸 수 없을까?' 궁금증이 생겨서 이 글을 작성하게 됐다.

사실 당시에는 그냥 '*하 Emotion이 Next랑 호환이 안되나보다*' 이러고 넘겼는데, 이번엔 계속 고민하고 알아보면서 많은 것들을 배울 수 있었다.

그러니까 vanilla-extract, panda CSS 같은 빌드 타임 CSS를 쓰자. 

## 참고 문서

https://emotion.sh/docs/ssr#extractcritical
https://github.com/emotion-js/emotion/issues/2928#issuecomment-1408650306
https://github.com/emotion-js/emotion/issues/2978
https://nextjs.org/learn/dashboard-app/streaming
https://roy-jung.github.io/250323-react-server-components/


