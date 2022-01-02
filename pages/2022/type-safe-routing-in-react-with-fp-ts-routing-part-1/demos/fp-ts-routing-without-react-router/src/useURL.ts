import * as React from "react";
import * as ReactHistory from "./ReactHistory";

export const useURL = () => {
  const [state, setState] = React.useState(() => new URL(window.location.href));
  const history = ReactHistory.useHistory();

  React.useEffect(() => {
    history.listen(() => {
      setState(new URL(window.location.href));
    });
  }, []);

  return state;
};
