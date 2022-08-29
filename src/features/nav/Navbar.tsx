import Link from "next/link";
import { NavLink } from "@/features/nav/components/NavLink";
import { NavDivider } from "@/features/nav/components/NavDivider";
import { signOut, useSession } from "next-auth/react";
import { User } from "@/types/User";
import MetaTags from "@/../components/Metatags";

export const Navbar = () => {
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";
  const user = session.data?.user as User;
  return (
    <nav className="flex py-0 px-3 justify-between items-center">
      <div className="flex items-center">
        <Link href="/" passHref>
          <a className="">
            <img src="/logo.png" className="h-20" alt="logo" />
          </a>
        </Link>
        <NavLink text="Home" url="/" />
        {isAuthenticated ? (
          <>
            <MetaTags
              title={`${user.username} | ZPACE`}
              description="ZPACE - flexible space sharing platform"
            />
            <NavDivider />
            <Link href={`/profile/${user.id}`} passHref>
              <a className="flex items-center space-x-2 hover:bg-link-bgHover rounded p-1 text-lg text-link-normal ">
                <img
                  src={user.profileImg}
                  alt={`${user.username} profile image`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span>{user.username}</span>
              </a>
            </Link>
            <NavDivider />
            <button
              className="text-lg text-link-normal hover:bg-link-bgHover py-2 px-2.5 rounded"
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <MetaTags />
            <NavDivider />
            <NavLink text="Login" url="/login" />
            <NavDivider />
            <NavLink text="Sign up" url="/sign-up" />
          </>
        )}
      </div>
    </nav>
  );
};
