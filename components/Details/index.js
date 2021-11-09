import React from "react";
import Image from "next/image";

function Details({ song }) {
  return (
    <div className="c-player--details">
      <div className="details-img">
        <Image src={song.songImage} width={200} height={200} alt={song.name} />
      </div>
      <h3 className="details-title">{song.name}</h3>
      <h4 className="details-artist">{song.songUser.name}</h4>
    </div>
  );
}

export default Details;
