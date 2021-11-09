import React from "react";

function Controls({ isPlaying, setIsPlaying, SkipSong }) {
  return (
    <div className="c-player--controls">
      <button className="skip-btn" onClick={() => SkipSong(false)}>
        Backward
      </button>
      <button className="play-btn" onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? <p>Pause</p> : <p>Play</p>}
      </button>
      <button className="skip-btn" onClick={() => SkipSong(true)}>
        Forward
      </button>
    </div>
  );
}

export default Controls;
