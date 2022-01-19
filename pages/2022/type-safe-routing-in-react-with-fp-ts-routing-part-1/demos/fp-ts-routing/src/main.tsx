import * as P from "fp-ts-routing";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import * as History from "history";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRouterDOM from "react-router-dom";
import * as Route from "./Route";
import * as Router from "./Router";
import * as RouteUnion from "./RouteUnion";

const Nav: React.FC = () => (
  <nav>
    <ul>
      <li>
        <ReactRouterDOM.Link to={P.format(Router.homeMatch.formatter, {})}>
          Home
        </ReactRouterDOM.Link>
      </li>
      <li>
        <ReactRouterDOM.Link
          to={P.format(Router.searchMatch.formatter, {
            query: "dogs and cats",
          })}
        >
          Search
        </ReactRouterDOM.Link>
      </li>
      <li>
        <ReactRouterDOM.Link to="/abcdef">
          Invalid link (to test "not found")
        </ReactRouterDOM.Link>
      </li>
    </ul>
  </nav>
);

const useRoute = () => {
  const { pathname, search } = ReactRouterDOM.useLocation();
  const path = History.createPath({ pathname, search });
  const routeOption = Router.parseRoute(path);
  return routeOption;
};

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
  <ReactRouterDOM.BrowserRouter>
    <App />
  </ReactRouterDOM.BrowserRouter>,
  document.querySelector("#root")
);
