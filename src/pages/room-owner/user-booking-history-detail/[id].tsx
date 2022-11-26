import { RoomImagePreviewCard } from "@/features/common/components/RoomImagePreviewCard";
import { TimeSlotsRender } from "@/features/room/components/TimeSlotRender";
import { timeSlotFun } from "@/features/room/helpers";
import { prisma } from "@/services/prisma";
import {
  BookingTimeslot,
  CustomerBookingTimeslot,
  Room,
  RoomImg,
  TimeslotStatusEnum,
  User,
} from "@prisma/client";
import moment from "moment";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { AppProps } from "next/app";
import Image from "next/image";
import Link from "next/link";

export type UserBookingHistoryDetailProps = AppProps & {
  bookingRecord: CustomerBookingTimeslot & {
    bookingTimeslots: BookingTimeslot[];
    room: Room & {
      user: User;
      roomImgs: RoomImg[];
    };
  };
};
function diffMinutes(dt1: string, dt2: string) {
  let date1 = `2020-01-02 ${dt1}`;
  let date2 = dt2 !== "00:00" ? `2020-01-02 ${dt2}` : `2020-01-03 ${dt2}`;
  let dtF = new Date(date1);
  let dtL = new Date(date2);
  let diff = (dtF.getTime() - dtL.getTime()) / 1000;
  diff = diff / 60 / 60;
  return Math.abs(diff);
}

const parseTime = (num: number) => {
  let str = "";
  if (`${num}`.includes(".") && Math.floor(num) === 0) {
    str = `30 minutes`;
  } else if (`${num}`.includes(".")) {
    str = `${Math.floor(num)} ${
      Math.floor(num) > 1 ? `hours` : `hour`
    } and 30 minutes`;
  } else {
    str = `${num} ${Math.floor(num) > 1 ? `hours` : `hour`}`;
  }

  return str;
};

const UserBookingHistoryDetail = (props: UserBookingHistoryDetailProps) => {
  const { bookingRecord } = props;
  const timeSlotArr = timeSlotFun();

  console.log("bookingRecord", bookingRecord);
  return (
    <div className="space-y-5">
      <h3 className="text-gray-700 text-2xl mt-5">
        Booking Request{" "}
        <span
          className="font-semibold"
          style={{
            color:
              bookingRecord.status === TimeslotStatusEnum.COMPLETED ||
              bookingRecord.status === TimeslotStatusEnum.ACCEPTED
                ? `#28df99`
                : bookingRecord.status === TimeslotStatusEnum.PENDING
                ? "#ffc93c"
                : "#ec524b",
          }}
        >
          [{bookingRecord.status}]
        </span>
      </h3>
      <div>
        <div className="flex space-x-4">
          <div className="h-[400px] flex-1">
            <RoomImagePreviewCard roomImgs={bookingRecord.room.roomImgs} />
          </div>

          <div className="flex-1">
            <div className="space-y-1">
              <div className="text-lg">
                Space Name:{" "}
                <span className="text-theme-color1 font-semibold">
                  {bookingRecord.room.spaceName}
                </span>
              </div>
              <div className="text-lg">
                District:{" "}
                <span className="text-theme-color1 font-semibold">
                  {bookingRecord.room.district}
                </span>
              </div>
              {(bookingRecord.status === TimeslotStatusEnum.COMPLETED ||
                bookingRecord.status === TimeslotStatusEnum.ACCEPTED) && (
                <div className="text-lg">
                  Address:{" "}
                  <span className="text-theme-color1 font-semibold">
                    {bookingRecord.room.address}
                  </span>
                </div>
              )}
              <div className="text-lg">
                <span>
                  Number of Visitor(s):{" "}
                  <span className="text-theme-color1 font-semibold">
                    {bookingRecord.headCount}
                  </span>
                </span>
              </div>
              <div className="text-lg">
                <span>
                  Duration:{" "}
                  <span className="text-theme-color1 font-semibold">
                    {parseTime(
                      bookingRecord.bookingTimeslots
                        .map((slot) => {
                          const adjustedEndTime = timeSlotArr.indexOf(
                            slot.endTime
                          );
                          return diffMinutes(
                            slot.startTime,
                            slot.endTime !== "23:30"
                              ? timeSlotArr[adjustedEndTime + 1]
                              : "00:00"
                          );
                        })
                        .reduce((a, b) => {
                          return a + b;
                        })
                    )}
                  </span>
                </span>
              </div>

              <div className="text-lg flex items-center space-x-2">
                <div>Host: </div>
                <Link
                  href={`/profile/${bookingRecord.room.userId}`}
                  className="flex items-center space-x-2"
                  passHref
                >
                  <div className="relative w-9 h-9">
                    <Image
                      src={bookingRecord.room.user.profileImg}
                      fill
                      alt="profile pic"
                      className="rounded-full object-contain"
                    />
                  </div>
                  <span className="text-theme-color1 font-medium">
                    {bookingRecord.room.user.username}
                  </span>
                </Link>
              </div>
            </div>

            <div className="my-2">
              <TimeSlotsRender
                bookedTimeSlot={bookingRecord.bookingTimeslots.map(
                  (timeSlot) => {
                    const { date, startTime, endTime } = timeSlot;
                    return { date, from: startTime, to: endTime };
                  }
                )}
                timeSlotArr={timeSlotArr}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="text-gray-700  self-end text-lg">
          Hourly Price: ${bookingRecord.room.hourlyPrice}
        </div>
        <div className="text-gray-700  self-end text-lg">
          Total Payment:{" "}
          <span className="text-2xl text-theme-color2 font-bold">{`$${bookingRecord.price}`}</span>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  if (!id || Array.isArray(id)) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
  const bookingRecord = await prisma.customerBookingTimeslot.findUnique({
    where: {
      id,
    },
    include: {
      room: {
        include: {
          user: {
            select: {
              profileImg: true,
              username: true,
            },
          },
          roomImgs: true,
        },
      },
      bookingTimeslots: true,
    },
  });
  return {
    props: {
      bookingRecord: JSON.parse(JSON.stringify(bookingRecord)),
    },
  };
};

export default UserBookingHistoryDetail;
