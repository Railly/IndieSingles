import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            Email:
            <input
              className="border border-gray-400"
              type="email"
              name="email"
              {...register("email")}
            />
          </label>
        </div>
        <div>
          <label>
            Contraseña:
            <input
              className="border border-gray-400"
              type="password"
              name="password"
              {...register("password")}
            />
          </label>
        </div>
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Iniciar Session
        </button>
      </form>
    </div>
  );
}
