import { CreateRoomFormStepOne } from "@/features/roomOwner/components/form/CreateRoomFormStepOne";
import { CreateRoomFormStepper } from "@/features/roomOwner/components/form/CreateRoomFormStepper";
import { CreateRoomFormStepTwo } from "@/features/roomOwner/components/form/CreateRoomFormStepTwo";
import { useCreateRoomResolver } from "@/features/roomOwner/schemas/useCreateRoomResolver";
import { CreateRoomInputTypes } from "@/features/roomOwner/types/createRoomInputTypes";
import { prisma } from "@/services/prisma";
import { getCreateRoomInfo } from "@/services/rooms";
import { RoomType } from "@/types/Room";
import { GetServerSideProps } from "next";
import { User } from "next-auth";
import { getSession } from "next-auth/react";
import { AppProps } from "next/app";
import { useForm, FormProvider } from "react-hook-form";
export type EditRoomPageProps = AppProps & {
  room: RoomType;
};

const splitTime = (time: string) => {
  const part = time.split(":");
  const hour = +part[0];
  const minute = +part[1];
  const halfDay = hour >= 12 ? "P.M." : "A.M.";
  const hr = hour > 12 ? hour - 12 : hour;
  const min = minute;
  return { halfDay, hr: hr.toString(), min: min.toString() };
};

const EditRoomPage = (props: EditRoomPageProps) => {
  const { room } = props;
  const {
    spaceName,
    address,
    description,
    district,
    hourlyPrice,
    capacity,
    wifi,
    desk,
    socketPlug,
    airCondition,
    oneTimeOffOpenTimeslots,
    weeklyOpenTimeslots,
  } = room;
  const editRoomFormMethods = useForm<CreateRoomInputTypes>({
    resolver: useCreateRoomResolver(),
    defaultValues: {
      spaceName,
      address,
      district,
      capacity,
      hourlyPrice,
      description,
      wifi,
      desk,
      socketPlug,
      airCondition,
      selectedFile: [],
      weeklyTimeAvailability: weeklyOpenTimeslots.map((slot) => {
        const {
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
          sunday,
          startTime,
          endTime,
        } = slot;
        const {
          halfDay: weekHalfDayOne,
          hr: weekStartHr,
          min: weekStartMin,
        } = splitTime(startTime);
        const {
          halfDay: weekHalfDayTwo,
          hr: weekEndHr,
          min: weekEndMin,
        } = splitTime(endTime);
        return {
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
          sunday,
          weekStartHr,
          weekStartMin,
          weekEndHr,
          weekEndMin,
          weekHalfDayOne,
          weekHalfDayTwo,
        };
      }),
      oneTimeAvailability: oneTimeOffOpenTimeslots.map((slot) => {
        const { date, startTime, endTime } = slot;
        const {
          halfDay: halfOneDayOne,
          hr: oneOffStartHr,
          min: oneOffStartMin,
        } = splitTime(startTime);
        const {
          halfDay: halfOneDayTwo,
          hr: oneOffEndHr,
          min: oneOffEndMin,
        } = splitTime(endTime);
        return {
          halfOneDayOne,
          halfOneDayTwo,
          oneOffStartHr,
          oneOffStartMin,
          oneOffEndHr,
          oneOffEndMin,
          oneOffDate: date,
        };
      }),
    },
  });

  const step = editRoomFormMethods.watch("step");
  return (
    <FormProvider {...editRoomFormMethods}>
      <></>
    </FormProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
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
  const { roomId } = context.query;
  const { id } = session.user as User;

  const room = await prisma.room.findUnique({
    where: {
      id: roomId?.toString(),
    },
    include: {
      roomImgs: true,
      weeklyOpenTimeslots: true,
      oneTimeOffOpenTimeslots: true,
      ratingAndComments: true,
    },
  });
  if (!room) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
  const { userId } = room;
  if (userId !== id) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  return {
    props: {
      room: JSON.parse(JSON.stringify(room)),
    },
  };
};

export default EditRoomPage;
