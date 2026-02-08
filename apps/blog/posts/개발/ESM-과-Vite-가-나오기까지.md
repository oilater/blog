---
title: ESM과 Vite가 나오기까지
date: 2026-02-08
---

## 꽤 작았던 자바스크립트 

자바스크립트는 원래 꽤 작았다. 서버에서 HTML을 만들면, 클라이언트는 그냥 전달받아서 띄워줬다. 자바스크립트는 버튼 클릭, 링크 같은 상호작용에서만 부분적으로 쓰였다. 모듈 시스템도 없었고, 그냥 필요할 때 `<script>`같이 인라인 스크립트를 선언하거나 스크립트 파일로 사용했다.

### 인턴할 때 실제로 PHP에서 본 코드 🥵 

작년 말, 3주 가량 인턴 했던 곳이 있었는데 정말 레거시 코드밭이었다. (PHP + Vanilla JS + jQuery + CSS) 스크립트 파일 하나가 3000줄이 넘었고, 개발과 디버깅이 정말 어려웠다. 파일 상단, 중간, 하단에 이런 스크립트가 배치되어 있었다. 코드 참조도 안돼서 마우스로 따라갈 수도 없었다.

```HTML
<script src="jquery.js"></script>
<!-- ... -->

<script src="jquery-ui.js"></script>
<script src="main-header.js"></script>
<script src="user-profile.js"></script>
<!-- ... -->

<script src="footer-logic.js"></script>
<script src="analytics.js"></script>
<script src="global-utils.js"></script>
<!-- ... -->
```
### 전역 스코프의 문제점

이런 파일이 있다고 하자.

```html
<!DOCTYPE html> 
<html lang="ko"> 
  <title>Bundler deep dive 💝</title>
  <head> 
    <script src="script-1.js"></script> 
    <script src="script-2.js"></script> 
    <script src="console-log.js"></script> 
  </head> 
</html>
```

`script-1.js`에선 `a`에 1을 넣는다.
```js
// script-1.js
var a = 1;
```

다른 파일에서 같은 이름의 변수를 선언한다.
```js
// script-2.js
var a = 2;
```

`console-log.js`에서 앞에서 무슨 일이 일어났는지도 영문도 모른 채 `a`를 찍어보면 2가 나온다.
```js
// console-log.js
console.log(a); // 2
```

`script-1.js`과 `script-2.js` 스크립트의 순서를 바꿔보면?

```html
<!DOCTYPE html> 
<html lang="en"> 
  <title>Bundler deep dive 👍</title>
  <head> 
    <script src="script-1.js"></script> 
    <script src="console-log.js"></script> 
    <script src="script-2.js"></script> 
  </head> 
</html>
```

`console-log.js`에서 `a`가 1이 나온다.
```js
// console-log.js
console.log(a); // 1
```

일반 스크립트는 브라우저에서 동기적으로 실행되므로 스크립트가 선언된 순서에 의존하기 때문이다.변수 하나도 헷갈리는데 프로젝트가 커지고 변수들이 점점 많아지면?

![대환장 파티](/posts/2026-02-08/party.jpg)


>var 키워드로 선언한 같은 이름의 변수가 여러 개일 때 왜 오류가 안날까?

자바스크립트 엔진은 스크립트를 실행하기 전에 **전역 실행 컨텍스트**를 만드는데 이때 **전역 객체(window)** 가 생성된다. var 키워드로 선언된 변수는 `undefined`라는 값과 함께 여기에 미리 등록된다. 이후 자바스크립트 실행 시점에 값이 할당된다. 그래서 이 변수는 전역 객체 스코프를 가진다. 

자바스크립트 엔진이 다시 `var a = 2`를 만나면 먼저 전역 객체 window 를 확인한 뒤에 이미 `window.a`가 있다면 초기화 단계를 건너뛰고 값만 할당한다. 

> 모듈 시스템의 필요성은 언제 제기되었을까?

함수 스코프를 가지는 let, const 이전에는 IIFE(즉시 실행 함수)로 스코프를 제한했다.

전역 스코프의 문제를 해결하는 let과 const 키워드가 비교적 최근(?)인 ES6(2015년)에서 등장했는데, 그럼 **개발자들이 모듈 시스템의 필요성을 느낀 시점은 그보다 훨씬 이전이 아닐까?** 라는 생각이 들었다. 

