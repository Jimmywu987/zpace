import { WeekTimeSlot } from "@/features/room/components/WeekTimeSlot";
import { DayTimeSlot } from "@/features/room/components/DayTimeSlot";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useSelector } from "react-redux";
import React, { useState, Dispatch, SetStateAction } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";

import {
  BookingTimeslot,
  OneTimeOffOpenTimeslot,
  WeeklyOpenTimeslot,
} from "@prisma/client";
import { RoomInfoType } from "@/features/room/types";
import Stack from "@mui/material/Stack";
import { settingSelector } from "@/redux/setting";
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
  const { setting } = useSelector(settingSelector);

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

  return (
    <div>
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
      <div>
        {!pickedDate ? (
          <DayTimeSlot
            selectedDate={selectedDate}
            currentTime={currentTime}
            pickDayFun={pickDayFun}
            toSubmit={toSubmit}
            setToSubmit={setToSubmit}
            bookedTimeSlot={bookedTimeSlot}
            combinedTimeSlots={combinedTimeSlots}
            weekDays={weekDays}
          />
        ) : (
          <WeekTimeSlot
            currentTime={currentTime}
            pickDayFun={pickDayFun}
            toSubmit={toSubmit}
            setToSubmit={setToSubmit}
            bookedTimeSlot={bookedTimeSlot}
            combinedTimeSlots={combinedTimeSlots}
            weekDays={weekDays}
          />
        )}
      </div>
    </div>
  );
};
