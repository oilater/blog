---
title: MDX에서 LCP 이미지 관리하기
date: 2026-01-27
---

블로그를 만들면서 고민했던 것 중 하나가 **LCP 이미지**와 **늦게 로드해도 되는 이미지**를 분리해서 관리하는 것이었다. 

## 📝 문제 상황

`next-mdx-remote` MDX 라이브러리를 쓰면 보통 이렇게 태그 별로 마크다운을 스타일링한다.

```tsx
export const components: MDXComponents = {
  ul: (props) => <ul className="markdown-ul" {...props} />,
  ol: (props) => <ol className="markdown-ol" {...props} />,
  li: (props) => <li className="markdown-li" {...props} />,
  img: (props: ImageProps) => <Image {...props} />, // next/Image, 세부 설정 생략
  // ...
}
```

**여기서 설정한 값은 모든 요소에 일괄 적용**된다. 그래서 이미지를 별도로는 제어하기는 어렵다. 

만약 여기에 `priority`를 적용하면 모든 이미지의 로드 시점이 앞당겨져서 대역폭 경쟁이 일어나고, 그렇다고 안 주자니 화면에 보이는 첫 이미지의 로딩이 늦어져서 흰 이미지를 봐야 하는 문제가 생겼다.

## 🔥 개선 목표

그래서 아래 내용을 신경 쓰면서 개선해보기로 했다.

1. Viewport에 보이는 LCP 이미지는 빠르게 로드한다. 단, Viewport 밖 이미지들은 그대로 둔다.
	- 어떻게 분리할 것인가 ,,
2. 사용자가 화질이 안좋다고 느끼지 않을 정도로 사이즈와 화질을 낮춘다.
3. 상대적으로 느린 모바일 환경에서도 Good 점수를 받도록 개선한다.

## 🔧 측정 환경

실제 사용자 환경과 최대한 비슷한 환경을 만들기 위해 아래와 같이 설정했다.

- CPU - 4x 감속
- 네트워크 - Slow 4G
- 시크릿 탭 (초반엔 그냥 했다)
- 기기 - 모바일로 설정

## ✏️ 측정하기: Performance Tab

>첫 측정 결과 LCP가 3.08초가 나왔다.

가장 먼저 보이는 문제는 역시나 **이미지 로드 시점**이었다. HTTP/2는 멀티플렉싱을 지원하기 때문에 한번에 여러 개의 리소스를 요청할 수 있다. 하지만 이미지의 로드 우선순위는 기본적으로 낮다. 브라우저에게 별 다른 힌트를 제공하지 않으니 이미지의 로드 시점이 CSS와 JS보다 훨씬 늦는 걸 볼 수 있다.

![첫 LCP 측정](/posts/2026-01-27/first-lcp.png)


## 🏞️ LCP 이미지 분리하기

### IntersectionObserver?

가장 먼저 든 생각은 *'IntersectionObserver로 뷰포트에 이미지가 있는지 감지해야 하나?'* 였다. 하지만 이러면 페이지 자체를 클라이언트 컴포넌트로 바꿔야 하기 때문에 LCP가 오히려 느려진다. 브라우저가 자바스크립트를 다운로드 할 때까지 이미지 다운로드가 지연되기 때문이다.

### 이미지 alt 속성 이용하기

클로드랑 대화하다가 아이디어를 얻었다. 

```tsx
![스터디 카페](/posts/2026-01-20/study-cafe.jpg)
```

md 파일에서는 이미지를 이렇게 보여준다. `[스터디 카페]` 는 이미지의 `alt` 속성인데, alt 태그에 `[lcp]`를 붙인 뒤 이미지 컴포넌트에서 alt를 파싱해 조건부로 처리하면 되겠구나 싶었다.

```tsx
// alt 태그 파싱 함수
function parseAlt(alt: string) {
  const isLCP = alt.includes('[lcp]')
  const altText = alt.replace('[lcp]', '').trim()
  
  return { isLCP, alt: altText }
}
```

### priority 설정하기

