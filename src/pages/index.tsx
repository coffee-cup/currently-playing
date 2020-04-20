/** @jsx jsx */
import Vibrant from "node-vibrant";
import { useEffect, useState } from "react";
import { Box, Flex, jsx, Text } from "theme-ui";
import Layout from "../components/Layout";
import { LoadingCenter } from "../components/Loading";
import LoginWithSpotify from "../components/LoginWithSpotify";
import { useSpotify } from "../providers/spotify";
import { Track } from "../types";
import Link from "../components/Link";

const useColors = (image?: string): { c1: string; c2: string } | null => {
  const [colors, setColors] = useState<{ c1: string; c2: string } | null>(null);

  useEffect(() => {
    if (image == null) {
      return;
    }

    Vibrant.from(image)
      .getPalette()
      .then(palette => {
        if (
          palette != null &&
          palette.DarkVibrant != null &&
          palette.DarkMuted != null &&
          palette.LightVibrant != null
        ) {
          setColors({
            c1: palette.LightVibrant.getHex(),
            c2: palette.DarkVibrant.getHex(),
          });
        }
      });
  }, [image]);

  return colors;
};

const CurrentTrack: React.FC<{ track: Track }> = ({ track }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: ["1fr", "1fr 1fr"],
        gap: [4, 4, 5, 6],
      }}
    >
      <Link href={track.url} variant="none">
        <img
          src={track.image}
          sx={{
            maxWidth: "100%",
            boxShadow: "#00000052 2px 2px 30px",
          }}
        />
      </Link>

      <Flex sx={{ alignItems: "center" }}>
        <Box sx={{ maxWidth: "measure" }}>
          <Link href={track.url} variant="empty">
            <Text sx={{ fontSize: [5, 5, 5, 6], fontWeight: "bold", pb: 2 }}>
              {track.name}
            </Text>
          </Link>
          <Text>{track.artist}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

const Home = () => {
  const { user, loading, hasToken, currentTrack } = useSpotify();
  const colors = useColors(currentTrack?.data?.image);

  return (
    <Layout noHeader>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          minHeight: "100vh",
          width: "100%",
          backgroundImage:
            colors != null
              ? `linear-gradient(to bottom right, ${colors.c1}, ${colors.c2})`
              : "transparent",
        }}
      >
        <Box sx={{ maxWidth: "container", mx: "auto", px: [3, 4] }}>
          {loading && <LoadingCenter />}

          {user == null && !loading && !hasToken && (
            <Box sx={{ minWidth: "measure" }}>
              <Text variant="display" pb={4}>
                Please login
              </Text>
              <LoginWithSpotify />
            </Box>
          )}

          {user != null && !currentTrack.loading && (
            <Box>
              {currentTrack.data == null ? (
                <Box>No track playing</Box>
              ) : (
                <CurrentTrack track={currentTrack.data} />
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
