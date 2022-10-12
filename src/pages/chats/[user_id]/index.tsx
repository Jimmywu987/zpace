import { useEffect, useRef, useState } from "react";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
import ChatContactBox from "@/features/chatbox/ChatContactBox";
import ImageIcon from "@mui/icons-material/Image";
import { QueryProps } from "@/types/QueryProps";
import io from "socket.io-client";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";

export const prisma = new PrismaClient();

let socket: any;
let user_id: string;
type Message = {
  message: string;
  sender_id:string;
};

type Users = {
  username: string;
  id: string;
  profileImg: string;
};

type ServerSideProps = {
  host_id: string;
  users: Users[];
};

export async function getServerSideProps({ query }: QueryProps) {

  const users = await prisma.user.findMany({
    select: {
      username: true,
      id: true,
      profileImg: true,
    },
  });
  const { user_id } = query;

  let host_id = user_id;

  if (!host_id) {
    host_id = users[0].id;
  }

  return {
    props: {
      host_id,
      users,
    },
  };
}

export default function Page({ host_id, users }: ServerSideProps) {
  const joinRoom = async () => {
   socket?.emit("join-room", user_id);
 };

  joinRoom();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [showDetail, setShowDetail] = useState(false);
  const [room, setRoom] = useState("")
  // const blogsData = blogsJSON.posts.slice(0, 9);

  const contactPerson = users.find((user) => user.id === host_id);
  const [contactName, setContactName] = useState(contactPerson?.username);
  const messageEndRef = useRef<null | HTMLDivElement>(null);
  const validMessage = message.length > 0;

  const session = useSession();
  user_id = session.data?.user?.id;
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/chat/socket");

    socket = io();

    socket.on("receive-message", async (msg: Message) => {
      setMessages((currentMsg) => [...currentMsg, { sender_id: msg.sender_id, message: msg.message}]);
    });
  };
 
  useEffect(() => {
    joinRoom();
    setContactName(contactPerson?.username);
    setRoom(host_id)
    setMessages([]);
  }, [host_id]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [messages]);

 

  const sendMessage = async () => {
    if (message) {
      socket.emit("send-message", { sender_id: socket.id, message, sender_name: session.data?.user?.username }, room);
      setMessages((currentMsg) => [...currentMsg, { sender_id: socket.id, message: message }]);
      setMessage("");
    }
  };

  const handleKeypress = (e: any) => {
    if (e.keyCode === 13) {
      if (message) {
        sendMessage();
      }
    }
  };

  return (
    <div className={`w-full flex h-[90vh] fixed top-20 right-0`}>
      <section className="w-1/4 border border-gray-300 bg-gray-100">
        <div className="p-3 border-y border-gray-300 bg-white font-bold h-20">
          Message
        </div>
        <div id="contact-box-container" className="overflow-y-scroll h-full ">
          {users?.map((user, key) => { if (user.id !== user_id ) return (
            <ChatContactBox
              key={key}
              id={user.id}
              name={user.username}
              image={user.profileImg}
            />
          )})}
        </div>
      </section>
      <section
        className={`${
          showDetail && "translation -translate-x-"
        } duration-700 transform z-50 flex flex-col flex-1 border border-gray-300 z-40 bg-gray-100`}
      >
        <div className="relative p-3 border-y border-gray-300 bg-white font-bold h-20 ">
          <span className="font-bold">{contactName}</span>
          <button
            className="absolute right-1 inset-y-1 "
            onClick={() => setShowDetail(!showDetail)}
          >
            {showDetail ? "Hide Detail" : "Show Detail"}
          </button>
        </div>
        <div className="flex-1 overflow-y-scroll p-2">
          {messages.map((msg, i) => {
            return (
              <div
                className={`w-full flex ${
                  msg.sender_id === socket.id ? "justify-end " : " justify-start "
                }py-1 px-2`}
                key={i}
              >
                <span
                  className={`${
                    msg.sender_id === socket.id
                      ? "bg-white"
                      : "bg-violet-500 text-white"
                  }  rounded-md p-2 max-w-[45%] break-all`}
                >
                  {msg.message}
                </span>
              </div>
            );
          })}
          <div ref={messageEndRef}></div>
        </div>
        <div className="max-h-[20%] inset-y-1">
          <div className="my-2 relative flex items-center">
            <label
              className="text-blue-500 hover:bg-gray-200 ease-in-out transition  p-2 m-3 rounded-full cursor-pointer"
              htmlFor="fileUpload"
            >
              <ImageIcon />
            </label>
            <input
              className="hidden"
              id="fileUpload"
              type="file"
              accept="image/x-png,image/jpeg"

              // onChange={uploadFile}
            />
            <input
              type="text"
              placeholder="New message..."
              value={message}
              className="outline-none py-2 px-2 rounded-md flex-1 text-blue-500 pr-10 mr-2"
              onChange={(e) => setMessage(e.target.value)}
              // onChange={(e) => setMessage(e.target.value)}
              onKeyUp={handleKeypress}
            />
            <button
              type="button"
              onClick={() => {
                sendMessage();
              }}
              className={`${
                !validMessage && "hidden"
              } text-blue-500 hover:scale-110 transition ease-in-out absolute right-5 inset-y-5`}
            >
              <ArrowCircleUpRoundedIcon />
            </button>
          </div>
        </div>
      </section>
      <section
        className={`w-1/4 translate-x-[200%] right-0 absolute lg:relative lg:right-0 lg:translate-x-0 duration-700 transform transition`}
      >
        <div className="p-3 border-y border-gray-300 bg-white font-bold h-20">
          Detail
        </div>

        <div className="z-40 overflow-y-scroll h-full">
          <div className="h-[200px] bg-white relative">
            <span className="sticky top-0">Carousell</span>
          </div>
          <div className="h-[200px] bg-blue-500">Detail</div>
          <div className="h-[200px]">Check in & Checkout</div>
          <div className="h-[200px] bg-white">Direction</div>
          <div className="h-[200px]">Call Host</div>
          <div className="h-[200px]">Show Listing</div>
        </div>
      </section>
    </div>
  );
}

type User = {
  id: string;
  username: string;
};
