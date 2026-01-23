import withBundleAnalyzerPkg from '@next/bundle-analyzer';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withBundleAnalyzer = withBundleAnalyzerPkg({
  enabled: process.env.ANALYZE === 'true',
});

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {},
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [480, 640, 680, 750, 828, 1080, 1200],
    qualities: [75, 80],
  },
};

export default withBundleAnalyzer(withVanillaExtract(nextConfig));
