import { useEffect, useState } from "react";

export default function useSongs(user) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (user) {
      window
        .fetch(
          `https://api-indiesingles.herokuapp.com/api/songs?authorId=${user._id}&from=0&limit=0`,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "songs");
          setSongs(data);
        });
    }
  }, [user]);

  return songs;
}
