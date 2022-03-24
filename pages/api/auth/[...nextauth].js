import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyapi, { LOGIN_URL } from "../../../lib/Spotify";
async function refreshAcessToken(token) {
  try {
    spotifyapi.setAccessToken(token.access_token);
    spotifyapi.setRefreshToken(token.refreshToken);
    const { body: refreshToken } = await spotifyapi.refreshAccessToken();
    console.log("refreshToken is ", refreshToken);
    return {
      ...token,
      accesstoken: refreshToken.access_token,
      accesstokenExpires: Date.now() + refreshToken.expires_in * 1000,
      refreshToken: refreshToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "refreshAcesstokenError",
    };
  }
}
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          ...token,
          accesstoken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accesstokenExpires: account.expires_at * 1000,
        };
      }
      if (Date.now() < token.accesstokenExpires) {
        console.log("token is valid");
        return token;
      }
      console.log("token is expired");
      return await refreshAcessToken(token);
    },
    async session({ session, token }) {
      session.user.accesstoken = token.accesstoken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;
      return session;
    },
  },
});
