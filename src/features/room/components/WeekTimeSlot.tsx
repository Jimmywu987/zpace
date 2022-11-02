import { d2 } from "@/helpers/d2";
import CheckIcon from "@mui/icons-material/Check";
import dayjs, { Dayjs } from "dayjs";
import { capitalize } from "lodash";
import { timeSlotFun } from "../helpers";
import { combinedTimeSlot, State } from "./DateBookingSection";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const toLastSunday = (date: Dayjs) => {
  while (date.day() !== 0) {
    date = date.set("millisecond", date.millisecond() - DAY);
  }
  return date;
};

const toNextWeekDay = (sunday: Dayjs, weekDay: number) =>
  new Date(sunday.add(weekDay, "days").unix() * 1000);

export const WeekTimeSlot = ({
  currentTime,
  bookedTimeSlot,
  weekDays,
  clickCell,
  state,
}: {
  currentTime: string;
  state: State;
  clickCell: any;
  bookedTimeSlot: combinedTimeSlot[];
  combinedTimeSlots: combinedTimeSlot[];
  weekDays: string[];
}) => {
  const timeSlotArr = timeSlotFun();
  const months: number[] = [];
  for (let i = 1; i <= 12; i++) {
    months.push(i);
  }

  const sunday = toLastSunday(dayjs(currentTime));

  return (
    <div className="my-2">
      {/* Calender header */}
      <div className="flex ">
        <div className="w-12 md:w-14 flex justify-center py-1">Time</div>
        <div className="flex flex-1 ">
          {new Array(7).fill(0).map((_, i) => {
            const day = toNextWeekDay(sunday, i);
            return (
              <div
                className="flex flex-col md:flex-row items-center flex-1 justify-center text-sm md:text-base"
                key={`${Math.random()}_${i}`}
              >
                <div className="">{capitalize(weekDays[i].slice(0, 3))}</div>
                <div className="">
                  ({day.getDate()}/{months[day.getMonth()]})
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Calender Scroll body */}
      <div className="flex flex-col h-96 overflow-y-auto">
        {new Array(48).fill(0).map((_, indx) => {
          const h = Math.floor(indx / 2);
          const m = (indx % 2) * 30;
          const time = d2(h) + ":" + d2(m);
          return (
            <div
              className="flex items-center "
              key={`${Math.random()}_${indx}`}
            >
              <div className="border border-gray-600 w-14 flex justify-center  py-1">
                {time}
              </div>
              <div className="flex justify-center items-center flex-1 h-9">
                {new Array(7).fill(0).map((_, i) => {
                  const date = toNextWeekDay(sunday, i);
                  const available = state.combinedTimeSlots.some(
                    (dayTimeSlot) => {
                      const startTime = timeSlotArr.indexOf(dayTimeSlot.from);
                      const endTime = timeSlotArr.indexOf(dayTimeSlot.to) - 1;

                      if (dayTimeSlot.specificDate) {
                        return (
                          startTime <= indx &&
                          indx <= endTime &&
                          `${date.getFullYear()}-${
                            date.getMonth() + 1
                          }-${date.getDate()}` ===
                            `${new Date(
                              dayTimeSlot.specificDate
                            ).getFullYear()}-${
                              new Date(dayTimeSlot.specificDate).getMonth() + 1
                            }-${new Date(dayTimeSlot.specificDate).getDate()}`
                        );
                      }
                      return (
                        startTime <= indx &&
                        indx <= endTime &&
                        date.getDay() === dayTimeSlot.weekDay
                      );
                    }
                  );

                  const bookedTime = bookedTimeSlot.some((bookedTimeSlots) => {
                    const startTime = timeSlotArr.indexOf(bookedTimeSlots.from);
                    const endTime = timeSlotArr.indexOf(bookedTimeSlots.to);
                    return (
                      startTime <= indx &&
                      indx <= endTime &&
                      `${date.getFullYear()}-${
                        date.getMonth() + 1
                      }-${date.getDate()}` === bookedTimeSlots.bookedDate
                    );
                  });

                  return (
                    <div
                      key={`${Math.random()}_${i}`}
                      className={`flex flex-1 border justify-center items-center border-gray-500 h-9 rounded-sm ${
                        !available || bookedTime ? "bg-gray-400" : "bg-white"
                      }`}
                      onClick={() =>
                        clickCell({
                          date,
                          hour: h,
                          minute: m,
                          available,
                          bookedTime,
                        })
                      }
                    >
                      {state.chosen.some(
                        (chosen) =>
                          chosen.date.toDateString() === date.toDateString() &&
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
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
