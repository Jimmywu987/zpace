import io from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";

type User = {
  id: string;
  username: string;
};

export const prisma = new PrismaClient();

export async function getServerSideProps() {
  const users = await prisma.user.findMany({
    select: {
      username: true,
      id: true,
      profileImg: true,
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
  const session = useSession();
  let user_id = session.data?.user?.id
  users.map(user => {
    if (user.id !== user_id) return Router.push("/chats/" + user.id);
  }) 
}
