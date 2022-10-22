import { RoomType } from "@/types/Room";
import {
  BookingTimeslot,
  CustomerBookingTimeslot,
  RatingAndCommentOnRoom,
  User,
} from "@prisma/client";
import { AppProps } from "next/app";

export type RatingAndComments = RatingAndCommentOnRoom & { user: User };
type CustomerBookingTimeslotType = CustomerBookingTimeslot & {
  bookingTimeslots: BookingTimeslot[];
};
export type RoomInfoType = RoomType & {
  user: User;
  ratingAndComments: RatingAndComments[];
  customerBookingTimeslots: CustomerBookingTimeslotType[];
};
export type RoomDetailPageProps = AppProps & {
  roomInfo: RoomInfoType;
  canRate: boolean;
};
