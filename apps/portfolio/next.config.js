import withBundleAnalyzerPkg from '@next/bundle-analyzer';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withBundleAnalyzer = withBundleAnalyzerPkg({
  enabled: process.env.ANALYZE === 'true',
});

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/velog/graphql',
        destination: 'https://v2.velog.io/graphql',
      },
    ];
  },
};

export default withBundleAnalyzer(withVanillaExtract(nextConfig));
