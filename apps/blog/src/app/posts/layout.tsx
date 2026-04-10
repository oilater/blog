import { getAllPosts, getAllTags } from '#/lib/posts';
import { PostListSidebar } from './components/PostListSidebar';
import { SidebarToast } from './components/SidebarToast';
import * as styles from './posts.css';

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  const allPosts = getAllPosts();
  const allTags = getAllTags();

  return (
    <div className={styles.splitLayout}>
      <PostListSidebar
        posts={allPosts}
        tags={allTags}
        terminalPosts={allPosts.map((p) => ({ title: p.title, slug: p.slug }))}
      />
      <div id="content-panel" className={styles.contentPanel}>{children}</div>
      <SidebarToast />
    </div>
  );
}
