---
title: Next App Router에서 Emotion CSS를 쓸 수 없는 이유
date: 2026-01-21
---


몇 달 전, 포트폴리오를 React에서 Next로 마이그레이션하면서 Emotion을 사용하고 있는 대부분의 컴포넌트에서 에러가 터졌다. 그런데 신기하게도 'use client' 를 붙이면 에러가 사라졌다.

결국 모든 컴포넌트에 'use client'를 붙여야 하는 상황이 되어버렸고, 그러면 Next를 쓰는 의미가 없어졌다.
그래서 Emotion을 버리고 Vanilla-Extract로 갈아탔다.

당시에는 *'Emotion이 Next와 호환이 안되나보다'* 정도로 넘겼지만, 이젠 그 이유를 알아서 소개해보려고 한다.

왜 Next App Router에서는 Emotion을 쓸 수 없을까?

## RSC의 등장

Next의 App Router는 기본적으로 RSC(React Server Component) 방식을 채택했다. 먼저, RSC의 등장 배경을 살펴봐야 한다. 

>Next.js는 RSC를 확장해 Server Components를 만들었지만, 기본적으로 React Server Component 설계 철학을 모두 만족하고 있기 때문에 이 글에서는 RSC로 통일해서 표현했다.

### 기존 SSR의 문제점

RSC는 기존의 SSR 방식의 문제를 해결하기 위해 등장했다. 당시 SSR의 가장 큰 문제는 컴포넌트가 서버와 클라이언트에서 **이중 호출**된다는 것이었다.

초기 HTML을 빠르게 보여주기 위해 서버에서 리액트 컴포넌트를 실행하여 HTML을 만들어 전송하면, 브라우저는 HTML을 받은 후 컴포넌트를 호출해 기존 DOM에 이벤트와 상태를 연결하는 하이드레이션 과정을 거쳐야 한다. 결국 서버에서 실행된 컴포넌트라도 클라이언트에서 재실행되며, 이는 JS 번들에 포함된다는 것을 뜻한다.

### RSC의 해결책

RSC는 컴포넌트를 **서버 전용**과 **클라이언트 전용**으로 나눠서 이 문제를 해결했다. 서버 컴포넌트는 서버에서만 호출되어 가벼운 RSC Payload와 HTML을 전송하고, 클라이언트 컴포넌트만 기존과 같은 하이드레이션 과정을 거친다. 

>그래서 NextJS에서 'use client'를 붙여도 기본적으로 SSR(Server Side Rendering)이 된다. 다만 하이드레이션 과정을 거칠 뿐이다.

Next의 Page Router는 기존의 SSR 방식을 따르고, App Router는 RSC 방식을 따른다.
그럼 왜 App Router에서는 Emotion CSS를 쓰면 에러가 날까?

이유는 **전송방식의 차이** 때문이기도 하다.

## 전송 방식의 차이

### 1. 기존 SSR의 전송방식: 한꺼번에 보내기

일단 기존 SSR의 전송 방식에 대해 알아보자. 그리고 Emotion이 SSR에서 어떻게 실행될 수 있었는지 살펴보자.

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

```jsx
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

정리하면, renderToString 호출로 HTML이 완성되어야 extractCritical이 실행되어 CSS가 추출될 수 있다. 이 모든 과정이 동기적으로 이루어졌다.

### 2. RSC의 전송 방식: 스트리밍

RSC(React Server Component)는 **스트리밍 방식**을 사용한다.
컴포넌트가 호출되면 먼저 RSC Payload를 생성한 뒤 이걸 바탕으로 HTML을 생성한다. 
이렇게 만들어진 RSC Payload와 HTML을 바로 브라우저로 전송한다.

이 때 RSC Payload에는 직렬화가 가능한 문자, 숫자, 객체, 배열 등이 담길 수 있다. 이는 결국 텍스트로 브라우저에 전달된다.

네트워크 탭을 열어서 `Fetch/XMR` 을 필터링 해보면, `_rsc=1r34m` 같은 파일이 보인다. 
Response를 눌러보면 이런 문자열이 나오는데 이게 RSC Payload다.

```
0:{"b":"6cQe1V7CgVBLUCgp_BZws",
"f":[[["",{"children":["__PAGE__",{},
"$undefined","$undefined","$undefined",3]},
"$undefined","$undefined",true,3],null,[null,null],true]],"S":false}
```

> RSC Payload: 서버에서 컴포넌트를 렌더링한 결과를 직렬화 후 브라우저에 전달한 데이터


그래서 나는 App Router를 사용했을 때 Emotion이 에러를 낸 이유를 다음과 같이 정리했다.

1. **애초에 컴포넌트가 서버에서만 실행되어 Emotion 내부의 훅이 실행될 환경이 없다.** 하지만 use client를 붙이면 클라이언트 컴포넌트가 되어 클라이언트에서 실행될 기회를 얻는다.
2. 이걸 떠나서, 서버에서도 이모션의 styled 함수가 실행은 되고 Emotion 내부의 메모리에 수집은 될 것이다. 하지만 **Emotion이 제공하는 동적 스타일링 로직들은 직렬화할 수 있는 객체가 아니라서 RSC Payload에 담기지 못하고 버려진다.**
3. HTML과 RSC Payload는 완성될 때마다 브라우저로 보내지기 때문에, extractCritical이 실행되어 **스타일을 입힐 시간조차 없다.**


## 결론: Zero Run-Time CSS를 쓰자

결론은 Next App Router에서는 vanilla-extract, panda CSS 같은 Build-Time CSS를 써야 한다.
요즘 링크드인에서 오정민 대표님의 DevUp UI도 가끔 봤는데 다음에 한 번 써보고 싶다,, ㅋㅋ

오늘 회사에서 vanilla-extract의 작동방식에 대해 궁금해하면서 이것저것 찾아보다가, 갑자기 Emotion을 Next에서 왜 쓸 수 없을까?가 생각나서 이 글을 작성하게 됐다. RSC Payload에 대해서는 잘 몰랐는데 이것저것 찾아보면서 많이 배울 수 있었다.