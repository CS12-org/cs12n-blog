import type { NextConfig } from "next";

interface RuleWithTest {
  test?: RegExp;
  issuer?: any;
  resourceQuery?: any;
}

const nextConfig: NextConfig = {
  images: {
    domains: ["cms.cs12.ir"], // اضافه کردن hostname CMS
  },

  webpack(config) {
    const rules = config.module.rules;
    const fileLoaderRule = rules.find((rule: RuleWithTest) =>
      rule.test?.test?.(".svg")
    );

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
          resourceQuery: { not: [...(fileLoaderRule.resourceQuery?.not || []), /url/] },
          use: ["@svgr/webpack"],
        }
      );

      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },

  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "https://cms.cs12.ir/api/:path*",
      },
      {
        source: "/uploads/:path*",
        destination: "https://cms.cs12.ir/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
