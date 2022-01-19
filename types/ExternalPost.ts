import * as Date from "fp-ts/Date";
import { pipe } from "fp-ts/function";
import * as Ord from "fp-ts/Ord";
type ExternalPost = {
  title: string;
  href: string;
  date: Date;
};

export const dateOrdAsc = Ord.contramap((post: ExternalPost) => post.date)(
  Date.Ord
);
export const dateOrdDesc = pipe(dateOrdAsc, Ord.reverse);

export const all: ReadonlyArray<ExternalPost> = [
  {
    title: "Calling React Hooks Conditionally/Dynamically Using Render Props",
    href: "https://unsplash.com/blog/calling-react-hooks-conditionally-dynamically-using-render-props/",
    date: new globalThis.Date(2020, 6, 17),
  },
  {
    title:
      "React Redux: performance considerations when dispatching multiple actions",
    // https://unsplash.com/blog/react-redux-performance-considerations-when-dispatching-multiple-actions/
    href: "https://medium.com/unsplash/react-redux-performance-considerations-when-dispatching-multiple-actions-5162047bf8a6",
    date: new globalThis.Date(2020, 0, 27),
  },
  {
    title: "Named namespace imports",
    // https://unsplash.com/blog/named-namespace-imports/
    href: "https://medium.com/unsplash/named-namespace-imports-7345212bbffb",
    date: new globalThis.Date(2019, 7, 20),
  },
  {
    title: "Manipulating URL strings with `url-transformers`",
    // https://unsplash.com/blog/manipulating-url-strings-with-url-transformers/
    href: "https://medium.com/unsplash/manipulating-url-strings-with-url-transformers-3401392c2e39",
    date: new globalThis.Date(2018, 10, 30),
  },
  {
    title: "Building the Unsplash Uploader",
    // https://unsplash.com/blog/building-the-unsplash-uploader/
    href: "https://medium.com/unsplash/building-the-unsplash-uploader-880a5ba0d442",
    date: new globalThis.Date(2018, 11, 22),
  },
  {
    title: "Strongly-typed finite-state machines with Redux and TypeScript",
    // https://unsplash.com/blog/strongly-typed-finite-state-machines-with-redux-and-typescript/
    href: "https://medium.com/unsplash/strongly-typed-finite-state-machines-with-redux-and-typescript-3aac2b0332f5",
    date: new globalThis.Date(2018, 8, 10),
  },
  {
    title: "How we test responsive images at Unsplash",
    // https://unsplash.com/blog/how-we-test-responsive-images-at-unsplash/
    href: "https://medium.com/unsplash/how-we-test-responsive-images-at-unsplash-4fb940caee72",
    date: new globalThis.Date(2018, 5, 8),
  },
  {
    title: "How we gradually migrated to TypeScript at Unsplash",
    // https://unsplash.com/blog/how-we-gradually-migrated-to-typescript-at-unsplash/
    href: "https://medium.com/unsplash/how-we-gradually-migrated-to-typescript-at-unsplash-7a34caa24ef1",
    date: new globalThis.Date(2018, 2, 14),
  },
  {
    title: "Avoiding CSS overrides in responsive components",
    href: "https://gist.github.com/OliverJAsh/1ebecee004e1bbc816e0b65086c7abee",
    date: new globalThis.Date(2017, 11, 8),
  }, // { title: 'Introducing the new Guardian Developers Site', href: 'https://www.theguardian.com/info/developer-blog/2014/jul/22/introducing-the-new-guardian-developers-site', date: new globalThis.Date(2014, 6, 22) },
  {
    title: "express-fp: an Express wrapper for type safe request handlers",
    href: "https://medium.com/hackernoon/express-fp-an-express-wrapper-for-type-safe-request-handlers-f8c411cc4a7b",
    date: new globalThis.Date(2017, 10, 12),
  }, // { title: 'Inside the Guardian’s CMS: meet Scribe, an extensible rich text editor', href: 'https://www.theguardian.com/info/developer-blog/2014/mar/20/inside-the-guardians-cms-meet-scribe-an-extensible-rich-text-editor', date: new globalThis.Date(2014, 2, 20) }
  {
    title: "Building an offline page for theguardian.com",
    href: "https://www.theguardian.com/info/developer-blog/2015/nov/04/building-an-offline-page-for-theguardiancom",
    date: new globalThis.Date(2015, 10, 4),
  },
];
