import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Back from "svg/Back";
import Play from "svg/Play";
import Image from "next/image";
import Pause from "svg/Pause";
import Modal from "components/Modal";

export default function App({
  Profile,
  NavBar,
  allSongs,
  refetchAllSongs,
  refetchSongs,
  user,
  isPlaying,
  setCurrentSongIndex,
  setIsPlaying,
}) {
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const { songId } = router.query;
  const [song, setSong] = useState(null);
  const handleDelete = () => {
    window
      .fetch(
        `https://api-indiesingles.herokuapp.com/api/song?songId=${songId}`,

        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetchSongs();
        refetchAllSongs();
        setModal(false);
        router.back();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (songId) {
      window
        .fetch(
          `https://api-indiesingles.herokuapp.com/api/song?songId=${songId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSong(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [songId]);

  const handlePlay = () => {
    const songIndex = allSongs.findIndex((song) => song._id === songId);
    setCurrentSongIndex(songIndex);
    setIsPlaying(true);
  };

  return (
    <>
      <div className="flex flex-row max-h-screen overflow-y-hidden text-gray-50">
        <NavBar />
        <main className="w-full bg-gray-900">
          <div className="flex flex-row justify-between p-6 mb-8">
            <Back
              className="cursor-pointer "
              width={30}
              height={30}
              onClick={() => {
                router.back();
              }}
            />
            {song && (
              <div className="flex flex-row items-center">
                <h1 className="ml-4 text-3xl font-bold">
                  {song.name} -{" "}
                  <span className="text-lg font-mediu">
                    {song.songUser.name}
                  </span>
                </h1>
              </div>
            )}
            <Profile />
          </div>
          <section className="flex justify-center max-h-screen px-5 overflow-y-scroll pb-72">
            <div className="flex flex-row items-center justify-center">
              {song && (
                <>
                  <div>
                    <div className="flex flex-row justify-center">
                      <div className="flex flex-row justify-center w-full">
                        {song && (
                          <article key={song._id}>
                            <article className="flex flex-col w-full h-full p-6 transition-colors bg-gray-800">
                              <div>
                                <Image
                                  src={song.songImage}
                                  alt="profile picture"
                                  width={280}
                                  height={280}
                                />
                              </div>
                              <span className="ml-4 text-lg font-medium">
                                {song.name}
                              </span>
                              <span className="ml-4 font-medium text-gray-400 text-md">
                                {song.songUser.name}
                              </span>
                              <span className="ml-4 text-sm text-gray-400">
                                {song.genre}
                              </span>
                            </article>
                          </article>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center h-full px-8 ml-8 border border-green-50">
                    <h2 className="mb-2 text-xl font-bold">{song.genre}</h2>
                    <p className="mb-4 font-medium text-md">
                      {song.description}
                    </p>
                    <p className="text-sm">
                      Creada en{" "}
                      {new Date(song.createdAt).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                      })}
                    </p>
                    {isPlaying ? (
                      <Pause
                        className="mt-4 cursor-pointer"
                        onClick={() => setIsPlaying(false)}
                        width={100}
                        height={100}
                      />
                    ) : (
                      <Play
                        className="mt-4 transition-transform cursor-pointer right-2 bottom-4 hover:scale-110"
                        onClick={handlePlay}
                        fill="text-green-200"
                        width={100}
                        height={100}
                      />
                    )}
                    {user && user._id === song.songUser._id && (
                      <button
                        onClick={() => {
                          setModal(true);
                        }}
                        className="px-4 py-2 mt-8 font-bold text-white transition-colors bg-red-500 rounded-full hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </section>
        </main>
      </div>
      {modal && <Modal setModal={setModal} handleDelete={handleDelete} />}
    </>
  );
}
