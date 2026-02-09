---
title: Webpack으로 문제 해결하기
date: 2026-02-09
---
번들러는 왜 필요할까? 

이번 시간에는 프레임워크나 빌드 툴 없이 라이브러리를 import 하는 경우 만나는 문제를 알아보고, 직접 Webpack을 설정하면서 해결해보자. 

https://www.youtube.com/watch?v=5IG4UmULyoA 영상을 바탕으로 로더와 플러그인까지 설정해보았다.궁금할만한 부분에는 추가 설명을 덧붙였다.

## 문제 상황 만들기

1. 먼저 프로젝트 폴더를 열고 `src/index.js`를 만들어보자.

```js
// src/index.js
console.log('Hello World');
```

2. 이제 `public/index.html` 을 만들어서 위 스크립트를 로드해본다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="../src/index.js"></script>
  </head>
  <body>
  </body>
</html>
```

3. `npm init -y`로 라이브러리 의존성을 관리할 `package.json` 파일을 만들고, 아래의 명령어로 lodash를 의존성에 추가하자.

```
npm install lodash
```

4. 아까 `src/index.js`에 lodash의 camelCase를 적용하고, 브라우저 콘솔에 찍어보자.

```js
// src/index.js
import { camelCase } from 'lodash';

console.log(camelCase('Hello World'));
```

모듈 밖에서 import 문을 사용할 수 없다는 오류가 난다.

```
Uncaught SyntaxError: Cannot use import statement outside a module (at index.js:1:1)
```

브라우저는 `<script src="../src/index.js"></script>`를 일반 스크립트로 보고 있는데 ESM 문법인 `import`를 사용했기 때문이다. 브라우저는 모듈 문법을 이해할 수 있지만 스크립트에 `type="module"`을 붙여 모듈 스크립트임을 알려줘야 한다.

그럼 `type="module"`을 붙이면 해결될까?

```
index.html:1 Uncaught TypeError: Failed to resolve module specifier "lodash". Relative references must start with either "/", "./", or "../".
```

`import ... from 'lodash'`라고만 적어 놓아서 어디서 가져올지 모르겠으니, `./` 같이 정확한 경로를 말해달라는 오류다. 

## Node.js에서 라이브러리 파일을 찾는 법

Node.js 환경에서는 파일 시스템을 기반으로 node_modules를 뒤져서 lodash를 찾아낼 수 있다. 현재 폴더에서 `node_modules`를 찾아보고, 없다면 상위 폴더로 가서 `node_modules`를 뒤지는 식이다. 이 과정은 루트 `/` 디렉토리에 도달할 때까지 계속된다. 만약 lodash를 찾으면 그 안의 `package.json` 파일을 읽어서 "main"에 적혀있는 `lodash.js` 라는 진입점(entry point)을 찾아 실행한다.

`node_modules/lodash/package.json` 을 살펴보자.

```json
{
  "name": "lodash",
  "version": "4.17.23",
  "description": "Lodash modular utilities.",
  "keywords": "modules, stdlib, util",
  "homepage": "https://lodash.com/",
  "repository": "lodash/lodash",
  "icon": "https://lodash.com/icon.svg",
  "license": "MIT",
  "main": "lodash.js", // entry point
  "author": "John-David Dalton <john.david.dalton@gmail.com>",
  "contributors": [
    "John-David Dalton <john.david.dalton@gmail.com>",
    "Mathias Bynens <mathias@qiwi.be>"
  ],
  "scripts": { 
    "test": "echo \"See https://travis-ci.org/lodash-archive/lodash-cli for testing details.\"" 
  }
}
```

## 브라우저에서는 왜 안 될까?

일단 브라우저는 `package.json` 파일을 읽을 줄 모른다. 그저 URL 주소만 이해하며, 해당 주소로 GET 요청을 보내서 파일을 가져온다. 따라서 저 코드가 오류가 없으려면 아래와 같이 cdn 주소를 적어주어야 한다.

```js
import _ from 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/+esm';
```

또는 importMap을 활용할 수 있는데, 이렇게 써두면 브라우저가 `import _ from 'lodash'`를 이해할 수 있다.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <script type="importmap">
    {
      "imports": {
        "lodash": "https://cdn.jsdelivr.net/npm/lodash@4.17.21/+esm"
      }
    }
    </script>

    <script type="module" src="../src/index.js"></script>
</head>
<body>
</body>
</html>
```

