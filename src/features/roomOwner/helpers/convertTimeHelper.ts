import { OneTimeTypes } from "@/features/roomOwner/types/oneTimeTypes";
import { WeeklyTimeTypes } from "@/features/roomOwner/types/weeklyTimeTypes";

export const checkTimeWeek = (weeklyTimeSlot: WeeklyTimeTypes) => {
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

export const checkOneOffTime = (oneTimeSlot: OneTimeTypes) => {
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
