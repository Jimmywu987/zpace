import { SubmitButton } from "@/features/common/components/buttons/SubmitButton";
import { isLoading, loadingSelector } from "@/redux/loading";

import { useS3Upload } from "next-s3-upload";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { OneTimeTypes } from "@/features/roomOwner/types/oneTimeTypes";
import { WeeklyTimeTypes } from "@/features/roomOwner/types/weeklyTimeTypes";
export const FormButtons = () => {
  const { uploadToS3 } = useS3Upload();
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector(loadingSelector);
  const { handleSubmit, reset, formState, setValue, watch } = useFormContext();
  const checkTimeWeek = (weeklyTimeSlot: WeeklyTimeTypes) => {
    const {
      weekHalfDayOne,
      weekHalfDayTwo,
      weekStartHr,
      weekEndHr,
      weekEndMin,
      weekStartMin,
    } = weeklyTimeSlot;
    if (weekHalfDayOne === "A.M." && weekHalfDayTwo === "P.M.") {
      return true;
    } else if (weekHalfDayOne === "P.M." && weekHalfDayTwo === "A.M.") {
      return false;
    } else if (Number(weekStartHr) < Number(weekEndHr)) {
      return true;
    } else if (Number(weekStartHr) === 12) {
      return true;
    } else if (
      weekStartHr === weekEndHr &&
      Number(weekEndMin) > Number(weekStartMin)
    ) {
      return true;
    }
    return false;
  };
  const checkOneOffTime = (oneTimeSlot: OneTimeTypes) => {
    const {
      halfOneDayOne,
      halfOneDayTwo,
      oneOffStartHr,
      oneOffEndHr,
      oneOffEndMin,
      oneOffStartMin,
    } = oneTimeSlot;
    if (halfOneDayOne === "A.M." && halfOneDayTwo === "P.M.") {
      return true;
    } else if (halfOneDayOne === "P.M." && halfOneDayTwo === "A.M.") {
      return false;
    } else if (Number(oneOffStartHr) < Number(oneOffEndHr)) {
      return true;
    } else if (Number(oneOffStartHr) === 12) {
      return true;
    } else if (
      oneOffStartHr === oneOffEndHr &&
      Number(oneOffEndMin) > Number(oneOffStartMin)
    ) {
      return true;
    }
    return false;
  };
  const onSubmit = handleSubmit(async (data) => {
    dispatch(isLoading({ isLoading: true }));
    /**Store room info through backend */
    console.log("data", data);
    dispatch(isLoading({ isLoading: false }));
  });
  const goBack = () => {
    setValue("step", 0);
  };
  return (
    <div className="flex items-center space-x-3 justify-end">
      <button
        className="font-medium rounded hover:bg-gray-50 px-2 py-1"
        onClick={reset}
      >
        RESET FORM
      </button>
      <button
        className="font-medium rounded hover:bg-gray-50 px-2 py-1"
        onClick={goBack}
      >
        BACK
      </button>
      <SubmitButton onClick={onSubmit} className="px-3">
        NEXT
      </SubmitButton>
    </div>
  );
};
