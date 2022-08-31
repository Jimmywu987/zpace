import {  useSession } from "next-auth/react";
import { User } from "@/types/User";
import Metatags from "@/features/head/components/Metatags";
import timeSince from "@/helpers/timeSince";
import { getUserWithUserId } from "@/services/prisma"
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import PersonPinCircleRoundedIcon from "@mui/icons-material/PersonPinCircleRounded";
import GradeIcon from "@mui/icons-material/Grade";
import Reviews from "@/features/common/components/Reviews";
import { useState } from "react";


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
      user: {
        id: userDoc.id,
        username: userDoc.username,
        email: userDoc.email,
        profileImg: userDoc.profileImg,
        phoneNumber: userDoc.phoneNumber,
        description: userDoc.description,
        createdAt: timeSince(userDoc.createdAt),
      },
    },
  };
}

export default function UserProfilePage(userDoc: {
  user: {
    id: string;
    username: string;
    email: string;
    profileImg: string;
    phoneNumber: string;
    description: string;
    createdAt: Date;
  }[];
}) {

  const session = useSession();
  const isAuthenticated = session.status === "authenticated";
  const currentUser = session.data?.user as User;
  // Demo review data
  const reviews = [
    {
      host: "Rita",
      createdAt: "2022-08-16",
      comment:
        "The guests are very sweet and polite. I highly recommend them to everyone.",
      hostJoinDate: "2019-08-24",
    },
    {
      host: "James",
      createdAt: "2022-05-16",
      comment: "They are very friendly, tidy and clean",
      hostJoinDate: "2017-08-24",
    },
  ];
  const profile = userDoc.user;

  return (
    <>
      <Metatags title={`${profile.username} | ZPACE`} />
      <div className="m-auto flex mt-10">
        {/* Card */}
        <div className="card m-auto shadow bg-gray-300 w-2/5 h-full p-20 grid grid-cols-1 divide-y">
          <div id="image-box" className="flex flex-col items-center mb-5">
            <img
              className="w-20 h-20 rounded-full object-cover"
              src={profile.profileImg}
              alt="profileImg"
            />
            {currentUser?.id === profile.id &&
            <span className="mt-5 text-sm  underline hover:text-violet-400 cursor-pointer">
              Update photo
            </span> 
            }
          </div>

          <div className="badge flex flex-col text-center mb-5">
            <span className="mt-5 text-md font-bold flex items-center gap-2">
              <StarBorderRoundedIcon />
              Reviews
            </span>
            <span className="mt-5 text-md font-bold flex items-center gap-2">
              <VerifiedUserOutlinedIcon />
              Identity identified
            </span>
          </div>
          <div>
            <h1 className="my-5 text-xl font-bold">
              {" "}
              {profile.username} confirmed
            </h1>
            <ul className="list-none leading-loose mb-10">
              <li className="flex items-center gap-2">
                <DoneRoundedIcon />
                Identity
              </li>
              <li className="flex items-center gap-2">
                <DoneRoundedIcon />
                Email
              </li>
              <li className="flex items-center gap-2">
                <DoneRoundedIcon />
                Phone number
              </li>
            </ul>
            <span className="mt-10 text-sm">
              <span className="text-black font-bold hover:underline cursor-pointer">
                Learn more{" "}
              </span>
              about how confirming account info helps keep the Airbnb community
              secure.
            </span>
          </div>
        </div>
        {/* Bio */}
        <div className="mx-10 mb-5 w-full">
          <div>
            <p className="font-bold text-3xl my-5">Hi, I'm {profile.username}</p>
            <p className="mb-3 text-violet-500 text-sm">
              Joined {profile.createdAt} ago
            </p>
            {currentUser?.id === profile.id  &&
            <p className="mt-5 text-sm underline hover:text-violet-400 cursor-pointer">
              Edit profile
            </p>
            }

            <p className="font-bold text-2xl my-5">About</p>

            <p className="text-md my-5">
              {profile.description ? profile.description : "No decsription"}
            </p>

            <p className="text-md my-5 gap-2">
              <PersonPinCircleRoundedIcon /> Locates in Wan Chai, Hong Kong
            </p>
          </div>
          <hr className="border-violet-200 my-5" />
          <p className="my-5 text-md font-bold flex items-center gap-2">
            <GradeIcon />2 reviews
          </p>
          <span>
            {reviews.map((review, key) => (
              <Reviews
                key={key}
                host={review.host}
                createdAt={review.createdAt}
                comment={review.comment}
                hostJoinDate={review.hostJoinDate}
              />
            ))}
          </span>
        </div>
      </div>
    </>
  );
}
