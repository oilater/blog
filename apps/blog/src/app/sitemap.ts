import type { MetadataRoute } from 'next';
import { BlogConfig } from '#/constants/config';
import { getAllPosts, getAllTags } from '#/lib/posts';

const BASE_URL = BlogConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().filter((post) => post.tag);
  const latest = posts[0] ? new Date(posts[0].date) : new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: latest },
    { url: `${BASE_URL}/about` },
    { url: `${BASE_URL}/contents/fiva` },
  ];

  const tagPages: MetadataRoute.Sitemap = getAllTags().map((tag) => ({
    url: `${BASE_URL}/posts/${encodeURIComponent(tag)}`,
  }));

  const postPages: MetadataRoute.Sitemap = posts.map((post) => {
    const path = post.slug.split('/').map(encodeURIComponent).join('/');
    return {
      url: `${BASE_URL}/posts/${path}`,
      lastModified: new Date(post.date),
    };
  });

  return [...staticPages, ...tagPages, ...postPages];
}
