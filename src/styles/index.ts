import { system } from "@theme-ui/presets";
import { Theme } from "theme-ui";
import { SystemStyleObject } from "@styled-system/css";

const heading = {
  fontFamily: "heading",
  lineHeight: "heading",
  fontWeight: "heading",
};

const font = [
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Oxygen-Sans",
  "Ubuntu",
  "Cantarell",
  "Helvetica Neue",
  "sans-serif",
  "Apple Color Emoji",
  "Segoe UI Emoji",
  "Segoe UI Symbol",
].join(",");

const baseLink: SystemStyleObject = {
  color: "text",
  textDecoration: "underline",
  transition: "all 150ms ease-in-out",
  cursor: "pointer",

  "&:hover,&:focus,&:active": {
    color: "text",
    bg: "primary",
  },
};

const baseInput: SystemStyleObject = {
  borderRadius: 0,
  borderWidth: 2,

  "&:focus": {
    borderColor: "accent",
    outline: "none",
  },

  "&.error": {
    borderColor: "error",
  },
};

const baseButton: SystemStyleObject = {
  color: "secondary",
  bg: "primary",
  cursor: "pointer",
  py: 1,
  borderRadius: 0,
  transition: "all 150ms ease-in-out",

  "&:hover,&:focus,&:active": {
    bg: "primary",
  },
};

const theme: Theme = {
  ...system,
  colors: {
    text: "white",
    background: "deeppink",
    primary: "#D90368",
    secondary: "white",
    accent: "#fbba72",
    muted: "#eff0f6",
    highlight: "green",
    grey: {
      200: "#dfdfdf",
      400: "#cecece",
      500: "#a2a2a2",
      600: "#737373",
      700: "#666565",
    },
    spotify: "#1db954",
    error: "red",
    success: "green",
  },

  breakpoints: ["40em", "52em", "64em"],

  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },

  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],

  fonts: {
    body: font,
    heading: font,
    monospace: "Consolas, Liberation Mono, Menlo, Courier, monospace",
  },

  fontSizes: [12, 14, 16, 18, 24, 32, 48, 64, 96],

  sizes: {
    container: "1400px",
    logList: "400px",
    measure: "32em",
    narrow: "22em",
    header: "6rem",
  },

  lineHeights: {
    body: 1.6,
    heading: 1.125,
  },

  buttons: {
    primary: baseButton,
    secondary: {
      ...baseButton,
      color: "text",
      bg: "background",

      "&:hover": {
        boxShadow: "none",
      },
    },
    icon: {
      cursor: "pointer",
    },
    subtle: {
      ...baseButton,
      py: 0,
      color: "text",
      bg: "muted",
      border: "none",

      "&:hover,&:focus,&:active": {
        boxShadow: "none",
        bg: "accent",
      },
    },
  },

  links: {
    button: {
      ...baseButton,
      px: 3,
      textDecoration: "none",
      display: "inline-block",
    },
    header: {
      ...baseLink,
      textDecoration: "none",
      px: 3,
      py: 2,
    },
    nav: {
      ...baseLink,
      px: 2,
      py: 1,
      fontSize: 2,
      textDecoration: "none",
    },
    footer: {
      ...baseLink,
      px: 2,
      py: 1,
      fontSize: 2,
      textDecoration: "none",
      textTransform: "lowercase",
    },
    empty: {
      ...baseLink,
      textDecoration: "none",
    },
  },

  forms: {
    input: baseInput,
    logInput: {
      ...baseInput,
    },
    slider: {
      color: "primary",
    },
    textarea: {
      borderRadius: 0,
      borderColor: "grey.600",
      resize: "vertical",
      maxHeight: "200px",
      fontSize: 2,
      fontFamily: "body",

      "&:focus": {
        outline: "none",
        borderColor: "accent",
      },
    },
  },

  text: {
    heading,
    display: {
      variant: "textStyles.heading",
      fontSize: [5, 6],
      fontWeight: "heading",
      letterSpacing: "-0.03em",
      mt: 3,
    },
  },

  styles: {
    ...system.styles,
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",

      /* Better Font Rendering */
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },
    h1: {
      variant: "textStyles.display",
      fontSize: 6,
    },
    h2: {
      variant: "textStyles.heading",
      fontSize: 5,
    },
    h3: {
      variant: "textStyles.heading",
      fontSize: 4,
      mb: 3,
    },
    h4: {
      variant: "textStyles.heading",
      fontSize: 3,
    },
    h5: {
      variant: "textStyles.heading",
      fontSize: 2,
    },
    h6: {
      variant: "textStyles.heading",
      fontSize: 1,
    },
    a: baseLink,
    p: {
      code: {
        color: "text",
        p: "2px",
        borderRadius: "4px",
      },
    },
    pre: {
      fontFamily: "monospace",
      fontSize: 1,
      p: 3,
      color: "text",
      bg: "muted",
      overflow: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      backgroundColor: "muted",
      p: 2,
      borderRadius: "4px",
      fontSize: 2,
    },
    blockquote: {
      mt: 0,
      mx: 0,
      py: 0,
      pr: 0,
      pl: 3,
      borderLeft: "solid 4px hsla(0,0%,0%,0.13)",
      color: "hsla(0,0%,0%,0.53)",
    },
    ul: {
      pl: 0,
    },
    li: {
      pb: 1,
    },
  },
};

export default theme;
