import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { ProfileUser } from "@/types/ProfileUser";
import { User } from "@/types/User";
import Link from "next/link";

export default function ProfileCard({
  currentUser,
  profile,
}: {
  currentUser: User;
  profile: ProfileUser;
}) {
  return (
    <>
      <div className="card m-auto shadow bg-gray-300 w-2/5 h-full p-20 grid grid-cols-1 divide-y">
        <div id="image-box" className="flex flex-col items-center mb-5">
          <img
            className="w-20 h-20 rounded-full object-cover"
            src={profile.profileImg}
            alt="profileImg"
          />
          {currentUser?.id === profile.id && (
            <Link href={`${profile.id}/edit-photo`}>
              <span className="mt-5 text-sm  underline hover:text-violet-400 cursor-pointer">
                Update photo
              </span>
            </Link>
          )}
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
    </>
  );
}
