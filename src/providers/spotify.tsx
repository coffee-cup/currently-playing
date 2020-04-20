import * as React from "react";
import * as api from "../api";
import { saveItem, getItem, clearItem } from "../local";
import { Token, User, Track, LoadingValue } from "../types";
import { spotifyApi } from "../spotify";
import useAsyncEffect from "use-async-effect";
import { loadingValue, dataValue, errorValue } from "../utils";

export interface SpotifyState {
  loading: boolean;
  user: User | null;
  currentTrack: LoadingValue<Track | null>;
  hasToken: boolean;
  getAndSaveToken: (code: string) => Promise<boolean>;
  login: () => void;
}

const SpotifyContext = React.createContext<SpotifyState>({} as SpotifyState);

const tokenKey = "@spotify/token";

const useMe = (token: Token | null, reset: () => void) => {
  const [user, setUser] = React.useState<User | null>(null);

  useAsyncEffect(async () => {
    if (token == null) {
      setUser(null);
      return;
    }

    try {
      const result = await spotifyApi.getMe();

      setUser({
        id: result.body.id,
        name: result.body.display_name ?? result.body.id,
        email: result.body.email,
        href: result.body.href,
        uri: result.body.uri,
      });
    } catch (e) {
      console.log(e);
      reset();
    }
  }, [token]);

  return user;
};

const useCurrentPlayback = (token: Token | null, reset: () => void) => {
  const [track, setTrack] = React.useState<LoadingValue<Track | null>>(
    loadingValue(),
  );
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    if (token == null) {
      return;
    }

    const getPlayback = async () => {
      try {
        const { body } = await spotifyApi.getMyCurrentPlayingTrack();

        if (body == null || body.item == null) {
          setTrack(dataValue(null));
          return;
        }

        setIsPlaying(body.is_playing);
        setTrack(
          dataValue({
            name: body.item.name,
            artist: body.item.artists.map(artist => artist.name).join(", "),
            album: body.item.album.name,
            image: body.item.album.images[0].url,
            url: body.item.external_urls.spotify,
          }),
        );
      } catch (e) {
        console.log(e);
        reset();
      }
    };

    const interval = setInterval(getPlayback, 10000);
    getPlayback();

    return () => clearInterval(interval);
  }, [token]);

  return { track, isPlaying };
};

const SpotifyProvider: React.FC = props => {
  const [loading, setLoading] = React.useState(true);
  const [token, setToken] = React.useState<Token | null>(null);

  const resetToken = () => {
    console.log("RESETING TOKEN");

    setToken(null);
    setLoading(false);
    clearItem(tokenKey);
  };

  const user = useMe(token, resetToken);
  const { track } = useCurrentPlayback(token, resetToken);

  const getAndSaveToken = async (code: string) => {
    const result = await api.getToken(code);
    if (result.success) {
      setToken(result.body);
      saveItem(tokenKey, result.body);

      spotifyApi.setAccessToken(result.body.accessToken);
      spotifyApi.setRefreshToken(result.body.refreshToken);
    }

    return result.success;
  };

  // load token from local storage
  useAsyncEffect(async () => {
    const savedToken = getItem<Token | null>(tokenKey, null);

    if (savedToken != null) {
      setToken(savedToken);
      spotifyApi.setAccessToken(savedToken.accessToken);
      spotifyApi.setRefreshToken(savedToken.refreshToken);
    }

    setLoading(false);
  }, []);

  const login = async () => {
    const result = await api.getAuthURL();
    if (result.success) {
      window.location.href = result.body;
    }
  };

  const value: SpotifyState = {
    loading,
    user,
    currentTrack: track,
    hasToken: token != null,
    login,
    getAndSaveToken,
  };

  return (
    <SpotifyContext.Provider value={value}>
      {props.children}
    </SpotifyContext.Provider>
  );
};

export default SpotifyProvider;

export const useSpotify = (): SpotifyState => React.useContext(SpotifyContext);
