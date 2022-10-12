import { useState } from "react";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import Link from "next/link";
import { RoomType } from "@/types/Room";

export const InfoWindowCard = ({ chosenRoom }: { chosenRoom: RoomType }) => {
  const [photoSequence, setPhotoSequence] = useState(0);

  const slidePhotoRight = () => {
    if (chosenRoom.roomImgs.length - 1 > photoSequence) {
      setPhotoSequence((index: number) => index + 1);
    } else {
      setPhotoSequence(() => 0);
    }
  };
  const slidePhotoLeft = () => {
    if (0 < photoSequence) {
      setPhotoSequence((index: number) => index - 1);
    } else {
      setPhotoSequence(() => chosenRoom.roomImgs.length - 1);
    }
  };
  return (
    <div className="flex flex-col space-y-1">
      <div className="relative p-2 shadow-lg">
        {chosenRoom.roomImgs.length > 1 && (
          <ExpandCircleDownIcon
            onClick={slidePhotoLeft}
            style={{ width: "40px", height: "40px" }}
            className="text-gray-50 shadow absolute rotate-90 left-0 my-auto top-0 bottom-0 hover:text-gray-200 cursor-pointer"
          />
        )}
        <img
          src={chosenRoom.roomImgs[photoSequence].url}
          alt="preview-room-pic"
          className="object-contain w-80 "
        />
        {chosenRoom.roomImgs.length > 1 && (
          <ExpandCircleDownIcon
            onClick={slidePhotoRight}
            style={{ width: "40px", height: "40px" }}
            className="text-gray-50 shadow  absolute -rotate-90 right-0 my-auto top-0 bottom-0 hover:text-gray-200 cursor-pointer"
          />
        )}
      </div>
      <Link href={`/room-detail/${chosenRoom.id}`}>
        <a className="text-xl text-theme-color1 font-bold">
          {chosenRoom.spaceName}
        </a>
      </Link>
      <p className="font-medium">Capacity: {chosenRoom.capacity}</p>
      <p className="font-medium">
        ${chosenRoom.hourlyPrice}
        /hour
      </p>
    </div>
  );
};
