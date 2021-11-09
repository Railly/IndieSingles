import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "svg/Logo";

export default function Login() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    window
      .fetch("https://api-indiesingles.herokuapp.com/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setToken(data.token);
        }
      })
      .catch((err) => console.error(err.message));
  };
  const handleClick = () => {
    router.push("/register");
  };
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      router.push("/app");
    }
  }, []);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
      router.push("/app");
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-200 bg-black ">
      <Logo className="w-1/2 h-20 " />
      <h1 className="h-12 text-xl">
        Es momento de descubrir o compartir nueva musica
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="h-14">
          <label className="flex flex-col font-semibold">
            Email:
            <input
              className="text-black border border-gray-400 rounded-full"
              type="email"
              name="email"
              {...register("email")}
            />
          </label>
        </div>
        <div className="h-20">
          <label className="flex flex-col font-semibold">
            Contraseña:
            <input
              className="text-black border border-gray-400 rounded-full"
              type="password"
              name="password"
              {...register("password")}
            />
          </label>
        </div>
        <button
          className="px-20 py-2 font-bold text-white bg-green-700 rounded-full hover:bg-green-600 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Iniciar Session
        </button>
        <button
          className="flex flex-col h-10 px-20 text-gray-300 hover:text-gray-100 "
          onClick={handleClick}
        >
          ir a Registrarse
        </button>
      </form>
    </div>
  );
}
