import { useState, useEffect } from "react";
import Vibrant from "node-vibrant";

export type Colors = string[];

export const defaultColors = ["#f2709c", "#ff9472"];

const useColors = (image?: string): Colors | null => {
  const [colors, setColors] = useState<Colors | null>(defaultColors);

  useEffect(() => {
    if (image == null) {
      return;
    }

    Vibrant.from(image)
      .getPalette()
      .then(palette => {
        if (palette != null) {
          const cs = [
            palette?.DarkMuted?.getHex(),
            palette?.DarkVibrant?.getHex(),
            palette?.LightVibrant?.getHex(),
            palette?.LightMuted?.getHex(),
          ].filter(Boolean) as Colors;

          setColors(cs);
        }
      });
  }, [image]);

  return colors;
};

export default useColors;
