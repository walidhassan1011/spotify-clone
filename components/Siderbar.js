import React from "react";
import {
  BeakerIcon,
  HomeIcon,
  LibraryIcon,
  SearchIcon,
} from "@heroicons/react/outline";
function Siderbar() {
  return (
    <>
      <div className="text-gray-500 p-5 text-sm border-r border-gray-900">
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
      </div>
    </>
  );
}

export default Siderbar;
