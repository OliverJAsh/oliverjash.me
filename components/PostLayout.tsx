import { Header } from "components/Header";
import Head from "next/head";
import * as React from "react";

type Meta = {
  title: string;
};

// https://github.com/reactjs/reactjs.org/blob/b41b1dc35679c01c3252e7d512ce28c5e100d0a4/beta/src/components/Layout/LayoutPost.tsx#L52
const PostLayout: React.FC<{ meta: Meta }> = ({ meta, children }) => (
  <>
    <Head>
      <title>{meta.title}</title>
    </Head>

    <Header />

    <main>
      {/* TODO: markdown here too for title */}
      <h1>{meta.title}</h1>
      {children}
    </main>
  </>
);

export const withPostLayout = (meta: Meta) => {
  const PostLayoutWrapper = ({ children }: { children: React.ReactNode }) => (
    <PostLayout meta={meta}>{children}</PostLayout>
  );

  return PostLayoutWrapper;
};
