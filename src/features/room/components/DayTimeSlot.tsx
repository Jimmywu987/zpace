import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

import { useDispatch } from "react-redux";
import { Dayjs } from "dayjs";

import { combinedTimeSlot } from "./DateBookingSection";

import CheckIcon from "@mui/icons-material/Check";

import { d2 } from "@/helpers/d2";

import { toStoreTimeSlot } from "@/redux/bookTimeSlot";
import { timeSlotFun } from "@/features/room/helpers";
import { capitalize } from "lodash";

type ChosenTime = {
  date: Date;
  hour: number;
  minute: number;
};

type State = {
  combinedTimeSlots: combinedTimeSlot[];
  chosen: ChosenTime[];
};

export const DayTimeSlot = ({
  currentTime,
  combinedTimeSlots,
  bookedTimeSlot,
  weekDays,
  toSubmit,
  setToSubmit,
  pickDayFun,
  selectedDate,
}: {
  currentTime: string;
  pickDayFun: (message: string) => void;
  toSubmit: boolean;
  setToSubmit: Dispatch<SetStateAction<boolean>>;
  bookedTimeSlot: combinedTimeSlot[];
  combinedTimeSlots: combinedTimeSlot[];
  weekDays: string[];
  selectedDate: Dayjs;
}) => {
  const months: number[] = [];
  for (let i = 1; i <= 12; i++) {
    months.push(i);
  }
  const timeSlotArr = timeSlotFun();
  const dispatch = useDispatch();

  const [state, setState] = useState<State>({
    combinedTimeSlots: [],
    chosen: [],
  });

  // Material UI state

  useEffect(() => {
    setState((prev) => {
      return { ...prev, combinedTimeSlots: combinedTimeSlots };
    });
  }, [currentTime, combinedTimeSlots]);
  function getCellState(date: Date, hour: number, minute: number) {
    if (
      state.chosen.some(
        (chosen) =>
          chosen.date.toDateString() === date.toDateString() &&
          chosen.hour === hour &&
          chosen.minute === minute
      )
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
        state.chosen.some(
          (time) => JSON.stringify(time) === JSON.stringify(chosenSlot)
        )
      ) {
        const filteredSlot = state.chosen.filter(
          (time) => JSON.stringify(time) !== JSON.stringify(chosenSlot)
        );
        setState({
          ...state,
          chosen: filteredSlot,
        });
        return;
      }
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
    // eslint-disable-next-line eqeqeq
    if (toSubmit && state.chosen.length === 0) {
      pickDayFun("Please pick an available timeslot below");
    } else if (toSubmit && state.chosen.length !== 0) {
      pickDayFun("");
      slotRequestSend();
    }

    return () => {
      setToSubmit(false);
    };
  }, [toSubmit]);

  return (
    <div>
      {/* Calender header */}
      <div className="flex">
        <div className="flex flex-1 justify-center">Time</div>
        <div className="flex items-center flex-1 justify-center">
          <div>{capitalize(weekDays[selectedDate.day()])}</div>
          <div>
            ({selectedDate.date()}/{months[selectedDate.month()]})
          </div>
        </div>
      </div>
      {/* Calender content body */}
      <div className="">
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
            <div className="flex w-full" key={indx}>
              <div className="w-full h-auto border-gray-400 border flex justify-center items-center">
                {time}
              </div>
              <div
                className={`flex w-full ${
                  !available || bookedTime ? "bg-gray-400" : "bg-white"
                }`}
                onClick={() =>
                  clickCell(new Date(currentTime), h, m, available, bookedTime)
                }
              >
                {getCellState(new Date(currentTime), h, m)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
