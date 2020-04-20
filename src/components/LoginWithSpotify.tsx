/** @jsx jsx */
import * as React from "react";
import { Button, jsx } from "theme-ui";
import { useSpotify } from "../providers/spotify";

const LoginWithSpotify: React.FC = () => {
  const { login } = useSpotify();

  return (
    <Button sx={{ bg: "spotify" }} onClick={() => login()}>
      Login with Spotify
    </Button>
  );
};

export default LoginWithSpotify;
