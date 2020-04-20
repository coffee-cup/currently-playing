import SpotifyWebApi from "spotify-web-api-node";

export const scopes = [
  "user-read-email",
  "streaming",
  "user-read-playback-state",
  "user-read-currently-playing",
];

export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri:
    process.env.NODE_ENV === "production"
      ? "https://currently-playing.now.sh/auth"
      : "http://localhost:3000/auth",
});
