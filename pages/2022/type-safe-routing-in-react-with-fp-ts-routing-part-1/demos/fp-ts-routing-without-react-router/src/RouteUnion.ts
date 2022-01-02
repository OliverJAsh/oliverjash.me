import * as Route from "./Route";

export type RouteUnion =
  | ({ _tag: "Home" } & Route.Home)
  | ({ _tag: "Search" } & Route.Search);

export const Home = (): RouteUnion => ({ _tag: "Home" });

export const Search = (value: Route.Search): RouteUnion => ({
  _tag: "Search",
  ...value,
});
