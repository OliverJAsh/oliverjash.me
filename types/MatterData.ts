import { pipe } from "fp-ts/function";
import fm from "gray-matter";

type MatterData = {
  title: string;
  date: Date;
};
export type T = MatterData;

type WithContent = {
  data: MatterData;
  content: string;
};

export const fromStringWithContent = (s: string): WithContent =>
  pipe(
    s,
    fm,
    (matter): WithContent => ({
      data: matter.data as MatterData,
      content: matter.content,
    })
  );

export const fromFile = (file: Buffer): MatterData =>
  pipe(file.toString(), fromStringWithContent, (t) => t.data);
