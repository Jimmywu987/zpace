import { LoadRoomInfo } from "@/features/roomOwner/components/LoadRoomInfo";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GetServerSideProps } from "next";
import { User } from "@prisma/client";
import { getCreateRoomInfo } from "@/services/rooms";
import { AppProps } from "next/app";
const RoomOwnerPage = (props: AppProps) => {
  const router = useRouter();
  console.log("router", router);
  console.log("props", props);

  return (
    <div>
      <div className="">
        <h3 className="">Room Management System</h3>
      </div>
      <LoadRoomInfo />
      <div className="">
        <Link href="/room-owner/manage-room/create-room">
          <a className="">Rent Out a Space</a>
        </Link>
      </div>
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
      roomsInfo,
    },
  };
};

export default RoomOwnerPage;
