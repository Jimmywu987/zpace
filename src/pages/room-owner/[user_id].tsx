import { LoadRoomInfo } from "@/features/roomOwner/components/LoadRoomInfo";
import { getCreateRoomInfo } from "@/services/rooms";
import { RoomType } from "@/types/Room";
import { User } from "@prisma/client";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";

export type RoomOwnerPageProps = AppProps & {
  roomsInfo: RoomType[];
};
const RoomOwnerPage = (props: RoomOwnerPageProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col space-y-4 mt-6">
      <div className="flex flex-col space-y-4 mx-2">
        <h3 className="text-xl">Room Management System</h3>
        <div>
          <Link
            href="/room-owner/manage-room/create-room"
            className="px-3 py-2 text-xl bg-theme-color1 text-white rounded"
            passHref
          >
            Rent Out a Space
          </Link>
        </div>
      </div>
      <LoadRoomInfo props={props} />
    </div>
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
  const { user_id } = context.query;
  const { id } = session.user as User;

  if (user_id !== id) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
  const roomsInfo = await getCreateRoomInfo(user_id);

  return {
    props: {
      roomsInfo: JSON.parse(JSON.stringify(roomsInfo)),
    },
  };
};

export default RoomOwnerPage;
