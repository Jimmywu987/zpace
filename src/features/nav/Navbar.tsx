import Link from "next/link";
import { NavLink } from "@/features/nav/components/NavLink";
import { NavDivider } from "@/features/nav/components/NavDivider";
import { signOut, useSession } from "next-auth/react";
import { User } from "@/types/User";
import MetaTags from "@/features/head/components/Metatags";
import MenuIcon from "@mui/icons-material/Menu";
import BecomeHostBox from "../becomeHost/components/BecomeHostBox";

export const Navbar = () => {
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";
  const user = session.data?.user as User;

  return (
    <nav className="bg-white shadow-xl flex py-0 px-3 justify-between items-center">
      <div className="flex items-center">
        <Link href="/" passHref>
          <a className="">
            <img src="/logo.png" className="h-20" alt="logo" />
          </a>
        </Link>
        <div className="hidden sm:block">
          <NavLink text="Home" url="/" />
        </div>
        {isAuthenticated ? (
          <>
            <MetaTags />
            <div className="items-center  hidden sm:flex">
              <NavDivider />
              <Link href={`/profile/${user.id}`} passHref>
                <a className=" flex items-center space-x-2 transition hover:bg-link-bgHover hover:scale-110 hover:text-red-500 rounded p-1 text-lg text-link-normal ">
                  <img
                    src={user.profileImg}
                    alt={`${user.username} profile image`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="">{user.username}</span>
                </a>
              </Link>
              <NavDivider />
              <button
                className=" text-lg text-link-normal transition hover:bg-link-bgHover hover:scale-110 hover:text-red-500 py-2 px-2.5 rounded"
                onClick={() => {
                  signOut();
                }}
              >
                Logout
              </button>
            </div>

           <BecomeHostBox />
            <button className="absolute right-[1rem] block sm:hidden">
              <div className="bg-theme-color1 rounded-full text-white p-2 ">
                <MenuIcon></MenuIcon>
              </div>
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
