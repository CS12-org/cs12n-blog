import type { NextConfig } from 'next';

interface RuleWithTest {
  test?: RegExp;
  issuer?: unknown;
  resourceQuery?: unknown;
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.cs12.ir',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cs12-mino-api-cs12.kubarcloud.net',
        pathname: '/**',
      },
    ],
  },

  webpack(config) {
    const rules = config.module.rules;
    const fileLoaderRule = rules.find((rule: RuleWithTest) => rule.test?.test?.('.svg'));

    if (fileLoaderRule) {
      config.module.rules.push(
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/,
        },
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: {
            not: [...(fileLoaderRule.resourceQuery?.not || []), /url/],
          },
          use: ['@svgr/webpack'],
        },
      );

      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },

  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  rewrites: async () => {
    return [
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*',
      },
      {
        source: '/api/:path*',
        destination: 'https://cs12-back-cs12.kubarcloud.net/api/:path*',
      },
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:1337/uploads/:path*',
      },
    ];
  },
};

export default nextConfig;
