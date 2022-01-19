import { pipe } from "fp-ts/function";
import fm from "gray-matter";

type MatterData = {
  title: string;
  date: Date;
};
export type T = MatterData;

export const fromString = (s: string): MatterData =>
  pipe(s, fm, (matter) => matter.data as MatterData);

export const fromFile = (file: Buffer): MatterData =>
  pipe(file.toString(), fromString);
