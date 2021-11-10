import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";
import AppLayout from "components/AppLayout";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      {router.pathname !== "/login" && router.pathname !== "/register" ? (
        <AppLayout Component={Component} pageProps={pageProps} />
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}
