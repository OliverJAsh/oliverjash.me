import * as React from "react";
import * as History from "./History";

const Context: React.Context<History.History | null> =
  React.createContext<History.History | null>(null);

export const useHistory = (): History.History => {
  const value = React.useContext(Context);

  if (value === null) {
    throw new Error("Missing provider");
  } else {
    return value;
  }
};

export const Provider: React.FC = ({ children }) => {
  const history = History.create();

  return <Context.Provider value={history}>{children}</Context.Provider>;
};
