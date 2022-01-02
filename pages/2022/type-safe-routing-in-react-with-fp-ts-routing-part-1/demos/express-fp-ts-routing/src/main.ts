import * as Express from "express";
import * as P from "fp-ts-routing";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";

const app = Express();

const searchMatch = P.lit("search").then(P.str("query")).then(P.end);

const parseRoute = (path: string) => {
  const route = P.Route.parse(path);
  return P.parse(searchMatch.parser.map(O.some), route, O.none);
};

app.get("*", (req, res) => {
  pipe(
    req.originalUrl,
    parseRoute,
    O.fold(
      () => {
        res.status(404);
        res.send("Not found");
      },
      ({ query }) => {
        res.send(`Search query: ${query}`);
      }
    )
  );
});

app.listen(3000);
