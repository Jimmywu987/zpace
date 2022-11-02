import { WeekTimeSlot } from "@/features/room/components/WeekTimeSlot";
import { DayTimeSlot } from "@/features/room/components/DayTimeSlot";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import {
  BookingTimeslot,
  OneTimeOffOpenTimeslot,
  WeeklyOpenTimeslot,
} from "@prisma/client";
import { RoomInfoType } from "@/features/room/types";
import Stack from "@mui/material/Stack";
import { settingSelector } from "@/redux/setting";
import { toStoreTimeSlot } from "@/redux/bookTimeSlot";
const weekDays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export type combinedTimeSlot = {
  from: string; // hh:mm
  to: string; // hh:mm
  weekDay?: number; // 0..7
  specificDate?: string;
  bookedDate?: string;
};

// Functional features
type ChosenTime = {
  date: Date;
  hour: number;
  minute: number;
};

export type State = {
  combinedTimeSlots: combinedTimeSlot[];
  chosen: ChosenTime[];
};
const expandWeeklyTimeSlots = (
  ob: WeeklyOpenTimeslot[]
): combinedTimeSlot[] => {
  const weekArray = [];
  for (let i = 0; i < ob.length; i++) {
    const timeSlots = ob[i];
    for (const [key, value] of Object.entries(timeSlots)) {
      if (value) {
        const weekDay = weekDays.indexOf(key);
        weekArray.push({
          weekDay,
          from: timeSlots.startTime.slice(0, 5),
          to: timeSlots.endTime.slice(0, 5),
        });
      }
    }
  }
  return weekArray;
};
const expandOneOffTimeSlots = (
  ob: OneTimeOffOpenTimeslot[]
): combinedTimeSlot[] => {
  return ob.map((timeSlots) => {
    return {
      specificDate: timeSlots.date,
      from: timeSlots.startTime.slice(0, 5),
      to: timeSlots.endTime.slice(0, 5),
    };
  });
};
const expandBookedTimeSlots = (ob: BookingTimeslot[]): combinedTimeSlot[] => {
  return ob.map((each) => {
    return {
      bookedDate: `${new Date(each.date).getFullYear()}-${
        new Date(each.date).getMonth() + 1
      }-${new Date(each.date).getDate()}`,
      from: each.startTime.slice(0, 5),
      to: each.endTime.slice(0, 5),
    };
  });
};
export const DateBookingSection = ({
  roomInfo,
  pickedDate,
  toSubmit,
  setToSubmit,
  pickDayFun,
}: {
  roomInfo: RoomInfoType;
  pickedDate: boolean;
  toSubmit: boolean;
  setToSubmit: Dispatch<SetStateAction<boolean>>;
  pickDayFun: (message: string) => void;
}) => {
  const {
    oneTimeOffOpenTimeslots,
    customerBookingTimeslots,
    weeklyOpenTimeslots,
  } = roomInfo;
  const router = useRouter();
  const { setting } = useSelector(settingSelector);
  const dispatch = useDispatch();

  const bookedTimeSlots: BookingTimeslot[] = [];
  customerBookingTimeslots.map((each) => {
    bookedTimeSlots.concat(each.bookingTimeslots);
  });
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs(setting.date));
  const [currentTime, setCurrentTime] = useState(setting.date);

  const handleDateChange = (date: Dayjs | null) => {
    if (!date) {
      return;
    }

    const getDate = `${date.month()}-${
      date.year() ? date.month() + 1 : 1
    }-${date.date()}`;
    setSelectedDate(date);
    setCurrentTime(getDate);
  };

  const weeklyAvailable = expandWeeklyTimeSlots(weeklyOpenTimeslots);
  const oneTimeOffAvailable = expandOneOffTimeSlots(oneTimeOffOpenTimeslots);
  const bookedTimeSlot = expandBookedTimeSlots(bookedTimeSlots);
  const combinedTimeSlots = weeklyAvailable.concat(oneTimeOffAvailable);
  const [state, setState] = useState<State>({
    combinedTimeSlots: combinedTimeSlots,
    chosen: [],
  });

  // Material UI state

  function clickCell({
    date,
    hour,
    minute,
    available,
    bookedTime,
  }: {
    date: Date;
    hour: number;
    minute: number;
    available: boolean;
    bookedTime: boolean;
  }) {
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
      router.push(`/booking-confirmation/${roomInfo.id}`);
    };

    if (toSubmit && state.chosen.length === 0) {
      pickDayFun("Please pick an available time-slot below");
    } else if (toSubmit && state.chosen.length !== 0) {
      pickDayFun("");
      slotRequestSend();
    }

    return () => {
      setToSubmit(false);
    };
  }, [toSubmit]);
  useEffect(() => {
    setState({
      combinedTimeSlots: combinedTimeSlots,
      chosen: [],
    });
  }, [pickedDate]);
  return (
    <div>
      <div className="flex justify-center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3}>
            <DesktopDatePicker
              label="Select a date"
              value={selectedDate}
              minDate={dayjs(new Date())}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
      </div>
      <div className="">
        {!pickedDate ? (
          <DayTimeSlot
            state={state}
            selectedDate={selectedDate}
            currentTime={currentTime}
            clickCell={clickCell}
            bookedTimeSlot={bookedTimeSlot}
            weekDays={weekDays}
          />
        ) : (
          <WeekTimeSlot
            state={state}
            currentTime={currentTime}
            clickCell={clickCell}
            bookedTimeSlot={bookedTimeSlot}
            combinedTimeSlots={combinedTimeSlots}
            weekDays={weekDays}
          />
        )}
      </div>
    </div>
  );
};
