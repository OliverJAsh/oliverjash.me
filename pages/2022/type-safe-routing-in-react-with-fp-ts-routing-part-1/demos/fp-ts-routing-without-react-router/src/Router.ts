import * as P from "fp-ts-routing";
import * as O from "fp-ts/Option";
import * as Route from "./Route";
import * as RouteUnion from "./RouteUnion";

// Equivalent to `/` in `path-to-regexp`.
export const homeMatch: P.Match<Route.Home> = P.end;

// Equivalent to `/search/:query` in `path-to-regexp`.
export const searchMatch: P.Match<Route.Search> = P.lit("search")
  .then(P.str("query"))
  .then(P.end);

const router: P.Parser<RouteUnion.RouteUnion> = P.zero<RouteUnion.RouteUnion>()
  .alt(homeMatch.parser.map(RouteUnion.Home))
  .alt(searchMatch.parser.map(RouteUnion.Search));

export const parseRoute = (path: string): O.Option<RouteUnion.RouteUnion> => {
  const route = P.Route.parse(path);
  return P.parse(router.map(O.some), route, O.none);
};
