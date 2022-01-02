import { pipe } from "fp-ts/function";
import fm from "gray-matter";

type MatterData = {
  title: string;
  date: Date;
};
export type T = MatterData;

export const fromFile = (file: Buffer): MatterData =>
  pipe(file.toString(), fm, (matter) => matter.data as MatterData);
