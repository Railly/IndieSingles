import { Router, useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

export default function App() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      window
        .fetch("https://api-indiesingles.herokuapp.com/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          console.log(data);
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <>
      <h1>App</h1>
      <p>{user?.name}</p>
      <p>{user?.description}</p>
      <img src={user?.profileImage} alt="avatar" />
      <button
        onClick={logout}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      >
        Cerrar Sesión
      </button>
    </>
  );
}
