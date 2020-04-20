/** @jsx jsx */
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { Text, Box, jsx, Spinner } from "theme-ui";
import Layout from "../components/Layout";
import { useSpotify } from "../providers/spotify";
import { LoadingCenter } from "../components/Loading";
import LoginWithSpotify from "../components/LoginWithSpotify";

const Auth = () => {
  const router = useRouter();
  const code = router.query.code as string;

  const [error, setError] = useState<string | null>(null);
  const { getAndSaveToken } = useSpotify();

  useEffect(() => {
    if (code != null) {
      (async () => {
        const success = await getAndSaveToken(code);
        if (success) {
          router.replace("/");
        } else {
          setError("Error authenticating with Spotify");
        }
      })();
    }
  }, [code]);

  return (
    <Layout noHeader>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          py: 4,
          minHeight: "100vh",
        }}
      >
        {error == null && <LoadingCenter />}
        {error != null && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Box>
              <Text sx={{ fontSize: 4, pb: 3 }}>{error}</Text>
              <LoginWithSpotify />
            </Box>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default Auth;
