const path = require("path");
const remarkShikiTwoslash = require("remark-shiki-twoslash");
const rehypeAutolinkHeadings = require("rehype-autolink-headings");
const rehypeSlug = require("rehype-slug");
const remarkPlugins = [
  [
    remarkShikiTwoslash.default,
    {
      alwayRaiseForTwoslashExceptions: true,
      // https://github.com/shikijs/twoslash/issues/131
      disableImplicitReactImport: true,
    },
  ],
];
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "page.mdx"],
  webpack: (config, { dev, isServer, ...options }) => {
    // Add our custom markdown loader in order to support frontmatter
    // and layout
    // https://github.com/vercel/next.js/blob/88a5f263f11cb55907f0d89a4cd53647ee8e96ac/packages/next-mdx/index.js#L6
    // https://github.com/reactjs/reactjs.org/blob/b41b1dc35679c01c3252e7d512ce28c5e100d0a4/beta/next.config.js#L46
    config.module.rules.push({
      test: /.mdx$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          options: {
            remarkPlugins,
            rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
          },
        },
        path.join(__dirname, "./plugins/md-post-layout-loader"),
      ],
    });

    // https://github.com/vercel/next.js/issues/7755
    if (!isServer) {
      config.resolve.fallback.fs = false;

      // TODO:
      // Tree-shaking should be able to figure out this isn't used on the client 🤷
      config.resolve.alias["gray-matter"] = false;
    }

    return config;
  },
};
