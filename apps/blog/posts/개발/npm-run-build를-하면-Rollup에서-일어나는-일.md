---
title: npm run build를 하면 Rollup에서 일어나는 일
date: 2026-02-23
---
## Rollup이란?

>**Compile small pieces of code into something larger and more complex**

Rollup은 작은 코드 조각들을 거대한 코드로 묶어주는 번들러다. 개발자가 편하게 ESM을 사용해 코드를 작성하면, 롤업이 흩어진 파일들을 묶어 번들 파일로 만든다. 특히 트리 셰이킹을 통해 깔끔한 결과물을 만들어낸다는 특징이 있다. Rollup의 빌드 과정을 살펴보기 전에 먼저 ESM의 동작 과정을 간략히 살펴보자.

## ES Modules

ESM은 파일 로딩이 비동기적으로 이뤄진다. CommonJS처럼 코드를 실행하다가 `require()`를 만나면 그 자리에서 파일을 읽고 실행하는 방식이 아니라 **구축(Construction), 인스턴스화(Instantiation), 평가(Evaluation)** 의 세 단계로 나뉘어 진행된다.

#### 구축

브라우저나 `node.js` 같은 로더가 `a.js`를 로드하면 바로 코드를 실행하지 않고, 먼저  `import` 문을 스캔해 즉시 `b.js`를 다운로드한다. `b.js`에서도 같은 과정을 반복해 모든 의존성을 수집한다.

#### 인스턴스화

이후에는 각 모듈을 인스턴스화하는 과정을 거친다. 만약 모듈 A에서 모듈 B의 `sayHi` 함수를 가져다 쓴다고 하면 엔진은 메모리에 `sayHi`를 위한 공간을 만든 뒤 모듈 A, B가 참조할 수 있도록 연결 통로를 설정한다. 이걸 **live binding**이라고 하며, 값이 아닌 참조로 연결되기 때문에 모듈 B에서 값이 바뀌면 모듈 A에서도 바뀐 값이 반영된다.
#### 평가

의존성 그래프의 가장 깊숙한 곳부터 코드를 실행한다. 이 과정에서 아까 만든 메모리 공간에 값을 채워넣어 상위 모듈에서 값을 사용할 수 있게 된다.

## Rollup 내부에서 생기는 일

