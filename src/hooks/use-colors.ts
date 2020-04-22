import { useState, useEffect } from "react";
import Vibrant from "node-vibrant";
import useAsyncEffect from "use-async-effect";

export type Colors = string[];

// export const defaultColors = ["#f2709c", "#ff9472"];
export const defaultColors = ["#4BC0C8", "#C779D0", "#FEAC5E"];

const useColors = (image?: string): Colors | null => {
  const [colors, setColors] = useState<Colors | null>(defaultColors);

  useAsyncEffect(async () => {
    if (image == null) {
      return;
    }

    const v = new Vibrant(image, {
      colorCount: 10,
    });

    const palette = await Vibrant.from(image).getPalette();

    if (palette != null) {
      const cs = [
        palette?.DarkMuted?.getHex(),
        palette?.DarkVibrant?.getHex(),
        palette?.LightVibrant?.getHex(),
        palette?.LightMuted?.getHex(),
      ].filter(Boolean) as Colors;

      setColors(cs);
    }
  }, [image]);

  useEffect(() => {}, [image]);

  return colors;
};

export default useColors;
