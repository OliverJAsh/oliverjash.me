import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRouterDOM from "react-router-dom";

const paths = {
  Home: "/",
  Search: "/search/:query",
};

const Nav: React.FC = () => (
  <nav>
    <ul>
      <li>
        <ReactRouterDOM.Link to={paths.Home}>Home</ReactRouterDOM.Link>
      </li>
      <li>
        <ReactRouterDOM.Link
          to={ReactRouterDOM.generatePath(paths.Search, {
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

const Home: React.FC = () => (
  <div>
    <h1>Home</h1>
  </div>
);

const Search: React.FC = () => {
  // ❌ `query` has type `string | undefined` but it should have type `string`
  // because it must exist for this component to be rendered by its parent.
  const { query } = ReactRouterDOM.useParams();

  return (
    <div>
      <h1>Search</h1>
      <dl>
        <dt>Query</dt>
        <dd>{query}</dd>
      </dl>
    </div>
  );
};

const App = () => (
  <>
    <Nav />
    <hr />
    <ReactRouterDOM.Routes>
      <ReactRouterDOM.Route path={paths.Home} element={<Home />} />
      <ReactRouterDOM.Route path={paths.Search} element={<Search />} />
      <ReactRouterDOM.Route path="*" element={<div>Not found</div>} />
    </ReactRouterDOM.Routes>
  </>
);

ReactDOM.render(
  <ReactRouterDOM.BrowserRouter>
    <App />
  </ReactRouterDOM.BrowserRouter>,
  document.querySelector("#root")
);
