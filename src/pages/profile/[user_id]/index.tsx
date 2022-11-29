import { useSession } from "next-auth/react";
import { User } from "@/types/User";
import Metatags from "@/features/head/components/Metatags";
import { getUserWithUserId } from "@/services/prisma";
import GradeIcon from "@mui/icons-material/Grade";
import Reviews from "@/features/profile/components/Reviews";
import blogsJSON from "@/data/blogs.json";
import ProfileCard from "@/features/profile/components/ProfileCard";
import ProfileBio from "@/features/profile/components/ProfileBio";
import { ProfileUser } from "@/types/ProfileUser";
import { GetServerSideProps } from "next";
import { useState } from "react";

export async function getServerSideProps({
  query,
}: {
  query: { user_id: string };
}) {
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

export default function ProfilePage(userDoc: ProfileUser) {
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";
  const currentUser = session.data?.user as User;
  const profile = userDoc as ProfileUser;
  console.log(profile)

  // Demo review data
  // const reviewsData = reviewsJSON.reviews as ReviewsType;
  const blogsData = blogsJSON.posts.slice(0,9);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      <Metatags title={`${profile.username} | ZPACE`} />
      <div className="m-auto flex mt-10">
        <ProfileCard currentUser={currentUser} profile={profile} />

        <div className="mx-10 mb-5 w-full">
          <ProfileBio
            currentUser={currentUser}
            profile={profile}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
 
          <hr className="border-violet-200 my-5" />
          <p className="my-5 text-md font-bold flex items-center gap-2">
            <GradeIcon />
            {blogsData.length} reviews
          </p>
          <section className="min-h-[200px] space-y-10 min-h-[40vh]">
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
          </section>
        </div>
      </div>
    </>
  );
}


type QueryProps = {
  query: {
    user_id: string;
  };
};
