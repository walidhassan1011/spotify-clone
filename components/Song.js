import React from "react";
import { useRecoilState } from "recoil";
import UseSpotify from "../hooks/UseSpotify";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { millisTominutesAndSeconds } from "../lib/time";

function Song({ order, track }) {
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isplaying, setisplaying] = useRecoilState(isPlayingState);

  const spoftifyapi = UseSpotify();

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setisplaying(true);
    spoftifyapi.play({
      uris: [track.track.uri],
    });
  };
  return (
    <div
      className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img className="h-10 w-10" src={track.track.album.images[0].url} />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className=" sm:hidden md:inline w-40 ">{track.track.album.name}</p>
        <p>{millisTominutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;
