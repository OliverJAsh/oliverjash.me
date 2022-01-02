import { pipe } from "fp-ts/function";
import * as Nullish from "types/Nullish";

const dateToISODateString = (date: Date) =>
  pipe(date.toISOString().split("T")[0], Nullish.getOrThrow);

export const DateComponent: React.FC<{ date: Date }> = ({ date }) => (
  <time dateTime={date.toISOString()}>{dateToISODateString(date)}</time>
);
