import { ProfileUser } from "@/types/ProfileUser";
import { User } from "@/types/User";
import { useSession } from "next-auth/react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { useS3Upload } from "next-s3-upload";
import { useEffect, useState } from "react";
import Loader from "@/features/common/components/Loader";
import { getUserWithUserId } from "@/services/prisma";
import toast from "react-hot-toast";
import { updateProfileImg, updateUserSession } from "@/apis/api";
import MetaTags from "@/features/head/components/Metatags";
import { useRouter } from "next/router";

interface queryProps {
  query: {
    user_id: string;
  };
}

export async function getServerSideProps({ query }: queryProps) {
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

export default function EditUserPhoto(profile: ProfileUser) {
  const session = useSession();
  const user = session.data?.user as User;

  const { uploadToS3 } = useS3Upload();
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState("");
  const router = useRouter();

  const uploadFile = async (e: any) => {
    // Get file
    const file: any = Array.from(e.target.files)[0];

    let fileURL = "/default-profile-img.png";
    setUploading(true);
    if (file) {
      await uploadToS3(file).then((data) => {
        fileURL = data.url;
      });
<<<<<<< HEAD
      const res = await updateProfileImg(user.id, { profileImg: fileURL });
=======
      const res = await updateProfileImg(user.id, { imageUrl: fileURL });
>>>>>>> 75bc234bd299ca2aabb2e5337da138ef32377c2c

      if (res && res.status === 200) {
        await updateUserSession({
          profileImg: fileURL,
        });
        setDownloadURL(fileURL);
        setUploading(false);
        toast.success("Uploaded profile image successfully");
<<<<<<< HEAD
        router.reload();
      }
    }
  };

  const removeFile = async (e: any) => {
    // Get file
    // const file: any = Array.from(e.target.files)[0];
    setUploading(true);
    let fileURL = "/default-profile-img.png";
    const res = await updateProfileImg(user.id, { profileImg: fileURL });

    if (res && res.status === 200) {
      await updateUserSession({
        profileImg: fileURL,
      });
      setDownloadURL(fileURL);
      setUploading(false);
      toast.success("Remove profile image successfully");
      router.reload();
    }
  };


=======
      }
    }
  };
>>>>>>> 75bc234bd299ca2aabb2e5337da138ef32377c2c
  return (
    <>
      <MetaTags title={`${profile.username} | ZPACE`} />
      <main className="container">
        <nav className="my-5">
          <ol className="flex gap-2">
            <li className="transition-all ease-in-out hover:underline hover:text-violet-500">
              <Link href="/">Home</Link>
            </li>
            <ArrowRightIcon />
            <li className="transition-all ease-in-out hover:underline hover:text-violet-500">
              <Link
                href={{
                  pathname: `/profile/${profile.id}`,
                }}
              >
                Profile
              </Link>
            </li>
            <li className="hover:cursor-default">
              <ArrowRightIcon />
              Profile Picture
            </li>
          </ol>
        </nav>

        <p className="text-5xl font-bold text-violet-700"> Profile Picture</p>

        <div className="flex flex-col m-auto w-3/4 my-10 border-violet-300 border-2">
          <div className="bg-violet-100 p-3 border-violet-300 border-b-2">
            Profile photo
          </div>
          <div className="flex flex-col lg:flex-row p-3">
            <div className="w-full">
              <div
                id="image-container"
                className="relative flex justify-center items-center max-w-[15rem] m-auto "
              >
                <span className="absolute top-1 right-1 z-50 h-auto">
                  {profile?.profileImg !== "/default-profile-img.png" && (
                    <button
                      className="transition-all ease-in-out text-white bg-gray-500 hover:bg-gray-300"
                      onClick={removeFile}
                    >
                      <DeleteIcon className="text-md" />
                    </button>
                  )}
                </span>
                <span className="absolute z-30 opacity-30 h-full">
                  <img
                    className="h-full w-full"
                    src={downloadURL ? downloadURL : profile?.profileImg}
                    // alt="currentProPic"
                  />
                </span>
                <div className="image-cropper">
                  <img
                    src={downloadURL ? downloadURL : profile?.profileImg}
                    alt="currentProPic"
                  />
                </div>

                <span className="absolute z-40">
                  <Loader show={uploading} />
                </span>
              </div>
            </div>

            <div className="flex flex-col pl-10 pr-3 justify-center gap-4 leading-loose">
              <p>
                A profile photo that shows your face can help other hosts and
                guests get to know you. Zpace requires all hosts to have a
                profile photo. We don’t require guests to have a profile photo,
                but hosts can. If you’re a guest, even if a host requires you to
                have a photo, they won’t be able to see it until your booking is
                confirmed.
              </p>
              <input
                className="hidden"
                id="fileUpload"
                type="file"
                accept="image/x-png,image/jpeg"
                onChange={uploadFile}
              />

              <label
                className="w-full bg-white h-1/5 text-center text-sm  leading-6 lg:leading-10 rounded font-bold hover:bg-gray-100 py-auto border-violet-300 border-[1px] cursor-pointer"
                htmlFor="fileUpload"
              >
                Upload a file from your device
              </label>
              {/* <pre>{downloadURL ? downloadURL : null}</pre> */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

type QueryProps = {
  query: {
    user_id: string;
  };
};
