import { LoadingValue } from "./types";
import { Colors } from "./hooks/use-colors";

export const pluralize = (s: string, n: number): string =>
  n === 1 ? s : `${s}s`;

export const loadingValue = <T>(): LoadingValue<T> => ({
  loading: true,
  error: null,
  data: null,
});

export const errorValue = <T>(error: string): LoadingValue<T> => ({
  loading: false,
  error,
  data: null,
});

export const dataValue = <T>(data: T): LoadingValue<T> => ({
  loading: false,
  error: null,
  data,
});

export const createGradient = (colors: Colors): string =>
  `linear-gradient(to bottom right, ${colors.join(",")})`;

export const gradientCss = (colors: Colors) => ({
  backgroundImage: colors != null ? createGradient(colors) : "transparent",
  backgroundSize: "250% 250%",
  animation: "grad 40s ease infinite",
  backgroundPosition: "50% 50%",

  "@keyframes grad": {
    "0%": { backgroundPosition: "42% 0%" },
    "50%": { backgroundPosition: "59% 100%" },
    "100%": { backgroundPosition: "42% 0%" },
  },
});
