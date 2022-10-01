import { RoomImg } from "@prisma/client";
import { OneTimeTypes } from "./oneTimeTypes";
import { WeeklyTimeTypes } from "./weeklyTimeTypes";

export type RoomFormInputTypes = {
  step: number;
  spaceName: string;
  address: string;
  district: string;
  description: string;
  capacity: number;
  hourlyPrice: number;
  wifi: boolean;
  desk: boolean;
  socketPlug: boolean;
  airCondition: boolean;
  selectedFile: File | RoomImg[];
  weeklyTimeAvailability: WeeklyTimeTypes[];
  oneTimeAvailability: OneTimeTypes[];
};
