import SpotifyWebApi from "spotify-web-api-node";

// const scopes = [
//   "user-read-email",
//   "playlist-read-private",
//   "playlist-read-collaborative",
//   "user-read-email",
//   "streaming",
//   "user-read-private",
//   "user-library-read",
//   "user-top-read",
//   "user-read-playback-state",
//   "user-modify-playback-state",
//   "user-read-currently-playing",
//   "user-read-recently-played",
//   "user-follow-read",
// ].join(",");
// const params = {
//   scope: scopes,
// };
// const queryParams = new URLSearchParams(params);
const LOGIN_URL =
  "https://accounts.spotify.com/authorize?client_id=8b945ef10ea24755b83ac50cede405a0&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const spotifyapi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});
export default spotifyapi;

export { LOGIN_URL };
