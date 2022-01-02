import * as A from "fp-ts/Array";
import { flow, pipe } from "fp-ts/function";
import * as TaskEither from "fp-ts/TaskEither";
import * as fs from "fs";
import * as Nullish from "types/Nullish";
import * as O from "types/Option";
import * as MatterData from "./MatterData";

const filenameRegExp = new RegExp("^pages/(.+)/index.page.mdx$");
const createPathFromFilename = (filename: string): string =>
  pipe(
    filename.match(filenameRegExp),
    Nullish.getOrThrow,
    A.lookup(1),
    O.unsafeUnwrap,
    (path) => `/${path}`
  );

type Post = {
  path: string;
  title: string;
  date: Date;
};

export type T = Post;

export const fromFilenameAndMatterData = ({
  filename,
  matterData,
}: {
  filename: string;
  matterData: MatterData.T;
}): Post => ({
  path: createPathFromFilename(filename),
  // TODO: title is also markdown, because of `pre` aka `
  title: matterData.title,
  date: matterData.date,
});

export const fromFilename = (
  filename: string
): TaskEither.TaskEither<NodeJS.ErrnoException, Post> => {
  const readFileTaskFn = TaskEither.taskify(fs.readFile);
  return pipe(
    filename,
    readFileTaskFn,
    TaskEither.map(
      flow(MatterData.fromFile, (matterData) =>
        fromFilenameAndMatterData({ filename, matterData })
      )
    )
  );
};

export type Serialized = {
  path: string;
  title: string;
  date: string;
};

export const serialize = (post: Post): Serialized => ({
  path: post.path,
  title: post.title,
  date: post.date.toISOString(),
});

export const deserialize = (post: Serialized): Post => ({
  path: post.path,
  title: post.title,
  date: new Date(post.date),
});