## Webpack 설치하기

웹팩을 통해 이 문제를 해결할 수 있다. 아래 명령어로 설치해보자.

```bash
npm install --save-dev webpack webpack-cli
```

`package.json`에 `"build"`라는 이름의 script를 추가해보자. 이제 `npm run build`로 스크립트를 실행하면 webpack을 실행할 수 있다. 만약 오류가 난다면, `package.json`에 `"type": "module"`을 추가해보자.

```json
"script": {
  "build": "webpack"
}
```

### npm run build를 하면 일어나는 일

`npm run build`를 입력하면 webpack은 main 진입점인 `index.js` 파일의 코드를 분석한 후, 브라우저가 코드를 읽을 수 있도록 프로덕션 코드인 `dist/main.js` 파일로 컴파일한다. 

아래와 같이 mode를 설정할 수 있다. 
`production`으로 설정하면 성능 향상을 위해 내부적으로 UglifyJS 또는 Terser 같은 도구로 코드를 압축한다.

```json
"scripts": { 
  "build": "webpack --mode production", 
  "dev": "webpack --mode development" 
}
```

컴파일 된 코드를 보자. ES6의 화살표 함수가 그대로 남아있는 걸 보면 트랜스파일(최신 문법을 지원하지 않는 브라우저를 위해 ES6의 코드를 예전 버전의 자바스크립트 코드로 변환하는 과정)은 거치지 않았음을 알 수 있다.

```js
(()=>{var n={543(n,t,r){var e;n=r.nmd(n),function(){var u,i="Expected a function",o="__lodash_hash_undefined__",f="__lodash_placeholder__",a=32,c=128,l=1/0,s=9007199254740991,h=NaN,p=4294967295,v
```

이제 다시 `public/index.html`로 가보자. 이제 `src/index.js`가 아닌, webpack을 통해 빌드된 `dist/index.js` 스크립트를 불러오도록 설정하자.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="../dist/main.js"></script>
  </head>
  <body>
  </body>
</html>
```

이제 콘솔창에 오류 없이 잘 찍히는 걸 볼 수 있다.

```
helloWorld
```

첫 번째 모듈 번들링에 성공했다! 🎉

### webpack.config.js 간단히 살펴보기

`webpack.config.js`에서 웹팩의 동작 방식을 직접 지정할 수 있다. 중요한 부분을 위주로 살펴보자.

#### entry

애플리케이션의 진입점을 정의한다. 

```js
module.exports = {
  entry: './src/index.js',
}
```

여러 진입점을 정의하기 위해 객체 형태로 쓸 수도 있다. 실제 해당 코드가 필요한 곳에서만 로드되게 하는 **코드 스플리팅**에 사용된다.

```js
module.exports = {
  entry: {
	foo: 'foo.js',
	bar: 'bar.js',
  }
}
```

#### output

output은 컴파일된 자바스크립트를 저장할 파일을 지정한다. 기본값은 위에서 살펴봤듯이 `main.js`이지만, 다른 이름으로 변경할 수 있다. 파일 위치를 지정할 때는 path같은 node.js 유틸리티를 사용해 일관된 경로 명을 생성할 수 있다. 아래처럼 CommonJS의 require 문법을 사용한다면 파일 이름을 `webpack.config.cjs`로 바꿔주자.

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
	filename: 'awesome.js',
	path: path.resolve(__dirname, 'dist'),
  }
}
```

#### 로더 적용해보기

이번엔 `src/style.scss` 파일을 추가해보자. `$text`는 scss 문법이다.

