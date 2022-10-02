import { EditRoomFormStepOne } from "@/features/roomOwner/components/editForm/EditRoomFormStepOne";
import { EditRoomFormStepTwo } from "@/features/roomOwner/components/editForm/EditRoomFormStepTwo";
import { FormStepper } from "@/features/roomOwner/components/form/FormStepper";
import { editRoomDefaultValue } from "@/features/roomOwner/helpers/getEditRoomDefaultValues";
import { useEditRoomResolver } from "@/features/roomOwner/schemas/useEditRoomResolver";
import { EditRoomFormInputTypes } from "@/features/roomOwner/types/editRoomFormInputTypes";
import { prisma } from "@/services/prisma";
import { RoomType } from "@/types/Room";
import { GetServerSideProps } from "next";
import { User } from "next-auth";
import { getSession } from "next-auth/react";
import { AppProps } from "next/app";
import { FormProvider, useForm } from "react-hook-form";
export type EditRoomPageProps = AppProps & {
  room: RoomType;
};

const STEPS = [
  "Edit Available Time slots optional",
  "Edit Other information (Basic Info and Photos) optional",
];
const EditRoomPage = (props: EditRoomPageProps) => {
  const { room } = props;
  const defaultValues = editRoomDefaultValue(room);
  const editRoomFormMethods = useForm<EditRoomFormInputTypes>({
    resolver: useEditRoomResolver(),
    defaultValues,
  });

  const step = editRoomFormMethods.watch("step");
  return (
    <FormProvider {...editRoomFormMethods}>
      <div className="my-6">
        <FormStepper labels={STEPS} />
        <div className="max-w-[860px] mx-auto">
          {step === 0 && <EditRoomFormStepOne />}
          {step === 1 && <EditRoomFormStepTwo />}
        </div>
      </div>
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
