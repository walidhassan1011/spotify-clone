import React, { useEffect, useState } from "react";
import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import UseSpotify from "../hooks/UseSpotify";
function Siderbar() {
  const spotifyapi = UseSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    if (spotifyapi.getAccessToken()) {
      spotifyapi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
        console.log("hello");
      });
    }
  }, [session, spotifyapi]);

  return (
    <>
      <div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide ">
        <div className="space-y-4 ">
          <button
            className="flex items-center space-x-2 hover:text-white"
            onClick={() => {
              signOut();
            }}
          >
            <p>Log out</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-white">
            <HomeIcon className="w-5 h-5 " />
            <p>Home</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-white">
            <SearchIcon className="w-5 h-5 " />
            <p>Search</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-white">
            <LibraryIcon className="w-5 h-5 " />
            <p>Your Library</p>
          </button>
          <hr className="border-t-[0.1px] border-gray-900" />
          <button className="flex items-center space-x-2 hover:text-white">
            <PlusCircleIcon className="w-5 h-5 " />
            <p>Create playlist</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-white">
            <HeartIcon className="w-5 h-5 " />
            <p>Liked songs</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-white">
            <RssIcon className="w-5 h-5 " />
            <p>Your Episodes</p>
          </button>
          <hr className="border-t-[0.1px] border-gray-900" />
          {/* playlist */}
          {playlists.map((playlist) => (
            <p key={playlist.id} className="cursor-pointer hover:text-white">
              {playlist.name}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

export default Siderbar;
