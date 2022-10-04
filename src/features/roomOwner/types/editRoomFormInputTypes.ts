import { RoomImg } from "@prisma/client";
import { OneTimeTypes } from "./oneTimeTypes";
import { WeeklyTimeTypes } from "./weeklyTimeTypes";

export type EditRoomFormInputTypes = {
  id: string;
  step: number;
  spaceName: string;
  description: string;
  capacity: number;
  hourlyPrice: number;
  wifi: boolean;
  desk: boolean;
  socketPlug: boolean;
  airCondition: boolean;
  selectedFile: File[];
  uploadedFile: RoomImg[];
  weeklyTimeAvailability: WeeklyTimeTypes[];
  oneTimeAvailability: OneTimeTypes[];
};
