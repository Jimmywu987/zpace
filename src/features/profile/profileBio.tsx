import PersonPinCircleRoundedIcon from "@mui/icons-material/PersonPinCircleRounded";
import { ProfileUser } from "@/types/ProfileUser";
import { User } from "@/types/User";

export default function ProfileBio({
  currentUser,
  profile,
}: {
  currentUser: User;
  profile: ProfileUser;
}) {
  return (
    <>
        <p className="font-bold text-3xl my-5">Hi, I'm {profile.username}</p>
        <p className="mb-3 text-violet-500 text-sm">Joined {profile.createdAt} ago</p>
        {currentUser?.id === profile.id && (
          <p className="mt-5 text-sm underline hover:text-violet-400 cursor-pointer">
            Edit profile
          </p>
        )}

        <p className="font-bold text-2xl my-5">About</p>

        <p className="text-md my-5">
          {profile.description ? profile.description : "No decsription"}
        </p>

        <p className="text-md my-5 gap-2">
          <PersonPinCircleRoundedIcon /> Locates in Wan Chai, Hong Kong
        </p>
    </>
  );
}
