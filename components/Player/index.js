import { useState, useRef, useEffect } from "react";
import Controls from "components/Controls";
import Details from "components/Details";

export default function Player({
  currentSongIndex,
  setCurrentSongIndex,
  nextSongIndex,
  songs,
}) {
  const audioEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
    <div className="c-player translate">
      <audio src={songs[currentSongIndex].songUrl} ref={audioEl}></audio>
      <Details song={songs[currentSongIndex]} />
      <Controls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        SkipSong={SkipSong}
      />
      <p className="c-player flex flex-col translate-x-28 -translate-y-20">
        Next up:{" "}
        <span>
          {songs[nextSongIndex].name} by {songs[nextSongIndex].name}
        </span>
      </p>
    </div>
  );
}
