import { flow, identity, pipe } from "fp-ts/function";
import * as RA from "fp-ts/ReadonlyArray";
import { globby } from "globby";
import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { DateComponent } from "../components/DateComponent";
import { Header } from "../components/Header";
import * as ExternalPost from "../types/ExternalPost";
import * as Post from "../types/Post";
import * as TaskEither from "../types/TaskEither";

type PostProps = { serialized: Post.Serialized; titleHtml: string };

const markdownToHtml = TaskEither.tryCatchK(
  unified().use(remarkParse).use(remarkHtml).process,
  identity
);

// TODO: use AST transformation
const markdownTitleToMarkdownHtml = (
  titleMarkdown: string
): TaskEither.TaskEither<unknown, string> =>
  pipe(
    titleMarkdown,
    markdownToHtml,
    TaskEither.map((vFile) =>
      vFile.toString().replace(new RegExp("^<p>(.*)</p>\n$"), "$1")
    )
  );

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

type ExternalPostProps = {
  serialized: ExternalPost.Serialized;
  titleHtml: string;
};

const getExternalPostProps = (
  post: ExternalPost.T
): TaskEither.TaskEither<unknown, ExternalPostProps> =>
  pipe(
    post.title,
    markdownTitleToMarkdownHtml,
    TaskEither.map(
      (titleHtml): ExternalPostProps => ({
        serialized: pipe(post, ExternalPost.serialize),
        titleHtml,
      })
    )
  );

type Props = {
  posts: ReadonlyArray<PostProps>;
  externalPosts: ReadonlyArray<ExternalPostProps>;
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
    ExternalPost.all,
    RA.sort(ExternalPost.dateOrdDesc),
    RA.map(getExternalPostProps),
    TaskEither.sequenceArray
  );

  return pipe(
    TaskEither.Do,
    TaskEither.bind("posts", () => postPropsTask),
    TaskEither.bind("externalPosts", () => externalPostPropsTask),
    TaskEither.map(
      ({ posts, externalPosts }): GetStaticPropsResult<Props> => ({
        props: {
          posts,
          externalPosts,
        },
      })
    ),
    TaskEither.unsafeUnwrap
  );
};

const Home: NextPage<Props> = ({ posts, externalPosts }) => (
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
        <h1>Posts elsewhere on the internet</h1>
        <ul>
          {pipe(
            externalPosts,
            RA.map(({ serialized, titleHtml }) => {
              const post = ExternalPost.deserialize(serialized);
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
