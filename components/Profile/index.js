import Image from "next/image";
import Link from "next/link";

export default function Profile(user) {
  return (
    <div className="flex flex-row">
      {user ? (
        <div className="flex flex-row items-center">
          {user.profileImage && (
            <Image
              className="rounded-full"
              src={user.profileImage}
              alt="profile picture"
              width={40}
              height={40}
            />
          )}
          <Link href={`/app/artist/${user._id}`}>
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
  );
}
