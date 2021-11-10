import { useState, useRef, useEffect } from "react";
import Controls from "components/Controls";
import Details from "components/Details";

export default function jPlayer({
  isPlaying,
  setIsPlaying,
  currentSongIndex,
  setCurrentSongIndex,
  nextSongIndex,
  songs,
}) {
  const audioEl = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  });

  const SkipSong = (forwards = true) => {
    if (forwards) {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp++;

        if (temp > songs.length - 1) {
          temp = 0;
        }

        return temp;
      });
    } else {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp--;

        if (temp < 0) {
          temp = songs.length - 1;
        }

        return temp;
      });
    }
  };

  return (
    <div className="grid w-full grid-cols-3 p-4">
      <audio src={songs[currentSongIndex].songUrl} ref={audioEl}></audio>
      <Details song={songs[currentSongIndex]} />
      <Controls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        SkipSong={SkipSong}
      />
      <p className="flex flex-col justify-center mr-4 justify-self-end">
        <span className="text-lg font-bold">Siguiente canción: </span>
        <span className="font-medium">{songs[nextSongIndex].name}</span>
        <span>{songs[nextSongIndex].songUser.name}</span>
      </p>
    </div>
  );
}
