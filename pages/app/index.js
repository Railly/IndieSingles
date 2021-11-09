import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Logo from "svg/Logo";
import Home from "svg/Home";
import Search from "svg/Search";
import Muisc from "svg/Music";
import Play from "svg/Play";
import Player from "components/Player";
import useUser from "hooks/useUser";
import useAllUsers from "hooks/useAllUsers";
import useSongs from "hooks/useSongs";
import useSongIndex from "hooks/useSongIndex";

export default function App() {
  const router = useRouter();
  const user = useUser();
  const songs = useSongs(user);
  const allUsers = useAllUsers();
  const { currentSongIndex, nextSongIndex, setCurrentSongIndex } =
    useSongIndex(songs);

  const logout = () => {
    window.localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex flex-row max-h-screen overflow-y-hidden text-gray-50">
      <nav className="h-screen text-lg font-medium bg-black w-80">
        <div className="pt-4 pl-4">
          <Logo />
        </div>
        <ul className="pt-4 pb-4 mx-4 border-b-4 border-gray-800">
          <li className="pt-4">
            <Link href="/app">
              <a className="flex flex-row">
                <Home />
                <span className="ml-2">Inicio</span>
              </a>
            </Link>
          </li>
          <li className="pt-4">
            <Link href="/app/search">
              <a className="flex flex-row">
                <Search />
                <span className="ml-2">Buscar</span>
              </a>
            </Link>
          </li>
          <li className="pt-4">
            <Link href="/app/artists/">
              <a className="flex flex-row">
                <Muisc />
                <span className="ml-2">Tus Artistas</span>
              </a>
            </Link>
          </li>
        </ul>
        <ul>
          {allUsers.length > 0 &&
            allUsers
              .filter((user) => {
                // return user.userSubscribers.includes(user._id);
                return user;
              })
              .map((user) => (
                <li className="pt-4 pl-4 font-normal" key={user._id}>
                  <Link href="/app/artist/[id]" as={`/app/artist/${user._id}`}>
                    <a className="flex flex-row">
                      {/* <Image
                        src={user.profileImage}
                        width={40}
                        height={40}
                        className="rounded-full"
                      /> */}
                      <span className="ml-2">{user.name}</span>
                    </a>
                  </Link>
                </li>
              ))}
        </ul>
        <button
          onClick={() => {
            logout();
          }}
          className="p-4 m-4 text-white transition-colors bg-green-500 rounded-md hover:bg-green-600"
        >
          Cerrar Sesión
        </button>
      </nav>
      <main className="w-full bg-gray-900">
        <div className="flex flex-row justify-between p-4">
          <div className="flex flex-row">
            <h1 className="text-3xl font-bold">Home</h1>
          </div>
          <div className="flex flex-row">
            {user ? (
              <div className="flex flex-row items-center">
                <Image
                  className="rounded-full"
                  src={user.profileImage}
                  alt="profile picture"
                  width={40}
                  height={40}
                />
                <Link href="/app/profile">
                  <a className="ml-4 text-lg font-medium">{user.name}</a>
                </Link>
              </div>
            ) : (
              <Link href="/login">
                <a className="flex flex-row">
                  <span className="text-gray-100">Iniciar Sesión</span>
                </a>
              </Link>
            )}
          </div>
        </div>
        <section className="max-h-screen px-5 pb-24 overflow-y-scroll">
          <h1 className="text-xl">Tus canciones</h1>
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
          {songs.length > 0 && (
            <Player
              currentSongIndex={currentSongIndex}
              setCurrentSongIndex={setCurrentSongIndex}
              nextSongIndex={nextSongIndex}
              songs={songs}
            />
          )}
        </section>
      </main>
    </div>
  );
}
