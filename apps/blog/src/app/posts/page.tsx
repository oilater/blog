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
          A keyboard-driven blog, inspired by Neovim.
        </p>

        <h5 style={{ marginTop: '3rem' }}>어떻게 둘러보나요?</h5>
        <ul>
          <li>글 탐색 <strong>↑↓</strong> — 포스트를 미리 볼 수 있어요.</li>
          <li>탭 이동 <strong>←→</strong> — 카테고리를 전환할 수 있어요.</li>
          <li>읽기 모드 <strong>Enter</strong> — 글을 스크롤하며 읽을 수 있어요. <strong>←</strong>로 목록으로 돌아와요.</li>
          <li>사이드바 숨기기 <strong>Cmd+/</strong> — 글에 집중할 수 있어요. (Windows: Ctrl+/)</li>
          <li>터미널에 <code>cd</code>, <code>ls</code> 등 명령어를 입력할 수 있어요. <code>help</code>를 입력해보세요.</li>
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
