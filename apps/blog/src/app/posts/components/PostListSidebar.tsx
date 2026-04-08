'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { formatDate } from '#/lib/date';
import type { PostMetadata } from '#/lib/posts';
import { extractTagFromPath, isRootPostsPath } from '#/lib/sidebar';
import { useKeyboardNav } from '#/lib/useKeyboardNav';
import * as styles from '../neovim-sidebar.css';
import { Terminal, type TerminalHandle } from './Terminal';

interface Props {
  posts: PostMetadata[];
  tags: string[];
  terminalPosts: { title: string; slug: string }[];
}

export function PostListSidebar({ posts, tags, terminalPosts }: Props) {
  const [mounted, setMounted] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<TerminalHandle>(null);
  const router = useRouter();
  const pathname = usePathname();

  const { zone, activeTag, selectedIndex, filteredPosts, setActiveTag, selectTag, selectPost, enterTags } =
    useKeyboardNav({
      posts,
      tags,
      pathname,
      onNavigate: (url) => router.push(url),
      onFocusTerminal: () => terminalRef.current?.focus(),
    });

  useEffect(function mount() {
    setMounted(true);
  }, []);

  useEffect(function syncTagFromUrl() {
    const tag = extractTagFromPath(pathname, tags);
    if (tag !== null) {
      setActiveTag(tag);
    } else if (isRootPostsPath(pathname)) {
      setActiveTag(null);
    }
  }, [pathname, tags]);

  useEffect(function scrollSelectedIntoView() {
    listRef.current?.children[selectedIndex]?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  const tagsFocused = mounted && zone === 'tags';

  return (
    <aside className={styles.sidebar}>
      <Terminal ref={terminalRef} tags={tags} posts={terminalPosts} onExitDown={enterTags} />
      <div className={`${styles.tagFilter} ${tagsFocused ? styles.tagFilterFocused : ''}`}>
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
            className={`${styles.fileItem} ${mounted && zone === 'list' && index === selectedIndex ? styles.fileItemActive : ''}`}
            onClick={() => selectPost(index)}
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
          <span className={styles.hintKey}>h/l</span> tag
        </span>
        <span>
          <span className={styles.hintKey}>Enter</span> open
        </span>
      </div>
    </aside>
  );
}
