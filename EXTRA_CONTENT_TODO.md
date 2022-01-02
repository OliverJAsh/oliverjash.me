# Internal

- https://oliverjash.me/2017/04/10/why-use-a-maybe-type-in-javascript
- https://oliverjash.me/2016/05/12/pitfalls-of-the-img-element-for-serving-responsive-images
- https://oliverjash.me/2016/04/01/reactive-programming-in-javascript-modelling-values-which-change-over-time-using-observables
- https://oliverjash.me/2016/03/26/morph-animation-between-positions-using-flip

# Internal old

- https://oliverjash.me/2012/09/07/methods-for-modifying-objects-in-oocss
- https://oliverjash.me/2012/11/23/css-exceptions-object-modifiers-or-extensions
- https://oliverjash.me/2014/03/13/hybrid-creatives
- https://www.theguardian.com/info/developer-blog/2014/mar/20/inside-the-guardians-cms-meet-scribe-an-extensible-rich-text-editor
- https://www.theguardian.com/info/developer-blog/2014/jul/22/introducing-the-new-guardian-developers-site
- https://oliverjash.me/2014/11/20/comment-your-css-relationships
- https://oliverjash.me/2015/12/28/when-will-the-browser-cache-be-used
- https://oliverjash.me/2016/01/16/an-anxious-young-software-developer
- https://oliverjash.me/2016/06/12/page-jumping-caused-by-images
- https://oliverjash.me/2016/12/28/gutters-for-flexible-components-with-sliced-padding
- https://oliverjash.me/2017/01/17/vertical-select-menu-with-writing-modes
- https://oliverjash.me/2017/03/15/discoverable-library-gzip-sizes

# Talks and projects

```ts
const projects: Array<Project> = [
  // https://github.com/OliverJAsh/shallow-equal-explain
  // https://github.com/unsplash/ts-imgix
  {
    title:
      "Chrome DevTools extension that displays the parent element which the selected element is positioned relative to.",
    href: "https://chrome.google.com/webstore/detail/positioned-relative-to/bigmiclpclbpcaeijdllhofcohnekllp",
  },
  {
    title:
      "Chrome extension to instantly pause the page when DevTools is open using a keyboard shortcut",
    href: "https://twitter.com/OliverJAsh/status/1466069027227324418",
  },
  {
    title: "Scribe, a web rich text editor, built for the Guardian's CMS",
    href: "https://github.com/guardian/scribe",
  },
  {
    title: "Sbscribe, a social news and feed reader. ",
    href: "https://vimeo.com/69376016",
  },
  {
    title: "The Guardian’s offline page",
    href: "https://www.theguardian.com/info/developer-blog/2015/nov/04/building-an-offline-page-for-theguardiancom",
  },
  {
    title: "Chrome extension for editing URL query parameters, written in Elm",
    href: "https://github.com/OliverJAsh/query-params-chrome",
  },
  {
    title:
      "Chrome extension for easily viewing and switching A/B tests on theguardian.com, written in Cycle.js",
    href: "https://github.com/OliverJAsh/guardian-ab-tests-chrome",
  },
  // {
  //   title:
  //     "A dashboard to easily view deploys of theguardian.com, written in TypeScript",
  //   href: "https://github.com/guardian/frontend/pull/11356",
  // },
  // {
  //   title: "The Guardian’s developer site",
  //   href: "http://developers.theguardian.com/",
  // },
];

const talks: Array<Talk> = [
  {
    title: "Building an offline page for theguardian.com",
    href: "https://www.youtube.com/watch?v=hx1fqAXXViA",
    description:
      "Native apps have long had tools to give users good experiences when they have poor internet connectivity or none at all. With service workers, the web is catching up. This talk demonstrates how I built the Guardian’s offline page.",
  },
  {
    title: "Building a CMS for the responsive web",
    href: "https://www.youtube.com/watch?v=31EpyxcmBeU",
    description:
      "In light of responsive web design, people often focus heavily on how content should be rendered, but how it is produced is usually overlooked. This talk reviews how the challenges of responsive web design can bleed into issues of content production, and how the Guardian solves these issues with Composer – our web-based, digital content-management system.",
  },
];
```
