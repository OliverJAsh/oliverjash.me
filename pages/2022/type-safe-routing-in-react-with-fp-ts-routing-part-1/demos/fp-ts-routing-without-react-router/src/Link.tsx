import * as React from "react";
import { useHistory } from "./ReactHistory";

const isModifiedEvent = (event: React.MouseEvent) =>
  event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;

/**
 * Handles the click behavior for router `<Link>` components. This is useful if
 * you need to create custom `<Link>` components with the same click behavior we
 * use in our exported `<Link>`.
 */
export const useLinkClickHandler = <E extends Element = HTMLAnchorElement>(
  href: string,
  {
    target,
  }: {
    target?: React.HTMLAttributeAnchorTarget | undefined;
  } = {}
): ((event: React.MouseEvent<E, MouseEvent>) => void) => {
  const history = useHistory();

  return React.useCallback(
    (event: React.MouseEvent<E, MouseEvent>) => {
      if (
        event.button === 0 && // Ignore everything but left clicks
        (target === undefined || target === "_self") && // Let browser handle "target=_blank" etc.
        !isModifiedEvent(event) // Ignore clicks with modifier keys
      ) {
        event.preventDefault();

        history.pushState(null, "", href);
      }
    },
    [href, target]
  );
};

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ onClick, target, href, ...rest }, ref) => {
    const internalOnClick = useLinkClickHandler(href, { target });
    const handleClick = (
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
      if (onClick !== undefined) onClick(event);
      if (event.defaultPrevented === false) {
        internalOnClick(event);
      }
    };

    return (
      <a
        {...rest}
        href={href}
        onClick={handleClick}
        ref={ref}
        target={target}
      />
    );
  }
);
Link.displayName = "Link";
