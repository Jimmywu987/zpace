import Link from "next/link" 
import React from "react";
import { useRouter } from "next/router";
export default function ChatContactBox(contact: ContactProps) {
  const router = useRouter();
  const {user_id} = router.query;
  const selectedHost = user_id === contact.id.toString(); 

  return (
    <Link href={`/chats/${contact.id}`}>
      <div
        className={`${
          selectedHost
            ? "bg-violet-500 text-white"
            : "text-gray-500 hover:bg-violet-200 "
        } w-full h-20 p-2 flex rounded-2xl items-center cursor-pointer my-2 mx-1 translation ease-in-out transition space-x-3`}
      >
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={`${contact.image}`}
          alt="image"
        />
        <div className="text-md ">
          <p
            className={`font-bold ${
              selectedHost ? "text-white" : "text-black"
            }`}
          >
            {contact.name}
          </p>
          <p className="text-ellipsis overflow-hidden h-1/3 ...">
          </p>
        </div>
      </div>          

    </Link>
  );
}

type ContactProps = {
  id: string;
  name: string;
  image: string;
};