먼저 [Rollup Repl](https://rollupjs.org/repl/?version=4.59.0&shareable=eyJleGFtcGxlIjpudWxsLCJtb2R1bGVzIjpbeyJjb2RlIjoiLy8gVFJFRS1TSEFLSU5HXG5pbXBvcnQgeyBjdWJlIH0gZnJvbSAnLi9tYXRocy5qcyc7XG5cbmNvbnNvbGUubG9nKGN1YmUoNSkpOyAvLyAxMjUiLCJpc0VudHJ5Ijp0cnVlLCJuYW1lIjoibWFpbi5qcyJ9LHsiY29kZSI6Ii8vIG1hdGhzLmpzXG5cbi8vIFRoaXMgZnVuY3Rpb24gaXNuJ3QgdXNlZCBhbnl3aGVyZSwgc29cbi8vIFJvbGx1cCBleGNsdWRlcyBpdCBmcm9tIHRoZSBidW5kbGUuLi5cbmV4cG9ydCBjb25zdCBzcXVhcmUgPSB4ID0-IHggKiB4O1xuXG4vLyBUaGlzIGZ1bmN0aW9uIGdldHMgaW5jbHVkZWRcbi8vIHJld3JpdGUgdGhpcyBhcyBgc3F1YXJlKHgpICogeGBcbi8vIGFuZCBzZWUgd2hhdCBoYXBwZW5zIVxuZXhwb3J0IGNvbnN0IGN1YmUgPSBzcXVhcmUoeCkgKiB4O1xuXG4vLyBUaGlzIFwic2lkZSBlZmZlY3RcIiBjcmVhdGVzIGEgZ2xvYmFsXG4vLyB2YXJpYWJsZSBhbmQgd2lsbCBub3QgYmUgcmVtb3ZlZC5cbndpbmRvdy5lZmZlY3QxID0gJ2NyZWF0ZWQnO1xuXG5jb25zdCBpbmNsdWRlRWZmZWN0ID0gZmFsc2U7XG5pZiAoaW5jbHVkZUVmZmVjdCkge1xuXHQvLyBPbiB0aGUgb3RoZXIgaGFuZCwgdGhpcyBpcyBuZXZlclxuXHQvLyBleGVjdXRlZCBhbmQgdGh1cyByZW1vdmVkLlxuXHR3aW5kb3cuZWZmZWN0MSA9ICdub3QgY3JlYXRlZCc7XG59IiwiaXNFbnRyeSI6ZmFsc2UsIm5hbWUiOiJtYXRocy5qcyJ9XSwib3B0aW9ucyI6eyJvdXRwdXQiOnsiZm9ybWF0IjoiZXMifSwidHJlZXNoYWtlIjp0cnVlfX0=) 에서 Rollup이 만들어내는 결과물들을 살펴볼 수 있다.

이제 소스코드를 따라가보면서 우리가 `npm run build`를 하면 Rollup 내부에선 어떤 일이 일어나는지 살펴보자.

### Normalize

먼저, 개발자가 설정한 `rollup.config.js`가 Rollup의 메인 함수인 `rollup()`에 전달되어 가공된다.

```ts
// src/rollup/rollup.ts

export default function rollup(rawInputOptions: RollupOptions): Promise<RollupBuild> {
  return rollupInternal(rawInputOptions, null);
}
```

이때 `getProcessedInputOptions()`,  `normalizeInputOptions()` 같은 함수들을 통해 `plugins`과 옵션들을 처리한다.

### Build Phase

Rollup의 빌드는 `LOAD_AND_PARSE`, `ANALYZE`, `GENERATE` 라는 총 3단계로 진행된다. 

```ts
// 간략히
async build(): Promise<void> {
	// LOAD_AND_PARSE: 모듈 그래프 그리기 및 AST 생성
	await this.generateModuleGraph();
	
	// ANALYZE: 모듈 순서 정렬 및 트리 셰이킹 
	this.phase = BuildPhase.ANALYSE;
	this.sortAndBindModules();
	this.includeStatements(); // 트리 셰이킹은 여기서 일어난다. 번들에 포함할 문장들을 고른다.
	
	// GENERATE: 번들 파일 생성
	this.phase = BuildPhase.GENERATE;
}
```

#### generateModuleGraph

첫 단계인 `generateModuleGraph()`에서는 AST를 만든다. 먼저 우리가 `input`으로 설정한 진입점이 moduleLoader에 추가된다.

```ts
// Graph.ts

await this.moduleLoader.addEntryModules(normalizeEntryModules(this.options.input), true));
```

ModuleLoader를 따라가다보면, `setSource()`라는 함수를 만나는데, 여기서 AST를 만들기 시작한다. 이때 AST 노드가 `import`, `export`같은 정보를 스스로 등록할 수 있도록 `addImport()`, `addExport()` 같은 메서드를 `astContext`를 함께 넘겨준다.

```ts
// Module.ts

const astBuffer = await parseAsync(code, false, this.options.jsx !== false);
this.ast = convertProgram(astBuffer, programParent, this.scope);
```

>**Rollup이 AST를 만드는 방법**
>
>Rollup은 AST를 만들 때 **SWC**를 사용한다. SWC는 Rust 기반의 컴파일러로, JavaScript로 만들어진 Babel보다 훨씬 빠르다. 똑같이 npm에서 다운받을 수 있지만, 플랫폼별 바이너리 파일을 제공해 엔진 수준에서 빠르게 컴파일한다. 
>
>Rollup은 Rust와 TypeScript를 연결해주는 [NAPI-RS](https://napi.rs/)를 통해 SWC를 Node.js에서 호출하고, 반환된 바이너리 Buffer를 TypeScript의 AST 노드 객체로 변환한다.


#### sortAndBindModules

두 번째 단계에서는 의존 관계에 따라 모듈의 실행 순서를 결정한다. 이 부분은 코드가 그렇게 복잡하지 않고 재밌다. 예제와 함께 살펴보자.

1. dependencies에 있는 것들은 정적 import으로 참조하는 모듈들이다. 곧바로 재귀를 돌리며 분석한다. 

```ts
for (const dependency of module.dependencies) {
  handleSyncLoadedModule(dependency, module);
}
```

2. dynamic imports의 경우에는 두 가지로 분기 처리한다. `top-level-await`의 경우엔 어차피 모듈을 기다려야 하니까 정적 import와 마찬가지로 재귀를 돌리고, 아닌 경우엔 dynamicImports Set에 모아두고 나중에 처리한다.
```ts
for (const { node: { resolution, scope } } of module.dynamicImports) {
  if (resolution instanceof Module) {
    if (scope.context.usesTopLevelAwait) {
      handleSyncLoadedModule(resolution, module);
    } else {
      dynamicImports.add(resolution);
    }
  }
}
```

`top-level-await`는 이런 경우다. 어차피 `lazy.js` 모듈을 기다려야 하므로 동기 로딩과 같은 레벨에서 재귀 호출된다.

```ts
// main.js

const data = await import('./lazy.js');
```

이렇게 의존성이 모두 추가된 뒤에 현재 모듈이 추가된다.

```ts
orderedModules.push(module);
```

그 다음 dynamicImports를 처리한다

```ts
for (const currentEntry of dynamicImports) {
  if (!parents.has(currentEntry)) {
    parents.set(currentEntry, null);
    analyseModule(currentEntry);
  }
}
```

Rollup의 빌드 과정이 앞서 살펴 본 ESM의 구축, 인스턴스화 과정과 거의 비슷하다는 걸 알 수 있다. Rollup은 번들 파일을 만들기 위해 이 과정을 거치고 ESM은 런타임에 매번 실행한다는 차이가 있다. V8 엔진에도 이런 과정을 구현한 C++ 코드가 있을 것 같다.

#### includeStatements

includeStatements에서는 트리 셰이킹이 진행된다.
##### 파일 선별하기

먼저 진입점인 모듈과 연결된 파일들 중 사이드 이펙트가 있는 파일들은 번들에 포함하기 위해 마킹해놓는다. 

```ts
// Graph.ts 
// includeStatements 내부
export function markModuleAndImpureDependenciesAsExecuted(baseModule: Module): void {
  baseModule.isExecuted = true; // 진입 모듈은 당연히 트리쉐이킹 검사 대상에 포함
  const modules = [baseModule]; // queue로 관리하기 위해 배열에 집어넣음
  const visitedModules = new Set<string>(); // 중복 방지

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

#### 문장 선별하기

파일 단위의 마킹이 끝나면, 한 줄씩 확인하며 포함시킬 문장을 고른다.

Rollup의 기본 `treeshake` 옵션은 `true` 이며, 직접 false로 설정한 경우에는 `includeAllInBundle()`이 실행된다.

```ts
if (this.options.treeshake) { // treeshake: true인 경우
  let treeshakingPass = 1;
  this.newlyIncludedVariableInits.clear();
  do {
    this.needsTreeshakingPass = false; // 일단 트리셰이킹 할 게 없다고 가정
    for (const module of this.modules) {
      if (module.isExecuted) { // 마킹되어 있다면(아까 살펴본 것)
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
	
  } while (this.needsTreeshakingPass); // 트리 셰이킹 할 문장이 없을 때까지 반복
}
```

`module.include()`에서는 AST를 돌면서 사이드 이펙트가 있는 문장과 그 문장이 참조하는 변수들을 재귀적으로 찾아서 포함시킨다. 

```ts
include(): void {
  // ...
  if (this.ast!.shouldBeIncluded(context)) this.ast!.include(context, false);
}
```

이렇게 트리 셰이킹이 끝나면 모든 AST 노드의 `include: true/false`가 결정된다. 

이후 Generate 단계에서는 `include: true`인 노드들을 파일로 만든다. 설정에 따라 단일 청크, 모듈 당 하나의 청크, 또는 자동 분할 등으로 파일을 만드는데, 코드가 복잡하다.

## 마치며

직접 소스코드를 따라가보면서 번들링의 전체적인 과정을 이해할 수 있었다. 두 번에 걸쳐서 코드를 살펴봤는데 처음 볼 땐 이런 복잡한 코드를 본 적이 많지 않아서 너무 힘들었다. 다시 보니 굳이 안읽어도 되는 부분들은 걸러서 볼 수 있었고 흐름을 파악하기가 좀 더 편해졌다. 현재 Vite 8 Beta 버전이 개발/프로덕션의 번들러를 Rust 기반의 Rolldown으로 통합했는데, Rolldown에 대해서도 궁금해졌다.

다음에는 직접 Rollup을 적용해 라이브러리를 번들링 해볼 생각이다. 특히 트리 셰이킹을 더 잘할 수 있도록 고민해봐야겠다.

## 레퍼런스

- https://rollupjs.org/
- [Rollup Repl](https://rollupjs.org/repl/?version=4.59.0&shareable=eyJleGFtcGxlIjpudWxsLCJtb2R1bGVzIjpbeyJjb2RlIjoiLy8gVFJFRS1TSEFLSU5HXG5pbXBvcnQgeyBjdWJlIH0gZnJvbSAnLi9tYXRocy5qcyc7XG5cbmNvbnNvbGUubG9nKGN1YmUoNSkpOyAvLyAxMjUiLCJpc0VudHJ5Ijp0cnVlLCJuYW1lIjoibWFpbi5qcyJ9LHsiY29kZSI6Ii8vIG1hdGhzLmpzXG5cbi8vIFRoaXMgZnVuY3Rpb24gaXNuJ3QgdXNlZCBhbnl3aGVyZSwgc29cbi8vIFJvbGx1cCBleGNsdWRlcyBpdCBmcm9tIHRoZSBidW5kbGUuLi5cbmV4cG9ydCBjb25zdCBzcXVhcmUgPSB4ID0-IHggKiB4O1xuXG4vLyBUaGlzIGZ1bmN0aW9uIGdldHMgaW5jbHVkZWRcbi8vIHJld3JpdGUgdGhpcyBhcyBgc3F1YXJlKHgpICogeGBcbi8vIGFuZCBzZWUgd2hhdCBoYXBwZW5zIVxuZXhwb3J0IGNvbnN0IGN1YmUgPSBzcXVhcmUoeCkgKiB4O1xuXG4vLyBUaGlzIFwic2lkZSBlZmZlY3RcIiBjcmVhdGVzIGEgZ2xvYmFsXG4vLyB2YXJpYWJsZSBhbmQgd2lsbCBub3QgYmUgcmVtb3ZlZC5cbndpbmRvdy5lZmZlY3QxID0gJ2NyZWF0ZWQnO1xuXG5jb25zdCBpbmNsdWRlRWZmZWN0ID0gZmFsc2U7XG5pZiAoaW5jbHVkZUVmZmVjdCkge1xuXHQvLyBPbiB0aGUgb3RoZXIgaGFuZCwgdGhpcyBpcyBuZXZlclxuXHQvLyBleGVjdXRlZCBhbmQgdGh1cyByZW1vdmVkLlxuXHR3aW5kb3cuZWZmZWN0MSA9ICdub3QgY3JlYXRlZCc7XG59IiwiaXNFbnRyeSI6ZmFsc2UsIm5hbWUiOiJtYXRocy5qcyJ9XSwib3B0aW9ucyI6eyJvdXRwdXQiOnsiZm9ybWF0IjoiZXMifSwidHJlZXNoYWtlIjp0cnVlfX0=)
- https://github.com/rollup/rollup-starter-code-splitting
- https://github.com/rollup/rollup
- https://napi.rs/
- https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/