Gemini한테 물어보니 2009년 node.js의 등장을 언급했다.

>뭐야 그럼 모듈화에 대한 니즈는 결국 서버에서 먼저 시작된거야? 그럼 자바스크립트 모듈 시스템의 역사를 알려면 node.js를 먼저 살펴봐야겠네? 근데 원래 서버에서는 자바스크립트 안 쓰지 않았어?

이런 궁금증이 생겼다. 매번 Ajax, SPA 등장 같이 클라이언트 측의 발전 과정만 접했다보니 서버 측에 대해선 생각을 못해봤다.

### Node.js 등장 당시의 상황

자료를 찾아보니 더 많은 자바스크립트와 여러 모듈을 필요로 하는 서버 측에서 먼저 모듈 시스템의 필요성이 제기되었다는 걸 알았다. 2009년 Node.js가 등장하기 전 이미 Common JS라는 모듈 규약이 활발하게 논의되고 있었고, Node.js가 이를 표준으로 받아들인 것이다. 

또한, 2005년 Google이 구글 맵스를 통해 발표한 Ajax가 대중화되면서 브라우저에서 실행될 자바스크립트의 양 자체가 많아지게 됐다. 하지만 당시 브라우저는 자바스크립트를 실행하는 속도가 느려서 이런 복잡한 웹 앱을 돌리기 버거웠고, 2008년 구글은 V8 엔진을 만들어 내놓았다. node.js는 V8을 자바스크립트 엔진으로 채택했다.

## Common JS

2009년 크리스 코왈은 당시 문제점을 이렇게 말했다.

- 모듈 시스템이 없다. 스코프 격리나 의존성 관리를 위한 기능이 없다.
- 표준 라이브러리가 없다. 파일 시스템, 입출력 스트림 API나 이진 데이터를 위한 기본적인 데이터 유형조차 없다.
- 웹 서버나 DB와 같은 것들에 대한 표준 인터페이스를 가지고 있지 않다.
- 패키지 관리 시스템이 없다.

Kevin Dangoor은 서버 사이드에서 자바스크립트가 더 발전하려면 **표준을 정해야 한다!** 고 주장했고 함께 할 사람들을 모았다. https://groups.google.com/g/commonjs?pli=1 당시 사람들이 논의하던 구글 그룹인데, 페이지를 넘겨보면 Server JS에서 어느순간 Common JS로 이름이 바뀐 것을 볼 수 있다.


### 사용법

CommonJS에서 모듈은 하나의 파일을 가리킨다. <br/>
`exports`라는 객체를 통해 내보낼 값을 모듈의 루트에 추가한다.

```js
// math.js
module.exports.add = (a, b) => a + b; 
```

`require('./math.js')`은 `math.js` 파일을 찾고, 한 번 실행한 다음, 그 파일의 `module.exports` 값을 반환한다.

```js
const math = require('./math.js'); 

console.log(math.multiply(2, 3)); // 6
```

모듈의 또 다른 특징은 동기적으로 실행된다는 것이다.


### 동기 실행의 문제

서버에서는 파일 시스템의 접근이 빨라서 모듈이 동기적으로 실행돼도 괜찮다. 하지만 브라우저에서는 그렇지 않다. 네트워크 요청을 통해 스크립트를 받아야 하는데, 스크립트를 받기까지의 시간이 너무 오래 걸린다. 필요한 모듈들을 가져오는 동안 브라우저는 그냥 기다려야 한다.

## AMD(Asynchronous Module Definition)

그래서 비동기 방식의 모듈 시스템이 필요하다는 목소리가 커졌다. 그리고 AMD가 등장했다. 

아래 AMD의 define을 보면 `require`, `exports`처럼 간단하게 사용했던 Common JS보다 조금 더 복잡한데, 필요한 모듈들을 나열하고 다 가져오고나서 콜백으로 실행해야 하기 때문이다. 

```js
define("alpha", ["require", "exports", "beta"], function (require, exports, beta) { // 모듈의 내용 });
```

### 갈라 선 AMD

실제로 그룹 메일에서 CommonJS와 AMD가 갈라서는 토론 현장을 찾았다. *'서버만 고려하면서 왜 CommonJS로 이름 바꿨냐!'* 면서 오만하다는 의견도 보인다.

https://groups.google.com/g/commonjs/c/lqCWO8tMp48/m/gRqjWVP4364J

