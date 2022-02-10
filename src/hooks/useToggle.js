import { useState } from "react";

const useToggle = () => {
  const [value, setValue] = useState(false);
  const toggleVlaue = setValue(!value);

  return { value, toggleVlaue };
};

export default useToggle;
