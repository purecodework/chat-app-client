import { useEffect, useState } from "react";

// export isMobile, boolean: current on mobile screen or not
const useScreenWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  const isMobile = width <= 768;
  return { isMobile };
};

export default useScreenWidth;
