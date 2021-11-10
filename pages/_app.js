import "tailwindcss/tailwind.css";
import useSongs from "hooks/useSongs";
import useSongIndex from "hooks/useSongIndex";
import useUser from "hooks/useUser";
import useAllUsers from "hooks/useAllUsers";
import Profile from "components/Profile";
import NavBar from "components/NavBar";
import MediaPlayerBar from "components/MediaPlayerBar";
import { useState } from "react";

export default function MyApp({ Component, pageProps }) {
  const user = useUser();
  const allUsers = useAllUsers();
  const songs = useSongs(user);
  const [isPlaying, setIsPlaying] = useState(false);
  const { currentSongIndex, nextSongIndex, setCurrentSongIndex } =
    useSongIndex(songs);

  return (
    <>
      <Component
        allUsers={allUsers}
        NavBar={() => NavBar(allUsers, user)}
        Profile={() => Profile(user)}
        {...pageProps}
      />
      <MediaPlayerBar
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songs={songs}
        currentSongIndex={currentSongIndex}
        nextSongIndex={nextSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
      />
    </>
  );
}
