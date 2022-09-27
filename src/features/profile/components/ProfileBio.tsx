import PersonPinCircleRoundedIcon from "@mui/icons-material/PersonPinCircleRounded";
import { ProfileUser } from "@/types/ProfileUser";
import { User } from "@/types/User";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FormTextInput } from "@/features/common/components/input/FormTextInput";
import ProfileEdit from "./ProfileEdit";
import { useRouter } from "next/router";

type ProfileBioPropsType = {
  currentUser: User;
  profile: ProfileUser;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
};

export default function ProfileBio({
  currentUser,
  profile,
  isEdit,
  setIsEdit,
}: ProfileBioPropsType) {
  const editProfile = currentUser?.id === profile.id && isEdit;
  const isUser = currentUser?.id === profile.id;

  return (
    <>
      <p className="font-bold text-3xl my-5">Hi, I'm {profile?.username}</p>
      <p className="mb-3 text-violet-500 text-sm">
        Joined {profile?.createdAt.toString()} ago
      </p>
      {isUser && (
        <>
          <div className="flex">
            <p
              className={`mt-5 text-sm underline flex-none  ${
                isEdit
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:text-violet-400 cursor-pointer"
              }`}
              onClick={() => setIsEdit(!isEdit)}
            >
              Edit profile
            </p>
          </div>
        </>
      )}
      {editProfile && <ProfileEdit setIsEdit={setIsEdit} description={profile.description}/>}

      {!editProfile && (
        <>
          <p className="font-bold text-2xl my-5">About</p>
          <p className="text-md my-5">
            {profile.description ? profile.description : "No decsription"}
          </p>
          <p className="text-md my-5 gap-2">
            <PersonPinCircleRoundedIcon /> Locates in Wan Chai, Hong Kong
          </p>
        </>
      )}
    </>
  );
}
