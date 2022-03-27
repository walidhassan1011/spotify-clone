import React from "react";
import UseSpotify from "../hooks/UseSpotify";

function Song({ order, track }) {
  const spoftifyapi = UseSpotify();
  return (
    <div className="grid grid-cols-2">
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img className="h-10 w-10" src={track.track.album.images[0].url} />
        <div>
          <p>{track.track.name}</p>
          <p>{track.track.artists[0].name}</p>
        </div>
      </div>
      <div>
        <p className=" sm:hidden md:inline ">{track.track.album.name}</p>
        <p>duration</p>
      </div>
    </div>
  );
}

export default Song;
