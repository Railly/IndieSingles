import React from "react";
import Image from "next/image";

function Details({ song }) {
  return (
    <div className="flex flex-row">
      <div >
        <Image src={song.songImage} width={100} height={100} alt={song.name} />
      </div>
      <div className="flex flex-col">
      <h3 className="details-title font-bold text-xl translate-x-2 ">{song.name}</h3>
      <h4 className="details-artist font-bold  translate-x-2">{song.songUser.name}</h4>
      </div>

    </div>
  );
}

export default Details;
