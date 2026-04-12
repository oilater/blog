---
title: Dutch Flag 알고리즘
date: 2026-04-12
---


Dutch Flag라는 이름의 재밌는 알고리즘인데, 먼저  [여기](https://leetcode.com/problems/sort-colors/?envType=problem-list-v2&envId=rab78cw1) 서 문제를 풀어보자.

## Sort Colors

Given an array `nums` with `n` objects colored red, white, or blue, sort them **[in-place](https://en.wikipedia.org/wiki/In-place_algorithm)** so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers `0`, `1`, and `2` to represent the color red, white, and blue, respectively.
You must solve this problem without using the library's sort function.

**Example 1:**

- **Input:** nums = `[2,0,2,1,1,0]`
- **Output:** `[0,0,1,1,2,2]`

**Example 2:**

- **Input:** nums = `[2,0,1]`
- **Output:** `[0,1,2]`

**Constraints:**

- `n == nums.length`
- `1 <= n <= 300`

#### 문제 정리

라이브러리에서 제공하는 정렬을 쓰지 않고 `[2, 0, 2, 1, 1, 0]` 같은 배열을 0, 1, 2 순으로 정렬하는 문제다. for 문을 딱 한 번만 돌면서 정렬할 수 있을까?

#### 첫 풀이

답은 맞았지만 for문을 두 번 돌았다.

```ts
function sortColors(nums: number[]) {
  let zero = 0, one = 0, two = 0;

  for (const num of nums) {
    if (num === 0) zero++;
    if (num === 1) one++;
    if (num === 2) two++;
  }

  let i = 0;
  while (zero--) nums[i++] = 0;
  while (one--) nums[i++] = 1;
  while (two--) nums[i++] = 2;
};
```

## Dutch Flag 알고리즘이란?

네덜란드 국기 색과 같아서 붙여진 이름이라고 한다.

이 알고리즘은 low, mid, high라는 세 가지 변수를 활용한다. 이 때 이 세가지 변수는 투 포인터같이 하나의 점이라기보단 **구간의 경계점**로 생각해야 이해하기 편하다. 

- 0~low : 0이 배정되는 구간
- low~mid: 1이 배정되는 구간
- mid~high: 2가 배정되는 구간

mid라는 포인터는 0에서 시작해 for문을 돈다. 

`nums[mid]`의 값이 0이라면 `mid[low]`와 바꿔 low 인덱스의 값을 0으로 확정한다. 이제 low가 확정됐으니 `low++`로 한 칸 올려주고, mid도 다음 인덱스 탐색을 위해 한 칸 올린다. 따라서 low 이전에는 모두 0이 들어있다는 걸 확신할 수 있다.

`nums[mid]`의 값이 1이라면, 이미 mid 구간이므로 `mid++`만 해준다.

`nums[mid]`의 값이 2라면, `nums[high]`와 `nums[mid]`를 교환해준다. 하지만 이땐 high에서 온 값이 어떤 숫자인지 확신할 수 없다. 따라서 `mid++`를 하지 않고 한 번 더 검사해준다.

mid가 high보다 커진다면 이미 한 번 순회했으므로 정답을 리턴한다.

#### 정답 풀이

```ts
function sortColors(nums: number[]) {
  let low = 0, mid = 0, high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[mid], nums[low]] = [nums[low], nums[mid]];
      mid++; // mid는 항상 low와 같거나 더 크다.
      low++;
    } else if (nums[mid] === 1) {
      mid++; // swap할 필요 없음
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--; // high만 좁히고 while문 돌아서 mid 재 검사
    }
  }
};
```
