import React from "react";
import { useRecoilValue } from "recoil";
import { playlistate } from "../atoms/PlaylistAtom";

function Songs() {
  const playlist = useRecoilValue(playlistate);
  return (
    <div>
      {playlist?.tracks.items.map((track) => (
        <div>{track.track.name}</div>
      ))}
    </div>
  );
}

export default Songs;
