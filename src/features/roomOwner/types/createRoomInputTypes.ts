import { OneTimeTypes } from "./oneTimeTypes";
import { WeeklyTimeTypes } from "./weeklyTimeTypes";

export type CreateRoomInputTypes = {
  step: number;
  spaceName: string;
  address: string;
  district: string;
  capacity: number;
  hourlyPrice: number;
  wifi: boolean;
  desk: boolean;
  socketPlug: boolean;
  airCondition: boolean;
  selectedFile: File[];
  weeklyTimeAvailability: WeeklyTimeTypes[];
  oneTimeAvailability: OneTimeTypes[];
};
