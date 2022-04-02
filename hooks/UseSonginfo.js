import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import UseSpotify from "./UseSpotify";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";

function UseSonginfo() {
  const spotifyapi = UseSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [Songinfo, setsonginfo] = useState(null);
  useEffect(() => {
    const fetchsonginfo = async () => {
      if (currentTrackId) {
        const trackinfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              authorization: `Bearer ${spotifyapi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json());
        setsonginfo(trackinfo);
      }
    };
    fetchsonginfo();
  }, [currentTrackId]);

  return Songinfo;
}

export default UseSonginfo;
