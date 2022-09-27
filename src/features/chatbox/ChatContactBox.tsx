import Link from "next/link" 
import React from "react";
import moment from "moment";
export default function ChatContactBox(contact: ContactProps) {
  return (
    <Link href={`/chats/guest/${contact.id}`}>
      <div className="w-full py-2 flex rounded-2xl items-center hover:bg-violet-200 cursor-pointer my-2 mx-1 translation ease-in-out transition">
        <img
          className="w-1/5 rounded-full object-cover"
          src={`https://joeschmoe.io/api/v1/${contact.image}`}
          alt="image"
        />
        <div className="text-xs text-gray-500 ">
          <p> {contact.id}</p>
          <p className="font-bold text-black">{contact.name}</p>
          <p className="text-ellipsis overflow-hidden h-1/3 ...">
            {contact.lastMessage}
          </p>
          <p>{moment(parseInt(contact.createdAt)).format("LLL")}</p>
        </div>
      </div>
    </Link>
  );
}

type ContactProps = {
  id: number;
  name: string;
  createdAt: string;
  lastMessage: string;
  contactJoinDate: string;
  image: string;
};
