import { RoomImg } from "@prisma/client";
import { useState } from "react";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import Image from "next/image";

export const RoomImagePreviewCard = ({ roomImgs }: { roomImgs: RoomImg[] }) => {
  const [photoSequence, setPhotoSequence] = useState(0);

  const slidePhotoRight = () => {
    if (roomImgs.length - 1 > photoSequence) {
      setPhotoSequence((index: number) => index + 1);
    } else {
      setPhotoSequence(() => 0);
    }
  };
  const slidePhotoLeft = () => {
    if (0 < photoSequence) {
      setPhotoSequence((index: number) => index - 1);
    } else {
      setPhotoSequence(() => roomImgs.length - 1);
    }
  };

  return (
    <div className="relative p-2 shadow-lg h-full">
      {roomImgs.length > 1 && (
        <ExpandCircleDownIcon
          onClick={slidePhotoLeft}
          style={{ width: "40px", height: "40px" }}
          className="text-gray-50 shadow absolute rotate-90 left-0 my-auto top-0 bottom-0 hover:text-gray-200 cursor-pointer z-40"
        />
      )}
      <div className="w-full h-full relative">
        <Image
          src={roomImgs[photoSequence].url}
          alt="preview-room-pic"
          fill
          className="object-contain"
        />
      </div>
      {roomImgs.length > 1 && (
        <ExpandCircleDownIcon
          onClick={slidePhotoRight}
          style={{ width: "40px", height: "40px" }}
          className="text-gray-50 shadow absolute -rotate-90 right-0 my-auto top-0 bottom-0 hover:text-gray-200 cursor-pointer z-40"
        />
      )}
    </div>
  );
};