- **CommonJS 진영:** 우리는 서버에서 잘 돌아가는 표준을 만들고 싶다. 브라우저는 나중에 기술이 발전하면 해결될 문제다.

- **AMD 진영:** 지금 당장 브라우저 비동기 환경에서 대규모 앱을 돌려야 한다. 서버 방식은 브라우저에서 너무 느리고 디버깅도 힘들다.

- **Kris Kowal (CommonJS 핵심 멤버)**: 둘은 진화가 아니라 아예 재시작 수준으로 다르다. 합치려 노력해봤자 혼란만 주니, AMD는 이제 CommonJS라는 이름을 쓰지 말고 독립해서 나가라.

이후 AMD 사양을 채택한 Require JS같은 라이브러리가 등장했다. 하지만 AMD가 불편해서 node.js 스타일로 코드를 짤 수 있는 Browserify로 갈아타는 개발자들이 많아졌다.

https://codeofrob.com/entries/why-i-stopped-using-amd.html

- 누가 내 자바스크립트에 토한 것 같다
- 프로젝트가 커질수록 RequireJS 설정 파일이 수백 줄이 되고, 문서는 읽기 힘들 정도로 난해해진다.
- "이 라이브러리 AMD 지원하나?"를 매번 확인해야 한다. 지원 안 하면 `shim`이라는 설정을 따로 적어줘야 하는데, 이게 정말 귀찮고 에러가 많이 난다.

## 자바스크립트 표준이 되다, ESM

2015년 ECMA에서 **ESM(ECMAScript Modules)** 사양을 발표하면서 `require`, `define` 같은 사설 규격이 아닌 공식적으로 자바스크립트에 내장된 `import`, `export`을 사용할 수 있게 됐다.

## 번들러

번들러는 단순히 번들링만 하는 게 아니라 용량 압축, 구형 브라우저 지원, 하나로 묶는 것 등 많은 이점과 편의성을 가져다준다. 이제 다양한 번들러의 특징에 대해 알아보자.

### Webpack

#### 빌드 속도는 상대적으로 느리다

Webpack은 `webpack.config.js`에 `index.js`라는 시작점을 등록해놓는데, 우리가 `npm run dev`를 하는 시점에도 모듈들의 의존성을 파악해 의존 그래프를 그리기 시작한다. 자바스크립트 파일이 1000개가 넘으면 모든 파일을 낱낱이 찾아 그래프를 그려야 하므로 빌드 속도가 상대적으로 느리다.

#### 정적 파일들을 자바스크립트에 포함할 수 있다

Webpack에는 CSS, 이미지 같은 파일들을 해석하는 로더가 있다. Browserify까지만 해도 원래 CSS는 이런 식으로 HTML `<head>` 태그에 포함시켜왔다.

```html
<link rel="stylesheet" href="style.css">
```

Webpack은 `css-loader`같은 로더들을 제공한다. 따라서 css, 이미지 등도 하나의 모듈처럼 다룰 수 있다.

```js
// main.js 
import './style.css';

function component() { 
  const element = document.createElement('div');   
  element.classList.add('hello'); 
}
```

#### 자유도가 높지만, 설정이 복잡하다

Webpack은 강력한 개발 생태계가 뒷받침해주고 있다. 사용할 수 있는 플러그인도 다양하다.

```js
module.exports = {
  // ... output 등 설정들
  module: {
    rules: [
      {
        test: /\.css$/, // .css로 끝나는 파일을 찾으면
        use: ['style-loader', 'css-loader'], // 이 도구들을 순서대로 사용해
      },
      {
        test: /\.(png|jpg|gif)$/, // 이미지 파일을 찾으면
        type: 'asset/resource', // 알아서 경로를 계산해서 결과물 폴더로 옮겨줘
      },
    ],
  },
};
```

