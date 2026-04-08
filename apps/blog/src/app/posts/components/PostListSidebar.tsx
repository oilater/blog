'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { formatDate } from '#/lib/date';
import type { PostMetadata } from '#/lib/posts';
import { extractTagFromPath, filterByTag, findPostIndex, isRootPostsPath, moveIndex, postUrl } from '#/lib/sidebar';
import { useDebounce } from '#/lib/useDebounce';
import { useSessionStorage } from '#/lib/useSessionStorage';
import * as styles from '../neovim-sidebar.css';
import { Terminal } from './Terminal';

interface Props {
  posts: PostMetadata[];
  tags: string[];
  terminalPosts: { title: string; slug: string }[];
}

const KEY_DELTA: Record<string, number> = {
  j: 1,
  ArrowDown: 1,
  k: -1,
  ArrowUp: -1,
};

function isTyping(e: KeyboardEvent): boolean {
  const tag = (e.target as HTMLElement).tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA';
}

export function PostListSidebar({ posts, tags, terminalPosts }: Props) {
  const [activeTag, setActiveTag] = useSessionStorage<string | null>('sidebar-tag', null);
  const [selectedIndex, setSelectedIndex] = useSessionStorage<number>('sidebar-index', 0);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const listRef = useRef<HTMLDivElement>(null);

  const filteredPosts = filterByTag(posts, activeTag);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const tag = extractTagFromPath(pathname, tags);
    if (tag !== null) setActiveTag(tag);
    else if (isRootPostsPath(pathname)) setActiveTag(null);
  }, [pathname, tags]);

  useEffect(() => {
    const idx = findPostIndex(filteredPosts, pathname);
    if (idx >= 0) setSelectedIndex(idx);
  }, [pathname, filteredPosts]);

  const navigate = (index: number) => {
    const url = postUrl(filteredPosts, index);
    if (url) router.push(url);
  };

  const debouncedNavigate = useDebounce(navigate, 200);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTyping(e)) return;

      const delta = KEY_DELTA[e.key];
      if (delta !== undefined) {
        e.preventDefault();
        const next = moveIndex(selectedIndex, delta, filteredPosts.length - 1);
        setSelectedIndex(next);
        debouncedNavigate(next);
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        navigate(selectedIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, filteredPosts]);

  useEffect(() => {
    listRef.current?.children[selectedIndex]?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  const selectTag = (tag: string | null) => {
    setActiveTag(tag);
    setSelectedIndex(0);
  };

  return (
    <aside className={styles.sidebar}>
      <Terminal tags={tags} posts={terminalPosts} />
      <div className={styles.tagFilter}>
        <button
          className={mounted && !activeTag ? styles.tagActive : styles.tagInactive}
          onClick={() => selectTag(null)}
        >
          All
        </button>
        {tags.map((t) => (
          <button
            key={t}
            className={mounted && activeTag === t ? styles.tagActive : styles.tagInactive}
            onClick={() => selectTag(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className={styles.fileList} ref={listRef}>
        {filteredPosts.map((post, index) => (
          <div
            key={post.slug}
            className={`${styles.fileItem} ${mounted && index === selectedIndex ? styles.fileItemActive : ''}`}
            onClick={() => {
              setSelectedIndex(index);
              navigate(index);
            }}
          >
            <div className={styles.fileItemRow}>
              {post.tag && <span className={styles.tag}>#{post.tag}</span>}
              <span className={styles.title}>{post.title}</span>
            </div>
            <time className={styles.date}>{formatDate(post.date)}</time>
          </div>
        ))}
      </div>
      <div className={styles.statusBar}>
        <span className={styles.mode}>NORMAL</span>
        <span className={styles.info}>
          {selectedIndex + 1}/{filteredPosts.length}
        </span>
      </div>
      <div className={styles.hints}>
        <span>
          <span className={styles.hintKey}>j/k</span> navigate
        </span>
        <span>
          <span className={styles.hintKey}>Enter</span> open
        </span>
      </div>
    </aside>
  );
}
