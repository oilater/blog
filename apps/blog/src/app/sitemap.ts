import type { MetadataRoute } from 'next';

const BASE_URL = 'https://oilater.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [{ url: BASE_URL, lastModified: new Date() }];
}
