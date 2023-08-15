import { flow, identity, pipe } from "fp-ts/function";
import * as RA from "fp-ts/ReadonlyArray";
import { globby } from "globby";
import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { DateComponent } from "../components/DateComponent";
import { Header } from "../components/Header";
import { markdownTitleToMarkdownHtml } from "../helpers/markdownTitleToMarkdownHtml";
import * as External from "../types/External";
import * as Post from "../types/Post";
import * as TaskEither from "../types/TaskEither";

type PostProps = { serialized: Post.Serialized; titleHtml: string };

// TODO: also apply to post page
const getPostProps = (
  post: Post.T
): TaskEither.TaskEither<unknown, PostProps> =>
  pipe(
    post.title,
    markdownTitleToMarkdownHtml,
    TaskEither.map(
      (titleHtml): PostProps => ({
        serialized: pipe(post, Post.serialize),
        titleHtml,
      })
    )
  );

type ExternalProps = {
  serialized: External.Serialized;
  titleHtml: string;
};

const getExternalProps = (
  x: External.T
): TaskEither.TaskEither<unknown, ExternalProps> =>
  pipe(
    x.title,
    markdownTitleToMarkdownHtml,
    TaskEither.map(
      (titleHtml): ExternalProps => ({
        serialized: pipe(x, External.serialize),
        titleHtml,
      })
    )
  );

type Props = {
  posts: ReadonlyArray<PostProps>;
  externalPosts: ReadonlyArray<ExternalProps>;
  presentations: ReadonlyArray<ExternalProps>;
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

  const postPropsTask = pipe(
    postsEitherTask,
    TaskEither.chain(
      flow(
        RA.sort(Post.dateOrdDesc),
        RA.map(getPostProps),
        TaskEither.sequenceArray
      )
    )
  );

  const externalPostPropsTask = pipe(
    External.posts,
    RA.sort(External.dateOrdDesc),
    RA.map(getExternalProps),
    TaskEither.sequenceArray
  );

  const presentationsPropsTask = pipe(
    External.presentations,
    RA.sort(External.dateOrdDesc),
    RA.map(getExternalProps),
    TaskEither.sequenceArray
  );

  return pipe(
    TaskEither.Do,
    TaskEither.bind("posts", () => postPropsTask),
    TaskEither.bind("externalPosts", () => externalPostPropsTask),
    TaskEither.bind("presentations", () => presentationsPropsTask),
    TaskEither.map(
      ({ posts, externalPosts, presentations }): GetStaticPropsResult<Props> => ({
        props: {
          posts,
          externalPosts,
          presentations,
        },
      })
    ),
    TaskEither.unsafeUnwrap
  );
};

const Home: NextPage<Props> = ({ posts, externalPosts, presentations }) => (
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
            RA.map(({ serialized, titleHtml }) => {
              const post = Post.deserialize(serialized);
              return (
                <li key={post.path}>
                  <DateComponent date={post.date} />{" "}
                  <Link href={post.path}>
                    <a dangerouslySetInnerHTML={{ __html: titleHtml }} />
                  </Link>
                </li>
              );
            })
          )}
        </ul>
      </section>

      <section>
        <h1>Presentations</h1>
        <ul>
          {pipe(
            presentations,
            RA.map(({ serialized, titleHtml }) => {
              const post = External.deserialize(serialized);
              return (
                <li key={post.href}>
                  <DateComponent date={post.date} />{" "}
                  <Link href={post.href}>
                    <a dangerouslySetInnerHTML={{ __html: titleHtml }} />
                  </Link>
                </li>
              );
            })
          )}
        </ul>
      </section>

      <section>
        <h1>Posts elsewhere on the internet</h1>
        <ul>
          {pipe(
            externalPosts,
            RA.map(({ serialized, titleHtml }) => {
              const post = External.deserialize(serialized);
              return (
                <li key={post.href}>
                  <DateComponent date={post.date} />{" "}
                  <Link href={post.href}>
                    <a dangerouslySetInnerHTML={{ __html: titleHtml }} />
                  </Link>
                </li>
              );
            })
          )}
        </ul>
      </section>
    </main>
  </>
);

export default Home;
