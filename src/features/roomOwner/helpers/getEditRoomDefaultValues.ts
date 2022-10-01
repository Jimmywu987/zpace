import { RoomType } from "@/types/Room";
import { splitTime } from "@/features/roomOwner/helpers/splitTime";
const addZeroToTime = (time: string) => {
  return time.length === 1 ? `0${time}` : time;
};
export const editRoomDefaultValue = (room: RoomType) => {
  const {
    spaceName,
    address,
    description,
    district,
    hourlyPrice,
    capacity,
    wifi,
    desk,
    socketPlug,
    airCondition,
    roomImgs,
    oneTimeOffOpenTimeslots,
    weeklyOpenTimeslots,
  } = room;

  return {
    step: 0,
    spaceName,
    address,
    district,
    capacity,
    hourlyPrice,
    description,
    wifi,
    desk,
    socketPlug,
    airCondition,
    selectedFile: roomImgs,
    weeklyTimeAvailability: weeklyOpenTimeslots.map((slot) => {
      const {
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
        startTime,
        endTime,
      } = slot;
      const {
        halfDay: weekHalfDayOne,
        hr: weekStartHr,
        min: weekStartMin,
      } = splitTime(startTime);
      const {
        halfDay: weekHalfDayTwo,
        hr: weekEndHr,
        min: weekEndMin,
      } = splitTime(endTime);
      return {
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
        weekStartHr: addZeroToTime(weekStartHr),
        weekStartMin: addZeroToTime(weekStartMin),
        weekEndHr: addZeroToTime(weekEndHr),
        weekEndMin: addZeroToTime(weekEndMin),
        weekHalfDayOne,
        weekHalfDayTwo,
      };
    }),
    oneTimeAvailability: oneTimeOffOpenTimeslots.map((slot) => {
      const { date, startTime, endTime } = slot;
      const {
        halfDay: halfOneDayOne,
        hr: oneOffStartHr,
        min: oneOffStartMin,
      } = splitTime(startTime);
      const {
        halfDay: halfOneDayTwo,
        hr: oneOffEndHr,
        min: oneOffEndMin,
      } = splitTime(endTime);
      return {
        halfOneDayOne,
        halfOneDayTwo,
        oneOffStartHr: addZeroToTime(oneOffStartHr),
        oneOffStartMin: addZeroToTime(oneOffStartMin),
        oneOffEndHr: addZeroToTime(oneOffEndHr),
        oneOffEndMin: addZeroToTime(oneOffEndMin),
        oneOffDate: date,
      };
    }),
  };
};