next/Image에서 `priority`를 설정하면 `loading='eager'`이 적용되고 `<head>`에  `<link rel="preload">`가 들어간다. 이렇게만 적용한 뒤 네트워크 탭의 priority를 보니 `'낮음 -> 높음'` 되어 있어서 `fetchPriority`를 명시적으로 high로 설정해서 `'높음'`으로 만들어줬다.

```tsx showLineNumbers {6, 12, 15, 16}
export function MdxImage(props: ImageProps) {
  if (!props.src) return null;
  const width = Number(props.width) || IMG_DEFAULT_WIDTH;
  const height = Number(props.height) || IMG_DEFAULT_HEIGHT;
  
  const { isLCP, alt } = parseAlt(props.alt);
  
  return (
	<span className="markdown-img-wrapper">
	  <Image className="markdown-img"
	    src={props.src}
		alt={alt}
		width={width}
		height={height}
		priority={isLCP}
		fetchPriority={isLCP ? 'high' : 'auto'} // 기본 값: auto
		// 다른 설정들
	  />
	</span>
  );
}
```

다시 측정해보니 3.08s -> 2.60s로 LCP가 400ms 가량 단축되었고, Network 섹션의 그래프를 보면 이미지의 로드 시점이 앞당겨진 것을 볼 수 있다. 그런데 여전히 2.5초를 초과해 **Needs Improvement** 상태였다.

![두번째 LCP 측정](/posts/2026-01-27/need-improve-lcp.png)

### Next는 모든 최적화를 해주지 않는다

하단의 **Improve image delivery** 경고에 나오듯, 이미지 크기가 불필요하게 큰 게 문제였다. 이미지 사이즈가 큰 것도 있었지만 애초에 이미지 파일 자체가 수백 KB로 큰 걸 보고 아차 싶었다.

next/Image를 쓰면 jpg 파일을 넣어도 지원하는 브라우저 환경에 맞게 자동으로 avif, webp가 다운로드된다.  이것만 생각하고 당시에 그냥 폰에서 옮긴 뒤 바로 public에 넣어버린 게 문제였다. 결국, 보내는 이미지 자체의 크기를 줄여야 한다. 그래서 https://squoosh.app/ 에서 낮은 사이즈의 이미지로 변환했다.

![세 번째 LCP 측정](/posts/2026-01-27/good-lcp.png)

이제 2.60s -> 1.89s로 800ms 정도 줄어서 Good 상태가 되었다. 


## blur-up 효과 적용하기

하지만 이렇게 LCP를 정상 범위로 만들어도 유저는 짧게나마 흰 화면을 본다. 그래서 `placeholder="blur"`를 적용해줬다. 뿌연 이미지가 나왔다가 원래 이미지로 돌아오는 효과인데, 난 이런 효과들을 좋아한다. 사용자 경험에도 좋지만 신기해서 새로고침 해보게 된다,,ㅋ

먼저 로컬 이미지를 읽어서 작은 크기의 Base64 문자열로 변환하는 방법이다. 네트워크 요청이 아예 없다. sharp라는 라이브러리를 통해 편하게 blur 이미지를 생성할 수 있다.

```tsx
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

export async function getBlurDataURL(imagePath: string) {
  const path = path.join(process.cwd(), 'public', imagePath);
  const buffer = await fs.readFile(path);
  const blurBuffer = await sharp(buffer).resize(20).blur(1).toFormat('jpeg', { quality: 20 }).toBuffer();

  return `data:image/jpeg;base64,${blurBuffer.toString('base64')}`;
}
```

일단 이 정도로 설정했는데 조금 더 자연스럽게 해보고 싶다.

아래와 같이 Image의 `placeholder`와 `blurDataURL`을 설정해준다.

```tsx
// 컴포넌트 내 예시
const blurDataURL = getBlurDataURL('/images/일본여행.webp');

return (
  <Image
    placeholder="blur"
    blurDataURL={blurDataURL}
  />
);
```

이런 식으로 해놓으면 실제 이미지가 뜨기 전엔 화질이 조금 낮은 blur 이미지를 먼저 보여주고, 이미지가 로드되면 교체된다. 흰 화면을 보여주는 것보다 사용자 경험을 좋게 만든다.

