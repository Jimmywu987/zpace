import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

import { useDispatch, useSelector } from "react-redux";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { combinedTimeSlot } from "./DateBookingSection";

import CheckIcon from "@mui/icons-material/Check";
import { TimezoneDate } from "timezone-date.ts";

import { d2 } from "@/helpers/d2";

import { settingSelector } from "@/redux/setting";
import { toStoreTimeSlot } from "@/redux/bookTimeSlot";
import { timeSlotFun } from "@/features/room/helpers";

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
  combinedTimeSlots,
  bookedTimeSlot,
  weekDays,
  toSubmit,
  setToSubmit,
  pickDayFun,
}: {
  pickDayFun: (message: string) => void;
  toSubmit: boolean;
  setToSubmit: Dispatch<SetStateAction<boolean>>;
  bookedTimeSlot: combinedTimeSlot[];
  combinedTimeSlots: combinedTimeSlot[];
  weekDays: string[];
}) => {
  const months: number[] = [];
  for (let i = 1; i <= 12; i++) {
    months.push(i);
  }
  const timeSlotArr = timeSlotFun();
  const dispatch = useDispatch();

  const d = TimezoneDate.fromDate(new Date());
  d.timezone = +8;
  const { setting } = useSelector(settingSelector);

  const [currentTime, setCurrentTime] = useState(setting.date);
  const [state, setState] = useState<State>({
    combinedTimeSlots: [],
    chosen: [],
  });

  // Material UI state
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(setting.date)
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setCurrentTime(
      `${date?.getFullYear()}-${
        date ? date.getMonth() + 1 : 1
      }-${date?.getDate()}`
    );
  };

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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <DateTimePicker
            label="Select a date"
            value={selectedDate}
            minDate={d}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
      <div>
        <div>
          {/* Calender header */}
          <div className="">
            <div className="">Time</div>
            <div className="">
              <div>{weekDays[new Date(currentTime).getDay()]}</div>
              <div>
                ({new Date(currentTime).getDate()}/
                {months[new Date(currentTime).getMonth()]})
              </div>
            </div>
          </div>
          {/* Calender content body */}
          <div className="">
            {new Array(48).fill(0).map((_, indx) => {
              const h = Math.floor(indx / 2);
              const m = (indx % 2) * 30;
              const time = d2(h) + ":" + d2(m);
              return (
                <div className="" key={indx}>
                  <div className="">{time}</div>
                  <div className="">
                    {new Array(1).fill(0).map((_, i) => {
                      const available = state.combinedTimeSlots.some(
                        (dayTimeSlot) => {
                          const startTime = timeSlotArr.indexOf(
                            dayTimeSlot.from
                          );
                          const endTime =
                            timeSlotArr.indexOf(dayTimeSlot.to) - 1;

                          if (dayTimeSlot.specificDate) {
                            return (
                              startTime <= indx &&
                              indx <= endTime &&
                              `${new Date(currentTime).getFullYear()}-${
                                new Date(currentTime).getMonth() + 1
                              }-${new Date(currentTime).getDate()}` ===
                                `${new Date(
                                  dayTimeSlot.specificDate
                                ).getFullYear()}-${
                                  new Date(
                                    dayTimeSlot.specificDate
                                  ).getMonth() + 1
                                }-${new Date(
                                  dayTimeSlot.specificDate
                                ).getDate()}`
                            );
                          }
                          return (
                            startTime <= indx &&
                            indx <= endTime &&
                            new Date(currentTime).getDay() ===
                              dayTimeSlot.weekDay
                          );
                        }
                      );
                      const bookedTime = bookedTimeSlot.some(
                        (bookedTimeSlot: any) => {
                          const startTime = timeSlotArr.indexOf(
                            bookedTimeSlot.from
                          );
                          const endTime = timeSlotArr.indexOf(
                            bookedTimeSlot.to
                          );
                          return (
                            startTime <= indx &&
                            indx <= endTime &&
                            `${new Date(currentTime).getFullYear()}-${
                              new Date(currentTime).getMonth() + 1
                            }-${new Date(currentTime).getDate()}` ===
                              bookedTimeSlot.bookedDate
                          );
                        }
                      );
                      let availableBlock;
                      if (!available || bookedTime) {
                        availableBlock = {
                          backgroundColor: "grey",
                        };
                      } else {
                        availableBlock = {
                          backgroundColor: "white",
                        };
                      }
                      return (
                        <div
                          style={availableBlock}
                          key={`${Math.random()}_${i}`}
                          className=""
                          onClick={() =>
                            clickCell(
                              new Date(currentTime),
                              h,
                              m,
                              available,
                              bookedTime
                            )
                          }
                        >
                          {getCellState(new Date(currentTime), h, m)}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
