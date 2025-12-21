import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import withBundleAnalyzerPkg from '@next/bundle-analyzer';

const withBundleAnalyzer = withBundleAnalyzerPkg({
  enabled: process.env.ANALYZE === 'true',
});

const withVanillaExtract = createVanillaExtractPlugin({
  experimental: {
    turbo: false,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default withBundleAnalyzer(withVanillaExtract(nextConfig));
