import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { toStoreTimeSlot } from "@/redux/bookTimeSlot";
import { combinedTimeSlot } from "./DateBookingSection";
import CheckIcon from "@mui/icons-material/Check";
import dayjs, { Dayjs } from "dayjs";
import { d2 } from "@/helpers/d2";
import { timeSlotFun } from "../helpers";
import { capitalize } from "lodash";

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

type ChosenTime = {
  date: Date;
  hour: number;
  minute: number;
};

type State = {
  combinedTimeSlots: combinedTimeSlot[];
  chosen: ChosenTime[];
};

export const WeekTimeSlot = ({
  currentTime,
  bookedTimeSlot,
  combinedTimeSlots,
  weekDays,
  toSubmit,
  setToSubmit,
}: {
  currentTime: string;
  pickDayFun: (message: string) => void;
  toSubmit: boolean;
  setToSubmit: Dispatch<SetStateAction<boolean>>;
  bookedTimeSlot: combinedTimeSlot[];
  combinedTimeSlots: combinedTimeSlot[];
  weekDays: string[];
}) => {
  const timeSlotArr = timeSlotFun();
  const months: number[] = [];
  for (let i = 1; i <= 12; i++) {
    months.push(i);
  }
  const dispatch = useDispatch();
  const initState: State = {
    combinedTimeSlots: combinedTimeSlots,
    chosen: [],
  };

  const [state, setState] = useState(initState);
  const sunday = toLastSunday(dayjs(currentTime));

  useEffect(() => {
    const slotRequestSend = () => {
      const timeSlotArray = state.chosen.map((time) => {
        return {
          ...time,
          date: `${time.date.getFullYear()}-${
            time.date.getMonth() + 1
          }-${time.date.getDate()}`,
        };
      });
      dispatch(toStoreTimeSlot({ timeSlot: timeSlotArray }));
      // dispatch(push(`/booking-confirmation/${roomInfo[0].id}`));
    };
    if (toSubmit && state.chosen.length !== 0) {
      slotRequestSend();
    }
    return () => {
      setToSubmit(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toSubmit]);

  function getCellState(date: Date, hour: number, minute: number) {
    if (
      state.chosen.some((chosen) => {
        return (
          chosen.date.toDateString() === date.toDateString() &&
          chosen.hour === hour &&
          chosen.minute === minute
        );
      })
    ) {
      return (
        <div className="">
          <CheckIcon />
        </div>
      );
    }
    return " ";
  }
  function clickCell(
    date: Date,
    hour: number,
    minute: number,
    available: boolean,
    bookedTime: boolean
  ) {
    if (available && !bookedTime) {
      const chosenSlot = { date, hour, minute };
      if (
        state.chosen.some((e) => {
          return JSON.stringify(e) === JSON.stringify(chosenSlot);
        })
      ) {
        const filteredSlot = state.chosen.filter((e) => {
          return JSON.stringify(e) !== JSON.stringify(chosenSlot);
        });
        setState({
          ...state,
          chosen: filteredSlot,
        });
      } else {
        setState({
          ...state,
          chosen: [
            ...state.chosen,
            {
              date,
              hour,
              minute,
            },
          ],
        });
      }
    }
  }

  return (
    <div>
      {/* Calender header */}
      <div className="flex">
        <div className="border border-gray-600 w-14 flex justify-center py-1">
          Time
        </div>
        <div className="flex flex-1">
          {new Array(7).fill(0).map((_, i) => {
            const day = toNextWeekDay(sunday, i);
            return (
              <div
                className="flex items-center flex-1 justify-center border border-gray-600"
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
      <div className="flex flex-col">
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
                      className={`border-gray-800 border rounded-sm w-full h-full ${
                        !available || bookedTime ? "bg-gray-400" : "bg-white"
                      }`}
                      onClick={() =>
                        clickCell(date, h, m, available, bookedTime)
                      }
                    >
                      {getCellState(date, h, m)}
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
