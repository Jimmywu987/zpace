import { SubmitButton } from "@/features/common/components/buttons/SubmitButton";
import { isLoading, loadingSelector } from "@/redux/loading";

import { useS3Upload } from "next-s3-upload";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { deleteFile } from "@/lib/s3Uploader";

import { editRoom } from "@/apis/api";
import { useSession } from "next-auth/react";
import { RoomImg, User } from "@prisma/client";
import toast from "react-hot-toast";
import {
  checkOneOffTime,
  checkTimeWeek,
} from "@/features/roomOwner/helpers/convertTimeHelper";
import { EditRoomFormInputTypes } from "@/features/roomOwner/types/editRoomFormInputTypes";

export const EditRoomFormButton = ({ deleteImg }: { deleteImg: RoomImg[] }) => {
  const { uploadToS3 } = useS3Upload();
  const router = useRouter();
  const dispatch = useDispatch();
  const session = useSession();
  const user = session.data?.user as User;
  const { loading } = useSelector(loadingSelector);
  const { handleSubmit, formState, setValue } =
    useFormContext<EditRoomFormInputTypes>();

  const onSubmit = handleSubmit(async (data) => {
    dispatch(isLoading({ isLoading: true }));
    /**Store room info through backend */
    const { oneTimeAvailability, weeklyTimeAvailability } = data;
    if (
      !(
        (!oneTimeAvailability.some((oneTime) =>
          Object.values(oneTime).includes("")
        ) &&
          !weeklyTimeAvailability.some((weekly) =>
            Object.values(weekly).includes("")
          ) &&
          oneTimeAvailability.length > 0) ||
        weeklyTimeAvailability.length > 0
      )
    ) {
      dispatch(isLoading({ isLoading: false }));

      return;
    }
    const checkWhichIsLonger =
      weeklyTimeAvailability.length <= oneTimeAvailability.length;
    const checkTimeIfCorrect = [];
    for (
      let i = 0;
      i < Math.max(weeklyTimeAvailability.length, oneTimeAvailability.length);
      i++
    ) {
      checkTimeIfCorrect.push(
        checkWhichIsLonger
          ? checkOneOffTime(oneTimeAvailability[i])
          : checkTimeWeek(weeklyTimeAvailability[i])
      );
      if (
        i <
        (checkWhichIsLonger
          ? weeklyTimeAvailability.length
          : oneTimeAvailability.length)
      ) {
        checkTimeIfCorrect.push(
          checkWhichIsLonger
            ? checkTimeWeek(weeklyTimeAvailability[i])
            : checkOneOffTime(oneTimeAvailability[i])
        );
      }
    }
    if (checkTimeIfCorrect.some((result) => !result)) {
      dispatch(isLoading({ isLoading: false }));

      return;
    }

    const { selectedFile, step, uploadedFile, ...storeData } = data;
    if (selectedFile.length === 0 && uploadedFile.length === 0) {
      dispatch(isLoading({ isLoading: false }));

      return;
    }
    const roomUrls = [];
    for (let i = 0; i < selectedFile.length; i++) {
      const { url } = await uploadToS3(selectedFile[i]);
      roomUrls.push(url);
    }
    const res = await editRoom({
      ...storeData,
      deleteImg: deleteImg.map((file) => file.id),
      roomUrls,
    });
    if (res && res.status === 201) {
      dispatch(isLoading({ isLoading: false }));

      deleteImg.map(async (img) => await deleteFile(img.url));
      toast.success("Edit room successfully");
      router.push(`/room-owner/${user.id}`);
      return;
    }
    toast.error("Something went wrong, please try again");
  });
  const goBack = () => {
    setValue("step", 0);
  };
  return (
    <div className="flex items-center space-x-3 justify-end">
      <button
        className="font-medium rounded hover:bg-gray-50 px-2 py-1"
        onClick={goBack}
      >
        BACK
      </button>
      <SubmitButton onClick={onSubmit} className="px-3" disabled={loading}>
        Submit
      </SubmitButton>
    </div>
  );
};
