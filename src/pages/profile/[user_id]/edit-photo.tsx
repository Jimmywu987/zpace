import { ProfileUser } from "@/types/ProfileUser";
import { User } from "@/types/User";
import { useSession } from "next-auth/react"
import { getUserWithUserId } from "@/services/prisma"
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Link from "next/link";


export async function getServerSideProps({ query } : {query: string}) {
  const  {user_id}  = query || "";
  const userDoc = await getUserWithUserId(user_id, true);
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  return {
    props: userDoc
  };
}

export default function EditUserPhoto(profile: ProfileUser) {
  const session = useSession();
  const user = session.data?.user as User;
  // console.log(profile)
  // if (user?.id !== profile.id) return {notFound: true};
  return (
    <main className="container">
      <nav className="my-5">
        <ol className="flex gap-2">
          <li>
            <Link href="/">Home</Link>
          </li>
          <ArrowRightIcon />
          <li>
            <Link
              href={{
                pathname: `/profile/${profile.id}`,
              }}
            >
              Profile
            </Link>
          </li>
          <ArrowRightIcon />
          <li>Profile Picture</li>
        </ol>
      </nav>
      <p>
        {user?.username}
        <img src={user?.profileImg} alt="currentProPic" />
      </p>
      This is edit user photo page
    </main>
  );
}