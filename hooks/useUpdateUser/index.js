export default function useUpdateUser() {
  const handleUpdateUser = (formData) => {
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

  return handleUpdateUser;
}
