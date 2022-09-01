import {  useSession } from "next-auth/react";
import { User } from "@/types/User";
import Metatags from "@/features/head/components/Metatags";
import timeSince from "@/helpers/timeSince";
import { getUserWithUserId } from "@/services/prisma"
import GradeIcon from "@mui/icons-material/Grade";
import Reviews from "@/features/common/components/Reviews";
import reviewsJSON from "@/data/reviews";
import ProfileCard from "@/features/profile/profileCard";
import ProfileBio from "@/features/profile/profileBio";
import { ProfileUser } from "@/types/ProfileUser";
import { ReviewsType } from "@/types/ReviewsType";


export async function getServerSideProps({ query }: { query: string }) {
  const {user_id} = query;
  const userDoc = await getUserWithUserId(user_id, true);
  if (!userDoc) {
    return {
      notFound: true,
    };
  }
  return {
    props: userDoc,
  };
}

export default function ProfilePage(userDoc: ProfileUser
) {

  const session = useSession();
  const isAuthenticated = session.status === "authenticated";
  const currentUser = session.data?.user as User;
  // Demo review data
  const reviewsData = reviewsJSON.reviews as ReviewsType;
  const profile = userDoc as ProfileUser;

  return (
    <>
      <Metatags title={`${profile.username} | ZPACE`} />
      <div className="m-auto flex mt-10">
        <ProfileCard currentUser={currentUser} profile={profile} />
        <div className="mx-10 mb-5 w-full">
          <ProfileBio currentUser={currentUser} profile={profile} />

          <hr className="border-violet-200 my-5" />
          <p className="my-5 text-md font-bold flex items-center gap-2">
            <GradeIcon />2 reviews
          </p>
          <span>
            {reviewsData.map((review, key) => (
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
