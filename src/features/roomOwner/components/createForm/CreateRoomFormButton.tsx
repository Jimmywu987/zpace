import { SubmitButton } from "@/features/common/components/buttons/SubmitButton";
import { isLoading, loadingSelector } from "@/redux/loading";
import { CreateRoomFormInputTypes } from "@/features/roomOwner/types/createRoomFormInputTypes";
import { useS3Upload } from "next-s3-upload";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { createRoom } from "@/apis/api";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
import toast from "react-hot-toast";
import {
  checkOneOffTime,
  checkTimeWeek,
} from "@/features/roomOwner/helpers/convertTimeHelper";

export const CreateRoomFormButton = () => {
  const { uploadToS3 } = useS3Upload();
  const router = useRouter();
  const dispatch = useDispatch();
  const session = useSession();
  const user = session.data?.user as User;
  const { loading } = useSelector(loadingSelector);
  const { handleSubmit, reset, formState, setValue, watch } =
    useFormContext<CreateRoomFormInputTypes>();

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
      return;
    }
    const { address, district } = data;
    const latAndLngJSON = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}+${district}+hong+kong&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    );
    const latAndLng = await latAndLngJSON.json();

    let latitude;
    let longitude;
    if (latAndLng.results[0]) {
      latitude = latAndLng.results[0].geometry.location.lat.toString() || null;
      longitude = latAndLng.results[0].geometry.location.lng.toString() || null;
    } else {
      latitude = null;
      longitude = null;
    }
    const { selectedFile, step, ...storeData } = data;
    const roomUrls = [];
    for (let i = 0; i < selectedFile.length; i++) {
      const { url } = await uploadToS3(selectedFile[i]);
      roomUrls.push(url);
    }
    const res = await createRoom({
      ...storeData,
      latitude,
      longitude,
      roomUrls,
    });
    if (res && res.status === 201) {
      dispatch(isLoading({ isLoading: false }));
      toast.success("Created room successfully");
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
        onClick={() => reset()}
      >
        RESET FORM
      </button>
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
