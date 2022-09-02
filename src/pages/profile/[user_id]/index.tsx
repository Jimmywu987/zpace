import { useSession } from "next-auth/react";
import { User } from "@/types/User";
import Metatags from "@/features/head/components/Metatags";
import { getUserWithUserId } from "@/services/prisma"
import GradeIcon from "@mui/icons-material/Grade";
import Reviews from "@/features/profile/components/Reviews";
// import reviewsJSON from "@/data/reviews";
import blogsJSON from "@/data/blogs";
import ProfileCard from "@/features/profile/components/ProfileCard";
import ProfileBio from "@/features/profile/components/ProfileBio";
import { ProfileUser } from "@/types/ProfileUser";
// import { ReviewsType } from "@/types/ReviewsType";
import { GetServerSideProps } from "next";
import { useState } from "react";


export async function getServerSideProps({ query }: QueryProps) {
  const { user_id } = query;
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
  const profile = userDoc as ProfileUser;


  // Demo review data
  // const reviewsData = reviewsJSON.reviews as ReviewsType;
  const blogsData = blogsJSON.posts.slice(0,10) as BlogsType;

  return (
    <>
      <Metatags title={`${profile.username} | ZPACE`} />
      <div className="m-auto flex mt-10">
        <ProfileCard currentUser={currentUser} profile={profile} />
        <div className="mx-10 mb-5 w-full">
          <ProfileBio currentUser={currentUser} profile={profile} />

          <hr className="border-violet-200 my-5" />
          <p className="my-5 text-md font-bold flex items-center gap-2">
            <GradeIcon />
            {blogsData.length} reviews
          </p>
          <span>
            {blogsData.map((blog, key) => (
              <Reviews
                key={key}
                host={blog.author}
                createdAt={blog.date}
                comment={blog.excerpt}
                hostJoinDate={blog.date}
                image={blog.author}
              />
            ))}
          </span>
        </div>
      </div>
    </>
  );
}

type BlogsType = {
  id: string,
  author: string,
  title: string,
  excerpt: string,
  date: string,
  image: string,
  readingTimeMinutes: string,
  tags: string[],
}[]


type QueryProps = {
  query: {
    user_id: string;
  };
};
