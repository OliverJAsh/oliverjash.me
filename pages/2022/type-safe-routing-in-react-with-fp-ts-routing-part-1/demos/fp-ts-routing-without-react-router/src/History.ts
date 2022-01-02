type Listener = () => void;

export type History = {
  listen: (listener: Listener) => void;
  pushState: typeof window.history.pushState;
};

export const create = (): History => {
  const listeners: Array<Listener> = [];

  const listen: History["listen"] = (listener) => {
    listeners.push(listener);
  };

  const notify = () => {
    listeners.forEach((fn) => fn());
  };

  window.addEventListener("popstate", () => {
    notify();
  });

  const pushState: History["pushState"] = (...args) => {
    window.history.pushState(...args);

    notify();
  };

  return { listen, pushState };
};
