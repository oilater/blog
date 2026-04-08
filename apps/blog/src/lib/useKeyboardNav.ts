'use client';

import { useEffect, useRef, useState } from 'react';
import type { PostMetadata } from './posts';
import { filterByTag, moveIndex, postUrl, findPostIndex } from './sidebar';
import { useDebounce } from './useDebounce';
import { useSessionStorage } from './useSessionStorage';

export type Zone = 'terminal' | 'tags' | 'list';

interface Options {
  posts: PostMetadata[];
  tags: string[];
  pathname: string;
  onNavigate: (url: string) => void;
  onFocusTerminal: () => void;
  onSyncTag?: (pathname: string, tags: string[]) => string | null;
}

const VERTICAL: Record<string, number> = {
  j: 1,
  ArrowDown: 1,
  k: -1,
  ArrowUp: -1,
};

const HORIZONTAL: Record<string, number> = {
  h: -1,
  ArrowLeft: -1,
  l: 1,
  ArrowRight: 1,
};

function isTyping(e: KeyboardEvent): boolean {
  const tag = (e.target as HTMLElement).tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA';
}

export function useKeyboardNav({ posts, tags, pathname, onNavigate, onFocusTerminal }: Options) {
  const [activeTag, setActiveTag] = useSessionStorage<string | null>('sidebar-tag', null);
  const [selectedIndex, setSelectedIndex] = useSessionStorage<number>('sidebar-index', 0);
  const [zone, setZone] = useState<Zone>('terminal');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const prevPathRef = useRef(pathname);
  const savedByTagRef = useRef<Record<string, string>>({});

  const filteredPosts = filterByTag(posts, activeTag);
  const allTags: (string | null)[] = [null, ...tags];

  const navigate = (index: number, targetPosts = filteredPosts) => {
    const url = postUrl(targetPosts, index);
    if (url) {
      onNavigate(url);
    }
  };

  const debouncedNavigate = useDebounce(navigate, 200);

  useEffect(function syncCursorFromUrl() {
    if (prevPathRef.current === pathname) {
      return;
    }
    prevPathRef.current = pathname;
    const idx = findPostIndex(filteredPosts, pathname);
    if (idx >= 0) {
      setSelectedIndex(idx);
    }
  }, [pathname, filteredPosts]);

  const shiftTag = (delta: number) => {
    const currentPost = filteredPosts[selectedIndex];
    if (currentPost) {
      savedByTagRef.current[activeTag ?? '__all__'] = currentPost.slug;
    }

    const currentIdx = allTags.indexOf(activeTag);
    const nextIdx = Math.max(0, Math.min(currentIdx + delta, allTags.length - 1));
    const nextTag = allTags[nextIdx] ?? null;
    setActiveTag(nextTag);

    const nextPosts = filterByTag(posts, nextTag);
    const savedSlug = savedByTagRef.current[nextTag ?? '__all__'];

    if (savedSlug) {
      const restoredIdx = nextPosts.findIndex((p) => p.slug === savedSlug);
      setSelectedIndex(restoredIdx >= 0 ? restoredIdx : 0);
    } else {
      setSelectedIndex(0);
    }
  };

  const enterTags = () => {
    setZone('tags');
  };

  useEffect(function focusOnSidebarOpen() {
    if (sidebarVisible) {
      onFocusTerminal();
    }
  }, [sidebarVisible]);

  useEffect(function bindKeyboardEvents() {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        setSidebarVisible((v) => !v);
        return;
      }

      if (isTyping(e)) {
        return;
      }

      if (!sidebarVisible) {
        return;
      }

      const hDelta = HORIZONTAL[e.key];
      const vDelta = VERTICAL[e.key];

      if (zone === 'tags') {
        if (hDelta !== undefined) {
          e.preventDefault();
          shiftTag(hDelta);
          return;
        }
        if (vDelta !== undefined) {
          e.preventDefault();
          if (vDelta < 0) {
            setZone('terminal');
            onFocusTerminal();
          } else {
            setZone('list');
            setSelectedIndex(0);
            debouncedNavigate(0);
          }
          return;
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          setZone('list');
          debouncedNavigate(0);
        }
        return;
      }

      if (hDelta !== undefined) {
        e.preventDefault();
        setZone('tags');
        shiftTag(hDelta);
        return;
      }

      if (vDelta !== undefined) {
        e.preventDefault();
        if (vDelta < 0 && selectedIndex === 0) {
          setZone('tags');
          return;
        }
        setZone('list');
        const next = moveIndex(selectedIndex, vDelta, filteredPosts.length - 1);
        setSelectedIndex(next);
        debouncedNavigate(next);
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        navigate(selectedIndex);
        return;
      }

      if (e.key === ' ') {
        e.preventDefault();
        window.scrollBy({ top: e.shiftKey ? -200 : 200, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, filteredPosts, activeTag, zone, sidebarVisible]);

  return {
    zone,
    sidebarVisible,
    activeTag,
    selectedIndex,
    filteredPosts,
    setActiveTag,
    selectTag: (tag: string | null) => {
      setActiveTag(tag);
      setSelectedIndex(0);
    },
    selectPost: (index: number) => {
      setZone('list');
      setSelectedIndex(index);
      navigate(index);
    },
    enterTags,
  };
}
