import { useEffect, useState } from "react";

export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  const updateWidthScreen = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidthScreen);
    return () => {
      window.removeEventListener("resize", updateWidthScreen);
    };
  }, []);

  return screenWidth;
};
