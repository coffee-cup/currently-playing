import { AppProps } from "next/app";
import { Styled, ThemeProvider } from "theme-ui";
import theme from "../styles";
import SpotifyProvider from "../providers/spotify";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <SpotifyProvider>
        <Styled.root>
          <Component {...pageProps} />
        </Styled.root>
      </SpotifyProvider>
    </ThemeProvider>
  );
}

export default MyApp;
