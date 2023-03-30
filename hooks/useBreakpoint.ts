import { useEffect, useMemo, useState } from "react";

const BREAKPOINTS = {
    1536: {
      items: 7,
    },
    1280: {
      items: 6,
    },
    1024: {
      items: 5,
    },
    768: {
      items: 4,
    },
    640: {
      items: 3,
    },
    0: {
      items: 3,
    },
  };

const useBreakpoint = (
  breakpoints: typeof BREAKPOINTS = BREAKPOINTS,
  element?: Element
) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(element ? element.clientWidth : window.innerWidth);

    const handleResize = () => {
      setWidth(element ? element.clientWidth : window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [element]);

  const breakpoint = useMemo(
    () =>
      Object.keys(breakpoints)
        .sort((a, b) => Number(b) - Number(a))
        .find((breakpoint) => width >= Number(breakpoint)),
    [breakpoints, width]
  );

  return breakpoints[Number(breakpoint) as keyof typeof breakpoints];
};

export default useBreakpoint;
