import {
  RoomImg,
  WeeklyOpenTimeslot,
  OneTimeOffOpenTimeslot,
  RatingAndCommentOnRoom,
  Room,
} from "@prisma/client";

export type RoomType = Room & {
  roomImgs: RoomImg[];
  weeklyOpenTimeslots: WeeklyOpenTimeslot[];
  oneTimeOffOpenTimeslots: OneTimeOffOpenTimeslot[];
  ratingAndComments: RatingAndCommentOnRoom[];
};
