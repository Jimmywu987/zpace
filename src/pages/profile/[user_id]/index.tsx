import { useSession } from "next-auth/react";
import { User } from "@/types/User";
import Metatags from "../../../../components/Metatags";
import timeSince from "@/helpers/timeSince";
import { getUserWithUserId } from "@/helpers/getUserWithUserId";

// interface Profile {
//   user: {
//     id: string;
//     username: string;
//     email: string;
//     profileImg: string;
//     phoneNumber: string;
//     description: string;
//     createdAt: Date;
//   }[];
// }

export async function getServerSideProps({ query }) {
  const { user_id } = query;
  const userDoc = await getUserWithUserId(user_id);
  if (!userDoc) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      user:{
        id: userDoc.id,
        username: userDoc.username,
        email: userDoc.email,
        profileImg: userDoc.profileImg,
        phoneNumber: userDoc.phoneNumber,
        description: userDoc.description,
        createdAt: timeSince(userDoc.createdAt)
      }
    },
  };
}


export default function UserProfilePage(userDoc) {

  const user = userDoc.user;


  return (
    <>
      <Metatags title={`${user.username} | ZPACE`} />
      <div className="m-auto flex mt-10">
        {/* Card */}
        <div className="card m-auto shadow bg-gray-300 w-2/5 h-full p-20 flex flex-col items-center justify-center">
          <img
            className="w-20 h-20 rounded-full object-cover"
            src={user.profileImg}
            alt="profileImg"
          />
          <a className="mt-5 text-sm text-violet-500">Update photo</a>
          <div className="badge flex flex-col">
            <span className="mt-5 text-lg ">
              Reviews
            </span>
            <span className="mt-5 text-lg  ">Identity identified</span>
          </div>
        </div>

        <div className="w-3/5 p-20 font-extrabold h-full">
          <h1>Hi, I'm {user.username}</h1>
          <p className=" text-violet-500 ">Joined {user.createdAt} ago</p>
        </div>
      </div>
    </>
  );
}

// export async function getServerSideProps({ query }) {
//   // const session = useSession();
//   // const currentUser = session.data?.user as User;
//   // const isAuthenticated = session.status === "authenticated";

//   const { user_id } = query;

// }
