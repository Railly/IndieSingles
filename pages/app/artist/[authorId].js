import { useRouter } from "next/router";
import useAllUsers from "hooks/useAllUsers";
import { useEffect, useState } from "react";

export default function App({ Profile, NavBar }) {
  const router = useRouter();
  const { authorId } = router.query;
  const allUsers = useAllUsers();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (allUsers.length > 0) {
      const _currentUser = allUsers.find((user) => user._id === authorId);
      setCurrentUser(_currentUser);
    }
  }, [authorId]);

  useEffect(() => {
    if (authorId) {
      window
        .fetch(
          `https://api-indiesingles.herokuapp.com/api/songs?authorId=${authorId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
    }
  }, [authorId]);

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
          {currentUser && (
            <div className="flex flex-row justify-between">
              <h1 className="text-xl">{currentUser.name}</h1>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
