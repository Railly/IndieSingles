import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
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
import { useForm, useFormState } from "react-hook-form";
import { useEffect, useState } from "react";

export default function App() {
  const [file, setFile] = useState(null);
  const router = useRouter();
  const { register, setValue, getValues, handleSubmit, control } = useForm();
  const { dirtyFields } = useFormState({
    control,
  });
  const user = useUser();
  const songs = useSongs(user);
  const allUsers = useAllUsers();
  const { currentSongIndex, nextSongIndex, setCurrentSongIndex } =
    useSongIndex(songs);

  const logout = () => {
    window.localStorage.removeItem("token");
    router.push("/login");
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    const _file = e.target.files[0];
    setFile(_file);
    register("file").onChange(e);
  };

  const onSubmit = (data) => {
    let cleanData = Object.keys(data).reduce((acc, key) => {
      if (dirtyFields[key]) {
        acc[key] = data[key];
      }
      return acc;
    }, {});

    if (cleanData?.file) {
      cleanData = {
        ...cleanData,
        file: cleanData.file[0],
      };
    }

    console.log(cleanData, "cleanData");

    const formData = new FormData();
    Object.keys(cleanData).forEach((key) => {
      formData.append(key, cleanData[key]);
    });

    fetch("https://api-indiesingles.herokuapp.com/api/user", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (user) {
      setValue("description", user.description);
    }
  }, [user]);

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
          <section className="grid grid-cols">
            {user && (
              <article className="flex flex-row items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                  <div>
                    <Image
                      className="w-full rounded-full"
                      src={user.profileImage}
                      alt={user.name}
                      width={200}
                      height={200}
                    />
                  </div>
                  {/* <button
                  onClick={() => {
                    logout();
                  }}
                  className="p-4 m-4 text-white transition-colors bg-green-500 rounded-md hover:bg-green-600"
                >
                  Cambiar Imagen
                </button> */}
                </div>
                <div className="flex flex-col items-start p-4 mx-16 mt-4 border border-green-50">
                  <h1 className="mb-4 ml-4 text-5xl font-bold">{user.name}</h1>
                  <span className="text-gray-100">
                    <b>Correo: </b>
                    {user.email}
                  </span>
                  <span className="text-gray-100">
                    <b>Seguidores: </b>
                    {user.userSubscribers.length}
                  </span>
                  <span className="text-gray-100">
                    <b>Seguidos: </b>
                    {user.userSubscriptions.length}
                  </span>
                  <span>
                    <b>Descripción: </b>
                  </span>
                  {user.description}
                </div>
              </article>
            )}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center justify-center md:mt-4 md:flex-row md:items-start"
            >
              <label className="flex flex-col font-semibold">
                Descripción:
                <textarea
                  className="h-48 px-4 py-2 my-2 overflow-y-hidden text-black resize-none w-72 rounded-xl"
                  // fix the size
                  name="description"
                  {...register("description")}
                />
              </label>
              <div className="md:ml-8">
                <label className="flex flex-col font-semibold">
                  Contraseña:
                  <input
                    className="w-64 px-4 py-2 my-2 text-black border border-gray-400 rounded-full"
                    type="password"
                    name="password"
                    {...register("password")}
                  />
                </label>
                <label className="flex flex-col font-semibold">
                  Foto de perfil:
                  <div className="relative">
                    <input
                      className="absolute top-0 right-0 w-64 px-4 py-3 my-2 text-black border border-gray-400 rounded-full opacity-0 cursor-pointer"
                      type="file"
                      name="file"
                      {...register("file")}
                      onChange={handleFileChange}
                    />
                  </div>
                  <span className="w-64 px-4 py-4 my-2 text-center bg-black border border-green-500 rounded-full text-gray-50">
                    Subir imagen
                  </span>
                  {file && (
                    <span className="text-sm text-gray-300">
                      {`${file.name} (${Math.round(file.size / 1024)} KB)`}
                    </span>
                  )}
                </label>
                <button
                  disabled={Object.keys(dirtyFields).length === 0}
                  type="submit"
                  className="w-full px-4 py-2 mt-4 mb-24 text-white transition-colors bg-green-500 rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-default"
                >
                  Actualizar Perfil
                </button>
              </div>
            </form>
          </section>
          {/* {songs.length > 0 && (
            <Player
              currentSongIndex={currentSongIndex}
              setCurrentSongIndex={setCurrentSongIndex}
              nextSongIndex={nextSongIndex}
              songs={songs}
            />
          )} */}
        </section>
      </main>
    </div>
  );
}
