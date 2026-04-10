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
          환영합니다 👋
          <br />
          재미 삼아 터미널 UI를 붙여보다가, Neovim에서 아이디어를 얻어 블로그를 개편해봤어요.
        </p>

        <h5 style={{ marginTop: '3rem' }}>어떻게 둘러보나요?</h5>
        <ul>
          <li>
            <strong>↑↓</strong>로 이동하며 글을 미리 볼 수 있어요.
          </li>
          <li>
            <strong>←→</strong>로 카테고리 탭을 이동할 수 있어요.
          </li>
          <li>
            터미널, 탭, 글 목록을 커서로 자유롭게 넘나들 수 있어요.
          </li>
          <li>
            <strong>터미널</strong> 명령어로도 탐색할 수 있어요. <code>help</code>를 입력해보세요.
          </li>
          <li>
            글을 볼 땐 <strong>Cmd + /</strong>로 사이드바를 숨겨보세요! (Windows: Ctrl + /)
          </li>
          <li>
            <strong>Enter</strong>를 누르면 글 읽기 모드로 진입해요. <strong>↑↓</strong>로 스크롤하고, <strong>←</strong>를 누르면 다시 목록으로 돌아와요.
          </li>
        </ul>
      </article>
    </div>
  );
}

export default function PostsPage() {
  const allTags = getAllTags();
  const allPosts = getAllPosts();

  return (
    <>
      <div className={styles.desktopOnly}>
        <Welcome />
      </div>
      <div className={styles.mobileOnly}>
        <TagFilter tags={allTags} />
        <PostsList posts={allPosts} />
      </div>
    </>
  );
}
