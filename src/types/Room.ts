import {
  RoomImg,
  WeeklyOpenTimeslot,
  OneTimeOffOpenTimeslot,
  RatingAndCommentOnRoom,
  Room,
  Like,
} from "@prisma/client";

export type RoomType = Room & {
  likes: Like[];
  roomImgs: RoomImg[];
  weeklyOpenTimeslots: WeeklyOpenTimeslot[];
  oneTimeOffOpenTimeslots: OneTimeOffOpenTimeslot[];
  ratingAndComments: RatingAndCommentOnRoom[];
};
