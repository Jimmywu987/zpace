import { OneTimeTypes } from "@/features/roomOwner/types/oneTimeTypes";
import { WeeklyTimeTypes } from "@/features/roomOwner/types/weeklyTimeTypes";

export type CreateRoomFormInputTypes = {
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
  selectedFile: File[];
  weeklyTimeAvailability: WeeklyTimeTypes[];
  oneTimeAvailability: OneTimeTypes[];
};
