import io from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";

type User = {
  id: string;
  username: string;
};

export const prisma = new PrismaClient();

export const getServerSideProps:GetServerSideProps = async(context) => {
  const serverSession = await getSession(context);

  const users = await prisma.user.findMany({
    select: {
      username: true,
      id: true,
      profileImg: true,
    },
    where: {
      NOT: {
        id: serverSession?.user?.id,
      },
    },
  });
  if (!users) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      users,
    },
  };
}

export default function ChatsPage({ users }: { users: User[] }) {
  users.map(user => {
    Router.push("/chats/" + user.id);
  }) 
}
