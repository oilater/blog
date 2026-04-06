---
title: 알고리즘으로 살펴보는 copy-on-write
date: 2026-04-05
---

오늘은 Leetcode Grind 75의 Medium 문제들을 풀면서 느낀 팁과 함께 **얕은 복사**의 중요성을 정리해보려 한다.

## 39. Combination Sum

[문제 구경하기](https://leetcode.com/problems/combination-sum/description/?envType=problem-list-v2&envId=rab78cw1)

`candidates` 배열과 `target` 숫자가 주어진다. 배열의 원소를 더해 `target`을 만들 수 있는 모든 숫자 Set을 배열에 담아 출력하는 문제다. 원소는 중복될 수 있다. 예시를 살펴보자.

**Example 1:**

- **Input:** candidates = `[2,3,6,7]`, target = 7
- **Output:** `[[2,2,3],[7]]`
- **Explanation:**  2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times. 7 is a candidate, and 7 = 7. These are the only two combinations.

**Example 2:**

- **Input:** candidates = `[2,3,5]`, target = 8
- **Output:** `[[2,2,2,2],[2,3,3],[3,5]]`

**Example 3:**

- **Input:** candidates = `[2]`, target = 1
- **Output:** `[]`

**Constraints:**

- `1 <= candidates.length <= 30`
- `2 <= candidates[i] <= 40`
- All elements of `candidates` are **distinct**.
- `1 <= target <= 40`

#### 풀이 전략

재귀 문제를 풀 때는 `'반복해야 하는 로직이 뭘까?'`를 먼저 생각해야 한다. 그러면 플랫(flat)하게 지금 해야 할 일만 생각할 수 있다. 

이 문제에서는 아래와 같이 생각해 볼 수 있다.

>**숫자 하나를 뽑은 뒤, 할 수 있는 일이 뭘까? (반복할 일)**
>- 자기 자신을 더하거나
>- 다른 숫자를 더하기


>**다음 숫자를 뽑는 일을 언제 멈춰야 할까? (종료 조건)**
>- 합이 target과 같다면 정답 배열에 추가 후 종료
>- 합이 target보다 크다면, 더 찾을 필요가 없으니 종료


#### 아래 코드의 문제는 뭘까?

처음에 짠 코드다. 알고리즘은 맞았다고 생각했지만 `[[], [], []]`처럼 빈 배열이 담겨 출력됐다.

```ts showLineNumbers {7, 21, 25}
function combinationSum(candidates: number[], target: number): number[][] {
  const res = [];

  function recursion(temp: number[], curIndex: number) {
    const currentSum = temp.reduce((acc, cur) => acc + cur, 0);
    if (currentSum === target) {
      res.push(temp);
      return;
    } 
    else if (currentSum > target) {
      return;
    }

    // 이미 지난 숫자는 안뽑아도 되므로 curIndex를 시작점으로
    for (let nextIndex = curIndex; nextIndex < candidates.length; nextIndex++) {
      // temp에 숫자 넣어보고
      temp.push(candidates[nextIndex]);
      // 정답 체크
      recursion(temp, nextIndex);
      // 아니라면 숫자 뺴기
      temp.pop();
    }
  }
  recursion([], 0);
  return res;
};
```

하단의 for문에서 숫자를 빼는 과정에서 `temp.pop()`을 할 때 이미 res에 포함된 temp까지 초기화되는 문제였다. 참조를 끊지 않았기 때문에 예상치 못한 부수 효과가 생겨버린 것이다. 

따라서 res에 푸시할 때는 얕은 복사를 통해 새로운 배열을 만들어 넣어줘야 한다.

```ts
if (sum === target) {
  res.push([...temp]); // 또는 res.push(temp.slice())
}
```

#### 성능 개선하기

현재는 currentSum을 구하기 위해 매 호출마다 `reduce`를 돌리고 있다. 재귀 함수의 매개변수에 `currentSum`을 추가해 개선해보자.

```ts
function combinationSum(candidates: number[], target: number): number[][] {
  const res = [];

  function recursion(temp: number[], currentIndex: number, currentSum: number) {
    if (currentSum === target) {
      res.push([...temp]);
      return;
    }
    if (currentSum > target) return;

    for (let nextIndex = currentIndex; nextIndex < candidates.length; nextIndex++) {
      temp.push(candidates[nextIndex]);
      recursion(temp, nextIndex, currentSum + candidates[nextIndex]);
      temp.pop();
    }
  }

  recursion([], 0, 0);
  return res;
};
```

#### 2차원 배열 초기화하기

2차원 배열을 초기화 할 때에도 참조값에 관한 비슷한 실수를 겪은 적이 있다.

```ts
const matrix = Array(10).fill(Array(10).fill(false))
```

이러면 행별로 배열이 따로 생기는 줄 알았지만, 모든 행이 같은 메모리 주소를 참조하게 된다.

```ts
const matrix = Array.from({ length: 10 }, () => Array(10).fill(false));
```

차라리 이렇게 `Array.from`을 쓰거나 for문 돌려서 초기화해야 한다. 

#### 마치며

실무에서는 보통 map을 돌리기 때문에 이런 문제를 겪을 일이 별로 없지만, 알고리즘은 이런 다양한 문제 상황을 겪을 수 있어 좋은 것 같다. 
