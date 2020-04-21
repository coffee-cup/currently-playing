import { useSpotify } from "../providers/spotify";

const useBoxShadow = (): string => {
  const { colors } = useSpotify();
  const opacity = "a1";
  const shadow = "#0000004a 2px 2px 30px";
  // const shadow =
  //   colors == null
  //     ? "#0000004a 2px 2px 30px"
  //     : `19px 19px 70px ${colors[2]}${opacity}, -19px -19px 70px ${colors[1]}${opacity}`;

  return shadow;
};

export default useBoxShadow;
