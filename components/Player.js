import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/PlayerAtom";
import { useSession } from "../hooks/UseSession";
import UseSpotify from "../hooks/UseSpotify";
function Player() {
  const spoftifyapi = UseSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isplaying, setisplaying] = useRecoilState(isPlayingState);
  const [volume, setvolume] = useState(50);
  return (
    <div>
      <div>{/* <img src="" alt=""> */}</div>
    </div>
  );
}

export default Player;
