/** @jsx jsx */
import { Moon, Sun } from "react-feather";
import { Button, Flex, jsx, NavLink, Spinner, useColorMode } from "theme-ui";
import Link from "./Link";

const ThemeSwitcher: React.FC = () => {
  const [colorMode, setColorMode] = useColorMode();

  const size = 18;

  return (
    <Button
      aria-label="theme switcher"
      onClick={() => setColorMode(colorMode === "default" ? "dark" : "default")}
      sx={{
        display: "flex",
        alignItems: "center",
        color: "text",
        bg: "transparent",
        border: "none",
        px: 2,
        py: 1,

        "&:hover,&:focus,&:active": {
          color: "text",
          bg: "primary",
        },
      }}
    >
      {colorMode === "default" ? <Moon size={size} /> : <Sun size={size} />}
    </Button>
  );
};

const Nav: React.FC = () => {
  return (
    <Flex as="nav">
      <ThemeSwitcher />
    </Flex>
  );
};

export default Nav;
