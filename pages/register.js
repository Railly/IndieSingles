import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "schemas/validation";
import Logo from "svg/Logo";

export default function Register() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  console.log(errors);

  const onSubmit = (data) => {
    window
      .fetch("https://api-indiesingles.herokuapp.com/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((res) => {
        if (res.ok) {
          router.push("/login");
        }
      });
  };

  const handleClick = () => {
    router.push("/login");
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      router.push("/app");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-200 bg-black ">
      <Logo className="w-1/2 h-20 " />
      <h1 className="h-12 text-xl">
        Registrate y comparte tus canciones con el mundo
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="h-14">
          <label className="flex flex-col font-semibold">
            Nombre:
            <input
              className="text-black border border-gray-400 rounded-full"
              type="text"
              name="username"
              {...register("name")}
            />
          </label>
        </div>
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
          <span className="text-xs text-red-500">
            {errors?.password && errors?.password?.message}
          </span>
        </div>
        <button
          className="px-20 py-2 font-bold text-white bg-green-700 rounded-full hover:bg-green-600 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Registrarse
        </button>
        <button
          className="mx-3 tex-gray-300 hover:text-gray-100 "
          onClick={handleClick}
        >
          Ir a Inicio de Sesion
        </button>
      </form>
    </div>
  );
}
