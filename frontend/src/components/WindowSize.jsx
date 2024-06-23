import { useEffect, useState } from "react";

const WindowSize = () => {
  const [WindowSize, setWindowSize] = useState({
    width: undefined,
    heigth: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return WindowSize;
};

export default WindowSize;
