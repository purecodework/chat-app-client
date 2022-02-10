import { useRef, useEffect } from "react";

// scroll to bottom in overflow
const ScrollProvider = () => {
  const node = useRef();
  useEffect(() => node.current.scrollIntoView());
  return <div ref={node} />;
};
export default ScrollProvider;
