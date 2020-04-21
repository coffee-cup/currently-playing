/** @jsx jsx */
import { Box, Flex, jsx, Styled, Text } from "theme-ui";
import Layout from "../components/Layout";
import Link from "../components/Link";
import { LoadingCenter } from "../components/Loading";
import LoginWithSpotify from "../components/LoginWithSpotify";
import { useSpotify } from "../providers/spotify";
import { Track } from "../types";
import useBoxShadow from "../hooks/use-box-shadow";
import { gradientCss } from "../utils";

const Title: React.FC = props => (
  <Text
    as="h1"
    sx={{ fontSize: [5, 5, 6, 6], fontWeight: "bold", pb: 2 }}
    variant="heading"
  >
    {props.children}
  </Text>
);

const Split: React.FC = props => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: ["1fr", "1fr 1fr"],
      gap: [4, 4, 5, 5, 6],
    }}
  >
    {props.children}
  </Box>
);

const CurrentTrack: React.FC<{ track: Track }> = ({ track }) => {
  const shadow = useBoxShadow();

  return (
    <Split>
      <Link href={track.url} variant="none">
        <img
          src={track.image}
          sx={{
            maxWidth: "100%",
            boxShadow: shadow,
            borderRadius: 2,
          }}
        />
      </Link>

      <Flex sx={{ alignItems: "center" }}>
        <Box sx={{ maxWidth: "measure", textShadow: "#00000030 2px 2px 5px" }}>
          <Link href={track.url} variant="empty">
            <Title>{track.name}</Title>
          </Link>
          <Text sx={{ fontWeight: "bold" }}>{track.artist}</Text>
        </Box>
      </Flex>
    </Split>
  );
};

const EmptyLayout: React.FC = props => {
  const shadow = useBoxShadow();

  return (
    <Split>
      <img
        src="/empty.png"
        sx={{
          maxWidth: "100%",
          boxShadow: shadow,
          borderRadius: 2,
        }}
      />
      <Flex sx={{ alignItems: "center" }}>
        <Box>{props.children}</Box>
      </Flex>
    </Split>
  );
};

const NoUser = () => (
  <EmptyLayout>
    <Title>Currently Playing</Title>
    <Text sx={{ pb: 3 }}>Login and the current playing song will appear</Text>
    <LoginWithSpotify />
  </EmptyLayout>
);

const NoTrack = () => (
  <EmptyLayout>
    <Title>Nothing Playing</Title>
    <Styled.p>Play a song on Spotify to see the magic</Styled.p>
  </EmptyLayout>
);

const Home = () => {
  const { colors, loading, hasToken, currentTrack } = useSpotify();

  return (
    <Layout noHeader>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          minHeight: "100vh",
          width: "100%",
          py: 4,

          ...(colors != null ? gradientCss(colors) : {}),
        }}
      >
        <Box sx={{ maxWidth: "container", mx: "auto", px: [3, 4] }}>
          {loading && <LoadingCenter />}

          {currentTrack.data == null && !loading && !hasToken && <NoUser />}

          {!currentTrack.loading && hasToken && (
            <Box>
              {currentTrack.data == null ? (
                <NoTrack />
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
