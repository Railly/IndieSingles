import { useEffect, useState } from "react";

export default function useUser() {
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
          console.log(data);
          setUser(data, "setUser(data)");
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  }, []);

  return user;
}
