import * as P from "fp-ts-routing";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Link } from "./Link";
import * as ReactHistory from "./ReactHistory";
import * as Route from "./Route";
import * as Router from "./Router";
import * as RouteUnion from "./RouteUnion";
import * as URL from "./URL";
import { useURL } from "./useURL";

const useRoute = () => {
  const url = useURL();
  const path = URL.toPath(url);
  const routeOption = Router.parseRoute(path);
  return routeOption;
};

const Nav: React.FC = () => (
  <nav>
    <ul>
      <li>
        <Link href={P.format(Router.homeMatch.formatter, {})}>Home</Link>
      </li>
      <li>
        <Link
          href={P.format(Router.searchMatch.formatter, {
            query: "dogs and cats",
          })}
        >
          Search
        </Link>
      </li>
      <li>
        <Link href="/abcdef">Invalid link (to test "not found")</Link>
      </li>
    </ul>
  </nav>
);

const Home: React.FC<Route.Home> = () => (
  <div>
    <h1>Home</h1>
  </div>
);

const Search: React.FC<Route.Search> = ({ query }) => (
  <div>
    <h1>Search</h1>
    <dl>
      <dt>Query</dt>
      <dd>{query}</dd>
    </dl>
  </div>
);

const RouteComponent: React.FC<{ route: RouteUnion.RouteUnion }> = ({
  route,
}) => {
  switch (route._tag) {
    case "Home":
      return <Home />;
    case "Search":
      return <Search {...route} />;
  }
};

const App: React.FC = () => {
  const routeOption = useRoute();
  return (
    <>
      <Nav />
      <hr />
      {pipe(
        routeOption,
        O.fold(
          () => <div>Not found</div>,
          (route) => <RouteComponent route={route} />
        )
      )}
    </>
  );
};

ReactDOM.render(
  <ReactHistory.Provider>
    <App />
  </ReactHistory.Provider>,
  document.querySelector("#root")
);
