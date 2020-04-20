/** @jsx jsx */
import * as React from "react";
import { Box, Flex, jsx } from "theme-ui";
import Link from "./Link";

const Header: React.FC<{ home?: string }> = props => (
  <Flex
    sx={{
      py: [2, 3],
      px: [3, 4],
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <Box sx={{ fontSize: 4, fontWeight: "bold", fontFamily: "heading" }}>
      <Link href={props.home || "/"} variant="header">
        •
      </Link>
    </Box>
  </Flex>
);

export default Header;
