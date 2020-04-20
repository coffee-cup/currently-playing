/** @jsx jsx */
import { Box, jsx, Text } from "theme-ui";
import Link from "./Link";

const Footer = () => (
  <Box
    as="footer"
    sx={{
      pt: [5, 6],
      pb: 4,
      textAlign: ["center", "left"],
    }}
  >
    <Box
      sx={{
        display: ["flex"],
        flexDirection: ["column-reverse", "row"],
        alignItems: "center",
        justifyContent: "space-between",
        pt: 2,
      }}
    >
      <Text sx={{ fontSize: [1, 2] }}>
        Created with <span sx={{ color: "crimson" }}>&hearts;</span> by{" "}
        <Link href="https://jakerunzer.com">jake runzer</Link>
      </Text>

      {/* <Links /> */}
    </Box>
  </Box>
);

export default Footer;
