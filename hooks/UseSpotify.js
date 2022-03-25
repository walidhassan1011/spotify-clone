import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyapi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});
function UseSpotify() {
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      if (session.error === "refreshAcesstokenError") {
        signIn();
      }

      spotifyapi.setAccessToken(session.user.accesstoken);
    }
  }, [session]);
  return spotifyapi;
}

export default UseSpotify;
