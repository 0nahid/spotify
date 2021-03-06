import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useState } from 'react';
import useSpotify from './../Hooks/useSpotify';

function Sidebar() {
  const { data: session, status } = useSession();
  console.log(session)

  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide ">
      <div className="space-y-4">
        <button
          className="flex items-center space-x-2 hover:text-white"
          onClick={() => signOut()}
        >
          <p>Log out</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-6 w-6" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-6 w-6" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-6 w-6" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-6 w-6" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-6 w-6" />
          <p>Liked Song</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-6 w-6" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {/* Playlist */}
        <p className="cursor-pointer hover:text-white">PlayLists name...</p>
        <p className="cursor-pointer hover:text-white">PlayLists name...</p>
        <p className="cursor-pointer hover:text-white">PlayLists name...</p>
        <p className="cursor-pointer hover:text-white">PlayLists name...</p>
        <p className="cursor-pointer hover:text-white">PlayLists name...</p>
        <p className="cursor-pointer hover:text-white">PlayLists name...</p>
        <p className="cursor-pointer hover:text-white">PlayLists name...</p>
        <p className="cursor-pointer hover:text-white">PlayLists name...</p>
        <p className="cursor-pointer hover:text-white">PlayLists name...</p>
        <p className="cursor-pointer hover:text-white">PlayLists name...</p>
        <p className="cursor-pointer hover:text-white">PlayLists name...</p>
        <p className="cursor-pointer hover:text-white">PlayLists name...</p>
        <p className="cursor-pointer hover:text-white">PlayLists name...</p>
        <p className="cursor-pointer hover:text-white">PlayLists name...</p>
        <p className="cursor-pointer hover:text-white">PlayLists name...</p>
        <p className="cursor-pointer hover:text-white">PlayLists name...</p>
      </div>
    </div>
  );
}

export default Sidebar;
