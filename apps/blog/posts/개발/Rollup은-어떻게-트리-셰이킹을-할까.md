---
title: Rollup은 어떻게 트리 셰이킹을 할까
date: 2026-02-20
---

### Rollup을 소개합니다

>**Compile small pieces of code into something larger and more complex**

Rollup은 작은 코드 조각들을 거대한 코드로 묶어주는 자바스크립트 모듈 번들러다. 개발자가 편하게 ES 모듈을 사용해 코드를 작성하면, 롤업이 각 모듈을 묶어 번들을 생성해주고 트리셰이킹을 통해 깔끔한 결과물을 만들어낸다. 

Rollup은 ES 모듈을 기반으로 하기 때문에, ES 모듈과 `import/export`에 대한 이해가 필수적인데, 먼저 ES 모듈이 어떻게 동작하는지 간략히 살펴보자.

### ES 모듈의 동작 과정

ES 모듈은 비동기적으로 작동하는데, `async/await`같은 비동기는 아니다. CommonJS같이 스크립트를 로드하면 바로 실행되고, 다른 모듈을 만나면 동기적으로 실행하고... 이런 방식이 아니라, **구축-인스턴스화-평가** 의 단계가 따로 별개로 진행된다.

##### 구축

브라우저나 `node.js`로더가 `a.js`를 로드하면, 먼저 `import` 문을 스캔해 즉시 `b.js`를 다운로드한다.
##### 인스턴스화

모든 `import` 문을 스캔하고나면, 각 모듈을 인스턴스화하는 과정을 거친다. 만약 모듈 A에서 모듈 B의 `sayHi` 함수를 가져다 쓴다고 하면 엔진은 메모리에 `sayHi`를 위한 공간을 만든 뒤 모듈 A, B가 참조할 수 있도록 연결 통로를 설정한다.
##### 평가

의존성 그래프의 가장 깊숙한 곳부터 코드를 실행한다. 이 과정에서 아까 만든 메모리 공간에 값을 채워넣어 상위 모듈에서 값을 사용할 수 있다.

# Rollup은 어떻게 트리 셰이킹을 할까?

https://github.com/rollup/rollup-starter-code-splitting 을 실습하면 rollup의 기본적인 설정과 트리셰이킹의 결과물을 확인해 볼 수 있다. 

트리 셰이킹을 하기 위해 Rollup 내부에서 어떤 일이 일어날까? 

코드를 직접 따라가봤는데 너무 어려웠다,,, 그래도 AI와 함께 이해해보려고 노력했다.

## config 가공하기

Rollup은 `rollup.config.mjs`를 어떻게 실행할까?

```js
export default {                                          
  input: 'src/main.js',                                   
  output: { file: 'dist/bundle.js', format: 'es' },       
  plugins: [nodeResolve(), commonjs()],                   
  treeshake: { moduleSideEffects: false }
};
```

Rollup의 `package.json`은 ESM, CJS, CLI에 대해 각각의 진입점을 제공한다. <br/>
개발자가 JavaScript API를 직접 쓰는 경우도 있고, 다음과 같이 CLI로 실행하는 경우도 있기 때문이다.

```bash
rollup -c rollup.config.mjs
```

어쨌든 config는 `rollup()`의 인자인 `rawInputOptions`으로 들어간다. 
 
```ts
// src/rollup/rollup.ts

export default function rollup(rawInputOptions: RollupOptions): Promise<RollupBuild> {
  return rollupInternal(rawInputOptions, null);
}
```

`rollupInternal` 함수 내부에서는 `getProcessedInputOptions()`,  `normalizeInputOptions()` 같은 함수들을 통해 config를 rollup이 사용하기 좋게 가공한다. 가장 먼저 `plugins`을 처리하며, 다른 옵션들도 처리된다.

## Build

Rollup의 빌드 과정은 위에서 살펴본 ESM의 동작 방식과 거의 똑같다. `generateModuleGraph()`로 import 문을 따라가며 모듈을 수집하고 `sortAndBindModules()` 로 실행 순서를 정렬하고 바인딩한다.

`graph.includeStatements()`에서 트리쉐이킹이 진행된다.

```ts
// 간략히
async build(): Promise<void> {
	await this.generateModuleGraph();
	this.phase = BuildPhase.ANALYSE;
	this.sortAndBindModules();
	this.includeStatements(); // 트리 셰이킹 !
	this.phase = BuildPhase.GENERATE;
}
```

### 트리 셰이킹

#### 파일 선별하기

`includeStatements()` 함수 내부에선 `markModuleAndImpureDependenciesAsExecuted()`가 실행되는데, 진입점으로 설정된 파일들(entryModules)을 돌면서 연결된 것들 중 SideEffect가 있는 파일들을 트리셰이킹 대상에 포함하기 위해 마킹해놓는다. 이 과정은 BFS(너비 우선 탐색)로 진행된다.

