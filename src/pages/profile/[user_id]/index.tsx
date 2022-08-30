import { useSession } from "next-auth/react";
import { User } from "@/types/User";
import { prisma } from "@/services/prisma";
import Metatags from "../../../../components/Metatags";

interface Profile {
  user: {
    id: string;
    username: string;
    email: string;
    profileImg: string;
    phoneNumber: string;
    description: string;
    createdAt: Date;
  }[];
}

export default function UserProfilePage({ user }: Profile) {
  const session = useSession();
  const currentUser = session.data?.user as User;
  const isAuthenticated = session.status === "authenticated";

  if (currentUser) {
    const isUser = currentUser.id === user.id;
  }

  if (!user) return { notFound: true };
  return (
    <>
      <Metatags title={`${user.username} | ZPACE`} />
      <main className="m-auto">
        <div className="card m-auto shadow bg-gray-300 w-3/5 p-20 flex flex-col items-center justify-center">
          <img
            className="w-20 h-20 rounded-full object-cover"
            src={user.profileImg}
            alt="profileImg"
          />
          <p className="m-10 text-2xl font-bold ">{user.username}</p>
          <p className=" text-red-500 ">Joined {user.createdAt} ago</p>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { user_id } = query;
  const user = await prisma.user.findFirst({
    where: {
      id: user_id,
    },
    select: {
      id: true,
      username: true,
      email: true,
      profileImg: true,
      phoneNumber: true,
      description: true,
      createdAt: true,
    },
  });

  // console.log(user)

  if (!user) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profileImg: user.profileImg,
        phoneNumber: user.phoneNumber,
        description: user.description,
        createdAt: timeSince(user.createdAt),
      },
    },
  };
}

function timeSince(date: Date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}
