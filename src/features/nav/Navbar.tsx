import MetaTags from "@/features/head/components/Metatags";
import { NavButton } from "@/features/nav/components/button/NavButton";
import { ManageRooms } from "@/features/nav/components/ManageRooms";
import { NavDivider } from "@/features/nav/components/NavDivider";
import { NavLink } from "@/features/nav/components/NavLink";
import { clearUserInfo, updateUser, userSelector } from "@/redux/user";
import { User } from "@prisma/client";

import { signOut, useSession, getSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Navbar = () => {
  const dispatch = useDispatch();
  const reduxUser = useSelector(userSelector);
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";
  const user = session.data?.user as User;
  useEffect(() => {
    const storeUserToRedux = async () => {
      const session = await getSession();
      if (session) {
        const {
          description,
          email,
          isRoomOwner,
          phoneNumber,
          profileImg,
          username,
        } = session?.user as Partial<User>;
        dispatch(
          updateUser({
            isRoomOwner,
            description,
            email,
            phoneNumber,
            profileImg,
            username,
          })
        );
      } else {
        dispatch(clearUserInfo());
      }
    };

    storeUserToRedux();
  }, [isAuthenticated]);

  return (
    <nav className="bg-white shadow-xl flex py-0 px-3 justify-between items-center">
      <div className="flex items-center flex-1 px-1">
        <Link href="/" passHref>
          <img src="/logo.png" className="h-20" alt="logo" />
        </Link>
        <NavLink text="Home" url="/" className="hidden md:block" />
        {isAuthenticated ? (
          <div className="flex items-center flex-1 justify-between ">
            <div className="flex items-center ">
              <MetaTags
                title={`${user.username} | ZPACE`}
                description="ZPACE - flexible space sharing platform"
              />
              <NavDivider />
              <Link
                href={`/profile/${user.id}`}
                passHref
                className="flex items-center space-x-2 transition hover:bg-link-bgHover hover:scale-110 hover:text-red-500 rounded p-1 text-lg text-link-normal "
              >
                <img
                  src={reduxUser.profileImg}
                  alt={`${reduxUser.username} profile image`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="hidden md:block">{reduxUser.username}</span>
              </Link>
              <NavDivider />
              <NavButton onClick={() => signOut()}>Logout</NavButton>
            </div>
            <div className="flex items-center">
              <ManageRooms />
            </div>
          </div>
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
