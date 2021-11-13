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
  const [duration, setDuration] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [songState, setSongState] = useState("stopped");

  useEffect(() => {
    if (isPlaying) {
      audioEl.current.play();
      setSongState("playing");
    } else {
      audioEl.current.pause();
      setSongState("paused");
    }
  });

  const convertElapsedTime = (elapsedTime) => {
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = Math.floor(elapsedTime - minutes * 60);
    if (seconds < 10) {
      return `${minutes}:0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  };

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
      <audio
        onLoadedMetadata={() => {
          setDuration(audioEl.current.duration);
        }}
        onTimeUpdate={() => {
          setCurrentTime(audioEl.current.currentTime);
        }}
        src={songs[currentSongIndex].songUrl}
        ref={audioEl}
      ></audio>
      <Details song={songs[currentSongIndex]} />
      <div>
        <Controls
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          SkipSong={SkipSong}
        />
        <div className="flex items-center mt-4">
          <span className="w-12 font-medium ">
            {convertElapsedTime(currentTime)}
          </span>
          {/* <div className="w-full h-1 mx-4 bg-gray-300"></div>
          <div className="w-full h-1 mx-4 bg-gray-500"></div> */}
          {/* Draw a line */}
          {audioEl?.current && (
            <div className="flex flex-row w-full">
              <svg
                className="h-1 bg-gray-300"
                fill="none"
                height={1}
                width={`${Math.floor((currentTime / duration) * 100)}%`}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path d="M0 0 L100 0 L100 100 L0 100 L0 0" />
              </svg>
              <svg
                className="h-1 bg-gray-600"
                fill="none"
                height={1}
                width="50%"
                width={`${Math.floor(
                  ((duration - currentTime) / duration) * 100
                )}%`}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path d="M0 0 L100 0 L100 100 L0 100 L0 0" />
              </svg>
            </div>
          )}
          <span className="w-12 ml-2 font-medium">
            {convertElapsedTime(duration)}
          </span>
        </div>
      </div>
      <p className="flex flex-col justify-center mr-4 justify-self-end">
        <span className="text-lg font-bold">Siguiente canción: </span>
        <span className="font-medium">{songs[nextSongIndex].name}</span>
        <span>{songs[nextSongIndex].songUser.name}</span>
      </p>
    </div>
  );
}
