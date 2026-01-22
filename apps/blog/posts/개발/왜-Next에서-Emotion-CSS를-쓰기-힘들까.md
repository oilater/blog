---
title: 왜 Next에서 Emotion CSS를 쓰기 힘들까?
date: 2026-01-21
---


몇 달 전, 포트폴리오를 React에서 Next로 마이그레이션했다. Emotion을 사용하고 있는 대부분의 컴포넌트에서 에러가 터졌다. 그런데 신기하게도 `'use client'` 를 붙이면 에러가 사라졌다.

결국 모든 컴포넌트에 `'use client'`를 붙여야 하는 상황이 되어버렸고, 그러면 Next를 쓰는 의미가 없어졌다. 그래서 난 Emotion을 버리고 Vanilla-Extract로 갈아탔다.

당시에는 *'Emotion이 Next와 호환이 안되나보다'* 정도로 넘겼지만, 이젠 그 이유를 알아서 소개해보려고 한다.

왜 Next App Router에서 `'use client'` 없이 Emotion을 쓰면 오류가 날까?

## RSC의 등장

Next의 App Router는 기본적으로 RSC(React Server Component) 방식을 채택했다. 먼저, RSC의 등장 배경을 살펴봐야 한다. 

>Next.js는 RSC를 확장해 Server Components를 만들었지만, 기본적으로 React Server Component 설계 철학을 모두 만족하기 때문에 이 글에서는 RSC로 통일해서 표현했다.

당시 SSR의 가장 큰 문제는 컴포넌트가 서버와 클라이언트에서 **이중 호출**된다는 것이었다.

초기 HTML을 빠르게 보여주기 위해 서버에서 리액트 컴포넌트를 실행하여 HTML을 만들어 전송하면, 브라우저는 HTML을 받은 후 컴포넌트를 호출해 기존 DOM에 이벤트와 상태를 연결하는 하이드레이션 과정을 거쳐야 한다. 결국 서버에서 실행된 컴포넌트는 클라이언트에서도 재실행되며, 이는 결국 JS 번들에 포함된다는 뜻이다.

### RSC의 해결책

RSC는 컴포넌트를 **서버 전용**과 **클라이언트 전용**으로 나눠서 이 문제를 해결했다. 서버 컴포넌트는 서버에서만 호출되어 가벼운 RSC Payload와 HTML을 전송하고, 클라이언트 컴포넌트만 기존과 같은 하이드레이션 과정을 거친다. 

>그래서 NextJS에서 'use client'를 붙여도 기본적으로 SSR(Server Side Rendering)이 된다. 다만 하이드레이션 과정을 거칠 뿐이다.

Next의 Page Router는 기존의 SSR 방식을 따르고, App Router는 RSC 방식을 따른다.
그럼 왜 서버 컴포넌트에서는 Emotion CSS를 쓰면 에러가 날까?

기본적으로 RSC는 서버에서만 실행된다는 제약이 있지만, 기존 SSR에서 Emotion을 적용할 수 있었다는 걸 떠올려보면 문제의 핵심은 **전송 방식의 차이**에 있다.

## 전송 방식의 차이

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

Emotion은 이 과정에서 CSS를 메모리에 수집한다.

```javascript
// Emotion 내부
collectedStyles = {
  'css-abc123': 'color: red;'
}
```

renderToString 호출의 결과로 HTML이 완성되면, `extractCritical(html)`을 호출해서 메모리에 수집한 CSS 중 HTML에서 쓰이고 있는 CSS를 추출한다.

```javascript
const { css } = extractCritical(html);
// css = '.css-abc123 { color: red; }'
```

CSS가 추출되면, HTML과 함께 전송한다.

```tsx showLineNumbers {4,6}
const fullHtml = `
  <html>
    <head>
      <style>${css}</style>
    </head>
    <body>${html}</body>
  </html>
`;

res.send(fullHtml);
```

정리하면, renderToString 호출로 HTML이 완성되어야 extractCritical이 실행되어 CSS가 추출될 수 있다. 이 모든 과정은 동기적으로 이루어진다.

### 2. RSC의 전송 방식: RSC Payload + HTML (+ Streaming)

RSC는 서버에서 컴포넌트를 렌더링해서 RSC Payload를 생성하고, Payload의 정보를 반영한 HTML이 만들어진다. RSC Payload에는 아래의 정보들이 담겨있다.

- 서버 컴포넌트 렌더링 결과
- 클라이언트 컴포넌트가 렌더링될 위치를 지정하는 자리 표시자와 해당 JavaScript 파일에 대한 참조
- 서버 컴포넌트에서 클라이언트 컴포넌트로 전달되는 모든 속성

>서버 컴포넌트의 경우엔 렌더링 결과와 그 안에서 사용하고 있는 클라이언트에 넘겨줄 prop에 대한 정보가 들어있겠다. 여기엔 문자열, 배열, 객체 등 직렬화될 수 있는 것들이 담긴다.

실제로 네트워크 탭을 열어서 `Fetch/XMR` 을 필터링 해보면 `_rsc=1r34m` 같은 파일이 보인다.
```
0:{"b":"6cQe1V7CgVBLUCgp_BZws",
"f":[[["",{"children":["__PAGE__",{},
"$undefined","$undefined","$undefined",3]},
"$undefined","$undefined",true,3],null,[null,null],true]],"S":false}
```

기존 SSR에서는 아예 컴포넌트를 다시 렌더링해 VDOM을 만든 반면에, RSC는 클라이언트에서 다시. 컴포넌트를 렌더링하지 않고 RSC Payload의 정보를 바탕으로 VDOM을 복원한다.

또한 RSC는 `<Suspense>`나 `loading.tsx`와 함께 **스트리밍 방식**으로 전송되기도 한다. 컴포넌트를 작은 청크로 나누어서 준비되는대로 클라이언트로 보내준다.

그래서 나는 Emotion이 에러를 낸 이유를 다음과 같이 정리해봤다.

1. 서버에서도 이모션의 styled 함수가 실행은 되고 Emotion 내부의 메모리에 수집은 될 것이다. **Emotion이 제공하는 런타임 스타일 생성 과정은 직렬화할 수 있는 객체가 아니라서 RSC Payload에 담기지 못하고 버려진다.**
2. Streaming 방식을 생각해봐도 전체 HTML이 완성될 때까지 기다려주지 않아 extractCritical로 스타일을 적용할 수 없다.


## 결론: Zero Run-Time CSS를 쓰자

결론은 Next App Router에서는 vanilla-extract, panda CSS 같은 Build-Time CSS를 써야 한다.
요즘 링크드인에서 오정민 대표님의 DevUp UI도 가끔 봤는데 다음에 한 번 써보고 싶다,, ㅋㅋ

오늘 회사에서 vanilla-extract의 작동방식에 대해 궁금해하면서 이것저것 찾아보다가, 갑자기 Emotion을 Next에서 왜 쓸 수 없을까?가 생각나서 이 글을 작성하게 됐다. RSC Payload에 대해서는 잘 몰랐는데 이것저것 찾아보면서 많이 배울 수 있었다.

## 참고 문서

https://nextjs.org/learn/dashboard-app/streaming

https://roy-jung.github.io/250323-react-server-components/ 를 좀 더 읽고 추가할 예정!