import "tailwindcss/tailwind.css";
import useSongs from "hooks/useSongs";
import useSongIndex from "hooks/useSongIndex";
import useUser from "hooks/useUser";
import useAllUsers from "hooks/useAllUsers";
import Profile from "components/Profile";
import NavBar from "components/NavBar";
import MediaPlayerBar from "components/MediaPlayerBar";

export default function MyApp({ Component, pageProps }) {
  const user = useUser();
  const allUsers = useAllUsers();
  const songs = useSongs(user);
  const { currentSongIndex, nextSongIndex, setCurrentSongIndex } =
    useSongIndex(songs);

  return (
    <Component
      NavBar={() => NavBar(allUsers)}
      Profile={() => Profile(user)}
      MediaPlayerBar={() =>
        MediaPlayerBar({
          songs,
          currentSongIndex,
          nextSongIndex,
          setCurrentSongIndex,
        })
      }
      {...pageProps}
    />
  );
}
