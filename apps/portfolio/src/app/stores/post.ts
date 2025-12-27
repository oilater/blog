import { atom } from 'jotai';
import { PostType } from '#velog/types';

type PostsMap = Map<string, PostType>;

const postsMapAtom = atom<PostsMap>(new Map());

export const postsStoreAtom = atom(
  (get) => Array.from(get(postsMapAtom).values()),

  (_, set, newPosts: PostType[]) => {
    const postsMap = new Map<string, PostType>();

    newPosts.forEach((post) => {
      postsMap.set(post.url_slug, post);
    });

    set(postsMapAtom, postsMap);
  },
);

export const getPostBySlug = atom((get) => (url_slug: string) => {
  const postsMap = get(postsMapAtom);
  return postsMap.get(decodeURIComponent(url_slug));
});

export const postsCountAtom = atom((get) => get(postsMapAtom).size);

export const isEmptyPostsAtom = atom(
  (get) => get(postsMapAtom).size === 0,
);

export const hasPostAtom = atom((get) => (url_slug: string) => {
  return get(postsMapAtom).has(url_slug);
});

export const findPostsByTag = atom((get) => (tag: string) => {
  const postsMap = get(postsMapAtom);
  return Array.from(postsMap.values()).filter((post) =>
    post.tags.includes(tag),
  );
});
