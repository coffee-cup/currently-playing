/** @jsx jsx */
import * as React from "react";
import { Box, jsx } from "theme-ui";
import SEO from "./SEO";
import { gradientCss } from "../utils";
import { defaultColors } from "../hooks/use-colors";

export interface Props {
  title?: string;
  description?: string;
  noHeader?: boolean;
}

const Layout: React.FC<Props> = props => {
  return (
    <>
      <SEO title={props.title} description={props.description} />

      <Box
        sx={{
          my: 0,
          px: 0,
          py: 0,
        }}
      >
        <Box
          className="main"
          sx={{
            minHeight: "100vh",
            ...gradientCss(defaultColors),
          }}
        >
          {props.children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;
