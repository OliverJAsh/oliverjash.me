import { identity, pipe } from "fp-ts/function";
import * as RA from "fp-ts/ReadonlyArray";
import * as Refinement from "fp-ts/Refinement";
import * as mdast from "mdast";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import { Plugin, unified } from "unified";
import * as O from "../types/Option";
import * as TaskEither from "../types/TaskEither";

const checkIsParagraph = Refinement.fromOptionK((node: mdast.Content) =>
  node.type === "paragraph" ? O.some(node) : O.none
);

const unwrapParagraph = (tree: mdast.Root): mdast.Root => {
  const paragraph = pipe(
    tree.children,
    RA.head,
    O.unsafeUnwrap,
    O.fromPredicate(checkIsParagraph),
    O.unsafeUnwrap
  );
  return {
    type: "root",
    children: paragraph.children,
  };
};

const markdownToHtml = ({
  plugins,
}: {
  plugins: Array<Plugin<[], mdast.Root>>;
}) =>
  TaskEither.tryCatchK(
    unified().use(remarkParse).use(plugins).use(remarkHtml).process,
    identity
  );

export const markdownTitleToMarkdownHtml = (
  titleMarkdown: string
): TaskEither.TaskEither<unknown, string> =>
  pipe(
    titleMarkdown,
    markdownToHtml({ plugins: [() => unwrapParagraph] }),
    TaskEither.map((vFile) => vFile.toString())
  );
