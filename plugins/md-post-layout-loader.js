const fm = require("gray-matter");

/**
 * Appends default export to Markdown/MDX file.
 *
 * Default export in MDX acts as a wrapper around the generated default export
 * for the MDX content. https://mdxjs.com/docs/using-mdx/#layout
 */
// https://github.com/reactjs/reactjs.org/blob/b41b1dc35679c01c3252e7d512ce28c5e100d0a4/beta/plugins/md-layout-loader.js#L18
module.exports = (src) => {
  const { content, data } = fm(src);

  const code =
    `
import { withPostLayout } from 'components/PostLayout';
export default withPostLayout(${JSON.stringify(data)})
` + content;

  return code;
};
