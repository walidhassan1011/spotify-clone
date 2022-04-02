import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { useSession } from "next-auth/react";
import UseSpotify from "../hooks/UseSpotify";
import UseSonginfo from "../hooks/UseSonginfo";
import {
  ReplyIcon,
  SwitchHorizontalIcon,
  VolumeUpIcon,
} from "@heroicons/react/outline";
import {
  PauseIcon,
  PlayIcon,
  RewindIcon,
  FastForwardIcon,
} from "@heroicons/react/solid";
import { debounce } from "lodash";
function Player() {
  const spoftifyapi = UseSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isplaying, setisplaying] = useRecoilState(isPlayingState);
  const [volume, setvolume] = useState(50);
  const songinfo = UseSonginfo();
  const fetchCurrrentSong = () => {
    if (!songinfo) {
      spoftifyapi.getMyCurrentPlayingTrack().then((res) => {
        setCurrentTrackId(res.body?.item?.id);
        spoftifyapi.getMyCurrentPlayingTrack().then((res) => {
          setisplaying(res.body?.is_playing);
        });
      });
    }
  };
  const handleplaypause = () => {
    spoftifyapi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spoftifyapi.pause();
        setisplaying(false);
      } else {
        spoftifyapi.play();
        setisplaying(true);
      }
    });
  };
  useEffect(() => {
    if (spoftifyapi.getAccessToken() && !currentTrackId) {
      fetchCurrrentSong();
      setvolume(50);
    }
  }, [currentTrackId, spoftifyapi, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debounceAdjustVolume(volume);
    }
  }, [volume]);
  const debounceAdjustVolume = useCallback(
    debounce((volume) => {
      spoftifyapi.setVolume(volume).catch((err) => {});
    }, 500),
    []
  );

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 sm:px-8">
      <div className="flex items-center space-x-4 ">
        <img
          src={songinfo?.album.images?.[0]?.url}
          alt=""
          className=" sm:hidden md:inline w-10 h-10"
        />
        <div>
          <h3>{songinfo?.name}</h3>
          <p>{songinfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />
        {isplaying ? (
          <PauseIcon onClick={handleplaypause} className="button w-10 h-10" />
        ) : (
          <PlayIcon onClick={handleplaypause} className="button w-10 h-10" />
        )}
        <FastForwardIcon className="button" />
        <ReplyIcon className="button" />
      </div>
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <VolumeUpIcon
          onClick={() => volume > 0 && setvolume(volume - 10)}
          className="button sm:hidden
          md:inline "
        />
        <input
          className="w-14 md:w-28"
          type="range"
          value={volume}
          onChange={(e) => setvolume(Number(e.target.value))}
          min={0}
          max={100}
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && setvolume(volume + 10)}
          className="button w-10 h10"
        />
      </div>
    </div>
  );
}

export default Player;
