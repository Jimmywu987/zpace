import React, { Dispatch, SetStateAction } from "react";
import { WeekTimeSlot } from "@/features/room/components/WeekTimeSlot";
import { DayTimeSlot } from "@/features/room/components/DayTimeSlot";

import {
  BookingTimeslot,
  OneTimeOffOpenTimeslot,
  WeeklyOpenTimeslot,
} from "@prisma/client";
import { RoomInfoType } from "@/features/room/types";

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
  const bookedTimeSlots: BookingTimeslot[] = [];
  customerBookingTimeslots.map((each) => {
    bookedTimeSlots.concat(each.bookingTimeslots);
  });

  const weeklyAvailable = expandWeeklyTimeSlots(weeklyOpenTimeslots);
  const oneTimeOffAvailable = expandOneOffTimeSlots(oneTimeOffOpenTimeslots);
  const bookedTimeSlot = expandBookedTimeSlots(bookedTimeSlots);
  const combinedTimeSlots = weeklyAvailable.concat(oneTimeOffAvailable);

  if (!pickedDate) {
    return (
      <div>
        <DayTimeSlot
          pickDayFun={pickDayFun}
          toSubmit={toSubmit}
          setToSubmit={setToSubmit}
          bookedTimeSlot={bookedTimeSlot}
          combinedTimeSlots={combinedTimeSlots}
          weekDays={weekDays}
        />
      </div>
    );
  }

  return (
    <div>
      {/* <WeekTimeSlot
        pickDayFun={pickDayFun}
        toSubmit={toSubmit}
        setToSubmit={setToSubmit}
        bookedTimeSlot={bookedTimeSlot}
        combinedTimeSlots={combinedTimeSlots}
        roomInfo={roomInfo}
        weekDays={weekDays}
      /> */}
    </div>
  );
};
