import { Dayjs } from "dayjs";

import { combinedTimeSlot, State } from "./DateBookingSection";

import CheckIcon from "@mui/icons-material/Check";

import { d2 } from "@/helpers/d2";

import { timeSlotFun } from "@/features/room/helpers";
import { capitalize } from "lodash";

export const DayTimeSlot = ({
  currentTime,
  bookedTimeSlot,
  weekDays,
  clickCell,
  state,
  selectedDate,
}: {
  currentTime: string;
  state: State;
  clickCell: any;
  bookedTimeSlot: combinedTimeSlot[];
  weekDays: string[];
  selectedDate: Dayjs;
}) => {
  const months: number[] = [];
  for (let i = 1; i <= 12; i++) {
    months.push(i);
  }
  const timeSlotArr = timeSlotFun();

  return (
    <div className="my-2">
      {/* Calender header */}
      <div className="flex">
        <div className="flex flex-1 justify-center py-1">Time</div>
        <div className="flex items-center flex-1 justify-center">
          <div>{capitalize(weekDays[selectedDate.day()])}</div>
          <div>
            ({selectedDate.date()}/{months[selectedDate.month()]})
          </div>
        </div>
      </div>
      {/* Calender content body */}
      <div className="h-96 overflow-y-auto">
        {new Array(48).fill(0).map((_, indx) => {
          const h = Math.floor(indx / 2);
          const m = (indx % 2) * 30;
          const time = d2(h) + ":" + d2(m);
          const available = state.combinedTimeSlots.some((dayTimeSlot) => {
            const startTime = timeSlotArr.indexOf(dayTimeSlot.from);
            const endTime = timeSlotArr.indexOf(dayTimeSlot.to) - 1;

            if (dayTimeSlot.specificDate) {
              return (
                startTime <= indx &&
                indx <= endTime &&
                `${new Date(currentTime).getFullYear()}-${
                  new Date(currentTime).getMonth() + 1
                }-${new Date(currentTime).getDate()}` ===
                  `${new Date(dayTimeSlot.specificDate).getFullYear()}-${
                    new Date(dayTimeSlot.specificDate).getMonth() + 1
                  }-${new Date(dayTimeSlot.specificDate).getDate()}`
              );
            }
            return (
              startTime <= indx &&
              indx <= endTime &&
              new Date(currentTime).getDay() === dayTimeSlot.weekDay
            );
          });
          const bookedTime = bookedTimeSlot.some((bookedTimeSlot) => {
            const startTime = timeSlotArr.indexOf(bookedTimeSlot.from);
            const endTime = timeSlotArr.indexOf(bookedTimeSlot.to);
            return (
              startTime <= indx &&
              indx <= endTime &&
              `${new Date(currentTime).getFullYear()}-${
                new Date(currentTime).getMonth() + 1
              }-${new Date(currentTime).getDate()}` ===
                bookedTimeSlot.bookedDate
            );
          });

          return (
            <div className="flex flex-1" key={indx}>
              <div className=" flex-1 h-auto border border-gray-500 flex justify-center items-center">
                {time}
              </div>
              <div
                className={`flex flex-1 border justify-center items-center border-gray-500 h-7 ${
                  !available || bookedTime ? "bg-gray-400" : "bg-white"
                }`}
                onClick={() =>
                  clickCell({
                    date: new Date(currentTime),
                    hour: h,
                    minute: m,
                    available,
                    bookedTime,
                  })
                }
              >
                {state.chosen.some(
                  (chosen) =>
                    chosen.date.toDateString() ===
                      new Date(currentTime).toDateString() &&
                    chosen.hour === h &&
                    chosen.minute === m
                ) ? (
                  <div className="w-full h-full bg-green-400 flex justify-center items-center">
                    <CheckIcon className="text-white " />
                  </div>
                ) : (
                  " "
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
