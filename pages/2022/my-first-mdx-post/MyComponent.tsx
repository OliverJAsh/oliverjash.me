import * as React from "react";

export const MyComponent = () => {
  const [counter, setCounter] = React.useState(0);
  const onClick = React.useCallback(() => {
    setCounter((n) => n + 1);
  }, []);
  return <button onClick={onClick}>{counter}</button>;
};
