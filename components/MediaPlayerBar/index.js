import Player from "components/Player";

export default function MediaPlayerBar({
  songs,
  currentSongIndex,
  nextSongIndex,
  setCurrentSongIndex,
}) {
  return (
    <div className="fixed bottom-0 right-0 w-full bg-gray-800">
      {songs.length > 0 && (
        <Player
          className="flex flex-col items-center"
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          nextSongIndex={nextSongIndex}
          songs={songs}
        />
      )}
    </div>
  );
}
