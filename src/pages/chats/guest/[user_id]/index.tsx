import { useEffect, useState } from "react";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
import blogsJSON from "@/data/blogs.json";
import ChatContactBox from "@/features/chatbox/ChatContactBox";
import ImageIcon from "@mui/icons-material/Image";
import { QueryProps } from "@/types/QueryProps";
import toast from "react-hot-toast";



export async function getServerSideProps({ query }: QueryProps) {
  const {user_id} = query  
  // const hostDoc = await getUserWithUserId(user_id, true);
  if (!user_id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user_id,
    },
  };
}

export default function Page({user_id}: {user_id:number}) {
  const [message, setMessage] = useState("");
  const [showDetail, setShowDetail] = useState(false);
    const blogsData = blogsJSON.posts.slice(0, 9);
  const contactPerson = blogsData[user_id];
  const [contactName, setContactName] = useState(contactPerson.author);

  const validMessage = message.length > 0;
  useEffect(() => {
    setContactName(contactPerson.author)
    // console.log(showDetail);
  }, [user_id]);

  // const sendMessage = async () => {
  //   console.log("send", message);

  //   // socket.emit("createdMessage", { author: chosenUsername, message });
  //   // setMessages((currentMsg) => [
  //   //   ...currentMsg,
  //   //   { author: chosenUsername, message },
  //   // ]);

  //   setMessage("");
  // };

  const handleKeypress = (e:any) => {
      if (e.keyCode === 13) {
        if (message) {
          // sendMessage();
          toast.success('sent')
        }
      }
  }

  return (
    <div className={`w-full flex h-[90%] fixed right-0`}>
      <section className="w-1/4 border border-gray-300 bg-gray-100">
        <div className="p-3 border-y border-gray-300 bg-white font-bold h-20">
          Message
        </div>
        <div id="contact-box-container" className="overflow-y-scroll h-full ">
          {blogsData.map((blog, key) => (
            <ChatContactBox
              key={key}
              id={key}
              name={blog.author}
              createdAt={blog.date}
              lastMessage={blog.excerpt}
              contactJoinDate={blog.date}
              image={blog.author}
            />
          ))}
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
        <div className="flex-1 overflow-y-scroll p-2"></div>
        <div className="max-h-[20%] inset-y-1">
          <form 
            onSubmit={(e)=>{e.preventDefault
            console.log(123)}}
            className="my-2 relative flex items-center">
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
              className={`${
                !validMessage && "hidden"
              } text-blue-500 hover:scale-110 transition ease-in-out absolute right-5 inset-y-5`}
            >
              <ArrowCircleUpRoundedIcon />
            </button>
          </form>
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
