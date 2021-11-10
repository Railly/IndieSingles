import Image from "next/image";
import Play from "svg/Play";
import useUser from "hooks/useUser";
import useSongs from "hooks/useSongs";
import { useRouter } from "next/router";

export default function App({ children, Profile, NavBar, MediaPlayerBar }) {
  const router = useRouter();
  const user = useUser();
  const songs = useSongs(user);

  return (
    <div className="flex flex-row max-h-screen overflow-y-hidden text-gray-50">
      <NavBar />
      <main className="w-full bg-gray-900">
        <div className="flex flex-row justify-between p-6">
          <div className="flex flex-row">
            <h1 className="text-3xl font-bold">Home</h1>
          </div>
          <Profile />
        </div>
        <section className="max-h-screen px-5 overflow-y-scroll pb-72">
          <div className="flex flex-row justify-between">
            <h1 className="text-xl">Tus canciones</h1>
            <button
              onClick={() => {
                router.push("app/songs/new");
              }}
              className="fixed right-0 z-10 px-4 py-2 mr-8 font-bold text-white bg-green-500 rounded hover:bg-blue-700"
            >
              Agregar canciones
            </button>
          </div>
          {songs.length > 0 ? (
            <ul className="grid pt-4 grid-cols gap-x-24 gap-y-16 place-items-center md:grid-cols-2 lg:grid-cols-3">
              {songs.map((song) => (
                <li key={song._id} className="cursor-pointer group">
                  <article className="flex flex-col w-full p-6 transition-colors bg-gray-800 h-96 group-hover:bg-gray-700">
                    <div className="relative ">
                      <Image
                        src={song.songImage}
                        alt="profile picture"
                        width={280}
                        height={280}
                      />
                      <Play
                        className="absolute transition-transform cursor-pointer right-2 bottom-4 group-hover:scale-110"
                        fill="text-green-200"
                        width={60}
                        height={60}
                      />
                    </div>
                    <span className="ml-4 text-lg font-medium">
                      {song.name}
                    </span>
                    <span className="ml-4 font-medium text-gray-400 text-md">
                      {song.songUser.name}
                    </span>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-row justify-center">
              <span className="text-gray-100">No tienes canciones todavía</span>
            </div>
          )}
          <MediaPlayerBar />
        </section>
      </main>
    </div>
  );
}