```scss
$text: orange;
$bg: black;

body { 
  color: $text; 
  background-color: $bg; 
}
```

그리고 `src/index.js`에서 import해보자.

```js
// src/index.js
import './style.scss';
import { camelCase } from 'lodash';

console.log(camelCase('hello world'));
```

"이 scss 파일을 처리하도록 구성된 로더가 없습니다"라는 오류가 발생한다.

로더가 뭘까? 로더는 파일을 전처리하는 방법이다. Webpack은 TypeScript, Markdown, CSS 등 다양한 로더를 지원한다.

> https://webpack.js.org/loaders/style-loader/

지금의 경우엔 css-loader, sas-loader, style-loader 3가지 패키지를 설치해야 한다. 

```bash
npm install --save-dev css-loader style-loader sass-loader
```

sass도 설치해주자.

```bash
npm install -D sass`
```

이후 웹팩 설정에서 module 속성을 추가해야 한다. 정규표현식으로 로더를 적용할 파일 형식을 설정하고, 사용할 로더를 정의한다. SCSS를 CSS로, CSS를 자바스크립트로 변환해 HTML에 삽입할 수 있도록 하는 것이다.

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
	filename: 'awesome.js',
	path: path.resolve(__dirname, 'dist'),
  },
  module: {
  rules: [
	{
	  test: /\.scss$/,
	  use: [
		'style-loader',
		'css-loader',
		'sass-loader',
	  ]
	}
 ]
};
```

#### 근데 CSS면 그냥 놔두면 되는데, 왜 굳이 JS로 변환하는 걸까?

**의존성을 통합하기 위함이다.** CSS를 JS로 변환하면, 특정 컴포넌트나 페이지를 사용할 때 HTML에 `<link>` 태그를 일일이 추가하지 않고 `import './style.scss'`로 편하게 사용할 수 있기 때문이다.

### 플러그인 적용해보기

이쯤되니까 Vite가 얼마나 편한 건지 알겠다.

웹팩에서는 로더가 대부분의 전처리를 해주지만, 플러그인 시스템을 사용해 웹팩 컴파일러를 직접 활용할 수도 있다. 플러그인을 사용하면 전체 컴파일 라이프사이클에 참여할 수 있다. `webpack-bundle-analyzer`을 사용해보자. `webpack-bundle-analyzer`는 자바스크립트 번들의 크기와 번들 크기에 영향을 미치는 종속성을 정확히 알려준다.

```bash
npm install --save-dev webpack-bundle-analyzer
```

설정은 간단하다. config에 plugins 배열을 생성하고 플러그인을 인스턴스화하면 된다.

```js
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'awesome.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
```

이제 빌드하면 번들 크기가 시각화되어 나온다. 참고로 next에선 `next-bundle-analyzer`를 사용하면 편하다.

### webpack 개발 서버 설정하기

지금까지는 변경사항이 있을 때마다 매번 `npm run build`를 치니까 번거로웠다. webpack은 로컬 개발 서버를 설정해 변경 사항을 감지하고 자동으로 다시 컴파일해주는 기능도 제공한다. 압축 및 핫모듈(HOC) 기능도 설정할 수 있다.

```bash
npm install --save-dev webpack-dev-server
```

plugins 밑에 아래와 같이 설정하자.

```js
devServer: {
  static: path.join(__dirname, 'public'),
  port: 9000
}
```

또 `package.json`에 아래와 같이 설정하고 `npm run dev`를 해보자.

```json
"scripts": {
  "dev": "webpack serve",
},
```

이제 수정사항이 생길 때마다 자동으로 빌드된다.

### 마치며

매번 설정이 까다롭다는 글만 읽다가, 직접 설정해보니 Vite가 그리웠다. 그래도 loader, plugins 등 직접 설정해보며 Webpack에 조금 더 익숙해질 수 있었다. Webpack의 단점은 빌드 시간이 오래걸리는 것인데, 이를 해결하기 위해 다양한 번들러와 빌드 툴이 생겨났다.