```ts
// Graph.ts 
// includeStatements 내부
export function markModuleAndImpureDependenciesAsExecuted(baseModule: Module): void {
  baseModule.isExecuted = true; // 진입 모듈은 당연히 트리쉐이킹 검사 대상에 포함
  const modules = [baseModule]; // queue로 관리하기 위해 배열에 집어넣음
  const visitedModules = new Set<string>(); // a -> c, b -> c 참조일 때 중복 방지

  for (const module of modules) {
    for (const dependency of [...module.dependencies, ...module.implicitlyLoadedBefore]) { // 모듈의 의존성을 돌면서
      if (
        !(dependency instanceof ExternalModule) && // 외부 모듈이 아니고
        !dependency.isExecuted && // 아직 검사 대상으로 마킹되지 않았고
        (dependency.info.moduleSideEffects || module.implicitlyLoadedBefore.has(dependency)) && // 사이드 이펙트가 있거나 논리상 먼저 실행되어야 하는 경우이고
        !visitedModules.has(dependency.id) // 방문한 적이 없으면
      ) {
        dependency.isExecuted = true; // 검사 대상에 포함
        visitedModules.add(dependency.id);
        modules.push(dependency); // 큐에 검사할 항목으로 추가 (BFS)
      }
    }
  }
}
``` 

이 작업은 모든 진입점에 대해 반복된다. 우리가 config에서 설정한 `main.js` 같은 진입점이 포함되며, 플러그인을 사용할 때 빌드 도중 청크가 생성된다면 해당 파일도 진입점이 된다.

```ts
const entryModules = [...this.entryModules, ...this.implicitEntryModules];

for (const module of entryModules) {
  markModuleAndImpureDependenciesAsExecuted(module);
}
```

#### 문장 선별하기

파일 단위의 마킹이 끝나면, 본격적으로 한 줄씩 확인하며 살릴 문장을 고른다.

Rollup의 기본 `treeshake` 옵션은 `true` 이며, 직접 false로 설정한 경우는`module.includeAllInBundle()`이 실행된다. true인 경우를 살펴보자.

```ts
if (this.options.treeshake) {
  let treeshakingPass = 1; // 1회독
  this.newlyIncludedVariableInits.clear();
  do {
    this.needsTreeshakingPass = false; // 일단 트리셰이킹 할 게 없다고 가정
    for (const module of this.modules) {
      if (module.isExecuted) { // 아까 했던 작업
        module.hasTreeShakingPassStarted = true;
        if (module.info.moduleSideEffects === 'no-treeshake') {
          module.includeAllInBundle();
        } else {
          module.include(); // !
        }
        for (const entity of this.newlyIncludedVariableInits) {
          this.newlyIncludedVariableInits.delete(entity);
          entity.include(createInclusionContext(), false);
        }
      }
    }
	// ...
	
  } while (this.needsTreeshakingPass);
}
```

`needsTreeshakingPass`라는 `boolean` 타입 변수와 do while 문을 활용해 더 이상 트리셰이킹 할 문장이 없을 때까지 반복한다.

graph.build()의 첫 번째 단계였던 generateModuleGraph() 때 AST가 완성됐고, `sortAndBindModules()`로 참조하는 변수들이 바인드되었다. `module.include()`는 AST를 재귀적으로 돌면서 사이드 이펙트가 있는 문장들과 그 문장이 참조하는 변수들을 재귀적으로 찾아 포함시킨다. 

```ts
include(): void {
  const context = createInclusionContext();
  if (this.ast!.shouldBeIncluded(context)) this.ast!.include(context, false);
}
```

이렇게 트리 셰이킹이 끝나면 모든 AST 노드는 `include: ture/false`가 결정된다. 이후 Generate 단계에서는 `include: true`인 노드들을 파일로 만든다. 설정에 따라 단일 청크, 모듈 당 하나의 청크, 또는 자동 분할 등으로 파일을 만든다고 하는데 이 부분 코드는 진짜 어려워서 아예 이해를 못하겠다,, ㅋㅋㅋ

## 마치며

트리 셰이킹에 관련된 핵심 코드 위주로만 소개했지만 사실 저 함수들 안에도 수많은 로직들이 있다. 소스 코드를 직접 까보니 진짜 이런 건 어떻게 생각하는 걸까 싶기도 하고, 알고리즘과 자료구조에 대한 기본기가 중요하다는 걸 느끼게 된다.

트리 셰이킹의 대략적인 과정을 살펴봤는데, 완벽히 이해했다고 할 순 없지만 실제로 적용해보면서 더 고민해보려고 한다.

## 레퍼런스

- https://rollupjs.org/
- https://github.com/rollup/rollup-starter-code-splittingw
- https://github.com/rollup/rollup