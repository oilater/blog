import './markdown.css';
import { getAllPosts, getAllTags } from '#/lib/posts';
import { PostsList } from './components/PostsList';
import { TagFilter } from './components/TagFilter';
import * as styles from './posts.css';

function Welcome() {
  return (
    <div className="markdown-container">
      <header className="markdown-header" style={{ borderBottom: 'none' }}>
        <h1 className="markdown-title">
          <span style={{ color: '#a6e3a1', fontWeight: 900, fontSize: '1.2em' }}>Shvim</span> Less clicking, more reading
        </h1>
      </header>
      <article className="markdown-body">
        <p>
          블로그에 재미 삼아 터미널 UI를 붙여본 걸 시작으로, Neovim에서 아이디어를 얻어 블로그를 개편해봤어요.
          <br />
          매번 클릭해서 글을 열어보는 것보다, 키보드 커서 이동으로 미리 볼 수 있으면 편하지 않을까요 🤗
        </p>

        <h5 style={{ marginTop: '4rem' }}>어떻게 둘러보나요?</h5>
        <ul>
          <li>
            키보드 <strong>방향키</strong> 또는 <strong>j / k</strong>로 포스트를 미리 볼 수 있어요.
          </li>
          <li>
            사이드바 상단의 <strong>터미널</strong>에서 <code>cd</code>, <code>ls</code> 명령으로도 탐색할 수 있어요. <code>help</code>를 입력해보세요.
          </li>
          <li>
            사이드바의 태그로 원하는 카테고리만 필터링할 수 있어요.
          </li>
        </ul>

        <h5 style={{ marginTop: '3.5rem' }}>진짜 터미널인가요?</h5>
        <p>
          물론 가짜에요. <code>cd</code>는 Next.js 라우팅으로, <code>ls</code>는 목록 출력으로 연결할 뿐 실제 쉘이 실행되지는 않아요.
        </p>

        <h5 style={{ marginTop: '3.5rem' }}>커서를 이동할 때마다 글이 렌더링되면 성능에 안 좋지 않나요?</h5>
        <p>
          네트워크 요청을 줄이기 위해 leading debounce를 적용했어요. 첫 키 입력에는 즉시 반응하고, 빠르게 연타하면 중간 요청은 건너뛰고 멈춘 후에만 마지막 위치의 페이지를 불러와요.
          마크다운 파싱부터 MDX 컴포넌트 적용은 모두
          <strong> SSG</strong>로 빌드 타임에 처리해요.
          커서를 이동할 때 서버에서 다시 렌더링하지 않고, 이미 완성된 HTML 파일을 가져오기 때문에 런타임 비용이 적다고 생각했어요.
        </p>
      </article>
    </div>
  );
}

export default function PostsPage() {
  const allTags = getAllTags();
  const allPosts = getAllPosts();

  return (
    <>
      <Welcome />
      <div className={styles.mobileOnly}>
        <TagFilter tags={allTags} />
        <PostsList posts={allPosts} />
      </div>
    </>
  );
}
