import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistate } from "../atoms/PlaylistAtom";
import { shuffle } from "lodash";
import UseSpotify from "../hooks/UseSpotify";
import { signOut } from "next-auth/react";
import Songs from "./Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];
function Center() {
  const { data: session } = useSession();
  const spotifyapi = UseSpotify();
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistate);
  const [color, setColor] = useState(null);
  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);
  useEffect(() => {
    spotifyapi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => {
        console.log("error");
      });
  }, [spotifyapi, playlistId]);
  console.log(session);
  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide text-white ">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center  space-x-3 opacity-90 bg-black hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
          onClick={signOut}
        >
          <img className="rounded-full w-10 h-10" src={session?.user.image} />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8 w-full`}
      >
        <img src={playlist?.images?.[0].url} className="h-44 w-44 shadow-2xl" />
        <div>
          <p>PLAYLIST</p>
          <h1 className="tex-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