여기에 아래와 같이 HtmlWebpackPlugin을 사용하면 빌드된 JS 파일을 HTML에 꽂아 넣어서 `dist/index.html`을 생성해준다.

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // ... 생략
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 내가 만든 원본 HTML 파일을 가져와서
      filename: 'index.html',       // dist 폴더에 새 index.html을 만들어줘
    }),
  ],
};
```

하지만 이런 걸 알아서 해주는 Vite와는 다르게, 개발자가 css-loader, HtmlWebpackPlugin 같은 플러그인을 직접 설정해줘야 한다. 부품을 직접 골라 조립해야 하므로 자유도는 높지만 설정이 복잡하다는 단점이 있다.

### Rollup

Rollup은 빌드 결과물이 깨끗하다. 빌드 시 Webpack은 파일 간의 충돌을 막기 위해 각 모듈을 함수로 감싸는 반면, Rollup은 이름이 겹친다면 `name_1`, `name_2` 로 이름만 바꿔서 하나의 긴 코드를 쭉 읽듯이 작은 크기의 번들을 만든다.

하지만 대형 애플리케이션을 다룰 때는 설정이 복잡하다. 롤업은 자바스크립트 모듈을 깔끔하게 합치는데 최적화된 번들러이기 때문에, 대형 애플리케이션에서는 추가로 복잡한 설정들을 해줘야 한다. 대형 앱에는 자바스크립트 파일 뿐만 아니라 CSS, 이미지 등 다양한 에셋들이 포함돼 있기 때문이다.

### ESBuild

앞선 Webpack, Rollup은 자바스크립트(node.js) 기반으로 작성된 번들러다. 하지만 ESBuild는 Go 언어로 작성되었기 때문에 10배에서 100배까지도 빠르다. Go 언어의 특징인 고루틴을 활용해 여러 개의 코어를 동시에 사용하기 때문이며, 직접 만든 자체 트랜스파일러를 통해 Babel이 없이도 최신 문법 변환이 가능하다. 

하지만 code splitting 및 CSS와 관련된 처리가 아직 미비하며, es5 이하의 문법을 아직 100%는 지원하지 않는다.

### Vite

Vite는 번들링은 Rollup에 맡기고, 개발 서버는 자체적으로 제공하는 최신 빌드 툴이다.

#### 1. Native ESM

Vite는 번들링 없이 개발 서버를 띄운다. 최신 브라우저는 ESM(`import/export`)을 직접 해석할 수 있으므로, `import './App.js'`를 만나면 그제야 서버에 요청한다. 너무 늦는 거 아니야? 생각하겠지만 서버를 띄우기 전에 10,000개의 파일을 합쳐야 하는 Webpack과 비교해보면 훨씬 빠르게 서버를 띄울 수 있다.

#### 2. HMR과 304 Not Modified

HMR(Hot Module Replacement)에서 더 극명한데, 개발자가 코드 한 줄을 고치면 Webpack은 바뀐 파일로 인해 전체 번들을 재구성해야 하는데, Vite는 수정된 파일만 다시 요청하면 된다. 또한 기존에 요청한 파일을 다시 요청했을 때 Vite 서버는 검증을 통해 수정 사항이 없다면 가벼운 304 Not Modified 응답을 보낸다. 이로써 대역폭 비용을 절감할 수 있다.

#### 3. 사전 번들링

또한 Vite는 esbuild를 통해 사전 번들링을 한다. 브라우저는 require()같은 CommonJS 문법을 이해하지 못하는데, 사전 번들링에서 CommonJS 문법을 ESM으로 변환된다. 

또 문제는 라이브러리들은 트리셰이킹을 위해 다양한 파일로 쪼개져서 배포되는데, 브라우저 입장에서는 의존성이 있는 파일들을 모두 HTTP 요청으로 가져와야 하는 문제가 생긴다. 개발 서버를 돌리는 동안 Vite는 esbuild를 통해 이것들을 하나의 ESM 파일로 합쳐서 브라우저의 네트워크 요청 횟수를 줄인다.

#### 4. 배포 시엔 Rollup을 통한 번들링

배포 단계에서까지 ESM 기반을 사용하진 않는다. HTTP/2의 멀티플렉싱이 아무리 발전했어도 최적화된 몇 개의 청크를 받는 게 더 빠르기 때문이다. 따라서 배포 단계에서는 성능을 위해 Rollup을 사용해 번들링한다.


# 레퍼런스

- https://d2.naver.com/helloworld/12864
- https://arstechnica.com/information-technology/2009/12/commonjs-effort-sets-javascript-on-path-for-world-domination/
- https://groups.google.com/g/commonjs?pli=1
- [CommonJS](http://commonjs.org/)
- https://yceffort.kr/2023/05/what-is-commonjs
- https://codeofrob.com/entries/why-i-stopped-using-amd.html
- https://frontend-fundamentals.com/bundling/bundler.html
- https://ko.vite.dev/guide/why.html