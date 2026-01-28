---
title: 피보나치 수열을 generator로?!
date: 2026-01-29
---

다시 알고리즘 열심히 할 거다.
<br/>오늘은 피보나치에 관한 재밌는 풀이법을 발견했다.

generator는 예전에 함수형 프로그래밍 강의에서 지연성 배울 때 진짜 재밌게 배웠던 건데 꼭 써보고 싶었다.
사실 유인동님 강의를 듣고나서 '*generator를 프론트엔드에서 어떻게 적용할 수 있을까?*'하는 고민을 계속 했는데 지금까지도 모르겠다. 애초에 백엔드에서 받는 JSON엔 배열이 담겨서 오는데 프론트 단에서는 generator 같은 걸 적용할 수가 없으니 말이다.


## 오늘의 문제

You are climbing a staircase. It takes `n` steps to reach the top.
Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?

**Example 1:**

**Input:** n = 2
**Output:** 2
**Explanation:** There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps

**Example 2:**

**Input:** n = 3
**Output:** 3
**Explanation:** There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step

**Constraints:**

- `1 <= n <= 45`

## 풀이

한 5번째까지 적어보고 피보나치 수열인 걸 알았다. 어케 이걸 보고 피보나치를 떠올리는데,,

**제미나이: n번째 계단에 도달하는 방법은 딱 두 가지 경로뿐입니다.**

1. n-1번째 계단에서 **1칸** 올라오기
2. n-2번째 계단에서 **2칸** 올라오기

- **n = 1:** (1) → **1가지**
- **n = 2:** (1+1, 2) → **2가지**
- **n = 3:** (1+1+1, 1+2, 2+1) → **3가지**

거꾸로 생각해보니 피보나치였다.<br/>
n=4일때는 2번째 전인 n=2에 도달하는 경우의 수와 1번째 전인 n=1에 도달하는 경우의 수를 더해주면 된다.

### 스택 메모리 터지는 풀이

```ts
function climbStairs(n: number): number {
  if (n <= 2) return n;
  return climbStairs(n - 2) + climbStairs(n - 1);
};
```
### DP

1, 2일 때 메모해놓고 3번째부턴 메모한 걸 이용해 구한다.

```ts
function climbStairs(n: number): number {
  if (n <= 2) return n;
  
  let first = 1;
  let second = 2;

  for (let i = 3; i <= n; i++) {
	let third = first + second;
	first = second;
	second = third;
  }
  return second;
};
```

### generator



```ts
function climbStairs(n: number): number {
  let res = 0;
  const gen: Generator<number> = fiboGenerator();
  
  for (let i = 0; i < n; i++) {
	res = gen.next().value;
  }
  
  return res;
};

function *fiboGenerator() {
  let first = 1;
  let second = 2;

  while(true) {
	yield first;
	[first, second] = [second, first + second];
  }
}
```

(작성 중)
## 결론

DP로 풀자