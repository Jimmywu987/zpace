import { WeeklyOpenTimeslot } from "@prisma/client";
import { capitalize } from "lodash";
import moment from "moment";
import React from "react";
import { ThemeTag } from "./ThemeTag";

type Props = {
  weeklyTimeSlots: WeeklyOpenTimeslot[];
};

const EMPTY_SLOT = " / ";
type weekType = {
  sunday: string | JSX.Element;
  monday: string | JSX.Element;
  tuesday: string | JSX.Element;
  wednesday: string | JSX.Element;
  thursday: string | JSX.Element;
  friday: string | JSX.Element;
  saturday: string | JSX.Element;
};
const WEEK = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
export const WeeklyTimeSlotDisplay = ({ weeklyTimeSlots }: Props) => {
  const timeSlot = {} as weekType;
  weeklyTimeSlots.map((time) => {
    const slot = `${moment(time.startTime, "HH:mm:ss").format("LT")} -
    ${moment(time.endTime, "HH:mm:ss").format("LT")}`;
    WEEK.map((day) => {
      const availableDay = time[day as keyof WeeklyOpenTimeslot];
      if (!availableDay) {
        return;
      }
      const currentTimeDisplay = timeSlot[day as keyof weekType];
      if (currentTimeDisplay) {
        timeSlot[day as keyof weekType] = (
          <>
            <ThemeTag>{currentTimeDisplay}</ThemeTag>
            <ThemeTag>{slot}</ThemeTag>
          </>
        );
      } else {
        timeSlot[day as keyof weekType] = <ThemeTag>{slot}</ThemeTag>;
      }
    });
  });
  return (
    <div className="space-y-2">
      {WEEK.map((day, index) => {
        const time = timeSlot[day as keyof weekType];
        return (
          <div key={index} className="space-x-2">
            <span className="text-gray-700">{capitalize(day)}:</span>{" "}
            {time ?? EMPTY_SLOT}
          </div>
        );
      })}
    </div>
  );
};
