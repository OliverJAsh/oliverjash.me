import { flow, identity, pipe } from "fp-ts/function";
import * as RA from "fp-ts/ReadonlyArray";
import { globby } from "globby";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { DateComponent } from "../components/DateComponent";
import { Header } from "../components/Header";
import * as ExternalPost from "../types/ExternalPost";
import * as Post from "../types/Post";
import * as TaskEither from "../types/TaskEither";

type Props = {
  posts: ReadonlyArray<Post.Serialized>;
};

const globbyTaskFn = TaskEither.tryCatchK(globby, identity);

// https://github.com/reactjs/reactjs.org/blob/b41b1dc35679c01c3252e7d512ce28c5e100d0a4/beta/scripts/generateBlogIndex.js#L18
export const getStaticProps: GetStaticProps<Props> = () => {
  const postsEitherTask: TaskEither.TaskEither<
    unknown,
    ReadonlyArray<Post.T>
  > = pipe(
    Post.filenameGlob,
    globbyTaskFn,
    TaskEither.chainW(flow(RA.map(Post.fromFilename), TaskEither.sequenceArray))
  );

  return pipe(postsEitherTask, TaskEither.unsafeUnwrap, (postsPromise) =>
    postsPromise.then(
      flow(RA.sort(Post.dateOrdDesc), RA.map(Post.serialize), (posts) => ({
        props: {
          posts,
        },
      }))
    )
  );
};

const Home: NextPage<Props> = ({ posts }) => (
  <>
    <Head>
      <title>Oliver Joseph Ash</title>
    </Head>

    <Header />

    <main>
      <section>
        <h1>Posts</h1>
        <ul>
          {pipe(
            posts,
            RA.map(
              flow(Post.deserialize, (post) => (
                <li key={post.path}>
                  <DateComponent date={post.date} />{" "}
                  <Link href={post.path}>{post.title}</Link>
                </li>
              ))
            )
          )}
        </ul>
      </section>

      <section>
        <h1>Posts elsewhere on the internet</h1>
        <ul>
          {pipe(
            ExternalPost.all,
            RA.map((post) => (
              <li key={post.href}>
                <DateComponent date={post.date} />{" "}
                <a href={post.href}>{post.title}</a>
              </li>
            ))
          )}
        </ul>
      </section>
    </main>
  </>
);

export default Home;
