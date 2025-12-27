import type { MetadataRoute } from 'next';

const BASE_URL = 'https://oilater.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/feed`, lastModified: new Date() },
    { url: `${BASE_URL}/about`, lastModified: new Date() },
  ];
}
