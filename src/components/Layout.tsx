/** @jsx jsx */
import * as React from "react";
import { Box, jsx } from "theme-ui";
import Footer from "./Footer";
import Header from "./Header";
import SEO from "./SEO";

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
          }}
        >
          {!props.noHeader && <Header />}
          {props.children}
        </Box>

        {/* <Footer /> */}
      </Box>
    </>
  );
};

export default Layout;
