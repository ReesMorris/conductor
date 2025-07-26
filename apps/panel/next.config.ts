import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ['@t3-oss/env-nextjs', '@t3-oss/env-core'],
  images: {
    localPatterns: [
      {
        pathname: '/images/**',
        search: ''
      }
    ]
  }
};

export default withNextIntl(nextConfig);
