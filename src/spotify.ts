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
  redirectUri: "http://localhost:3000/auth",
});
