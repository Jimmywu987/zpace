import { RoomType } from "@/types/Room";
import { useEffect, useState } from "react";
import Link from "next/link";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { RenderAvgRating } from "@/features/common/components/RenderAvgRating";
import { User } from "@prisma/client";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PeopleIcon from "@mui/icons-material/People";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { unlikeRoom, likeRoom } from "@/apis/api";
import { useSession } from "next-auth/react";
import { RoomImagePreviewCard } from "@/features/common/components/RoomImagePreviewCard";
export const SearchPageRoomCard = ({ room }: { room: RoomType }) => {
  const session = useSession();
  const user = session.data?.user as User;

  const [isLiked, setIsLiked] = useState("");
  const isAuthenticated = session.status === "authenticated";

  useEffect(() => {
    const hasLike = room.likes.find((like) => like.userId === user.id);
    if (hasLike) {
      setIsLiked(hasLike.id);
    }
  }, []);

  const onClickUnlike = async (likeId: string) => {
    const res = await unlikeRoom({ id: likeId });
    if (res && res.status === 200) {
      setIsLiked("");
    }
  };
  const onClickLike = async (roomId: string) => {
    const res = await likeRoom({ roomId });
    if (res && res.status === 200) {
      const { id } = res.data;
      setIsLiked(id);
    }
  };
  return (
    <div className="bg-white p-2 border-b border-b-gray-100">
      <div className="flex flex-col flex-1 h-[220px]">
        <RoomImagePreviewCard roomImgs={room.roomImgs} />
      </div>
      <div className="px-2 space-y-1">
        <Link
          href={`/room-detail/${room.id}`}
          className="text-xl text-theme-color1 font-bold"
          passHref
        >
          {room.spaceName}
        </Link>
        <div className="flex space-x-1">
          {Array(5)
            .fill("")
            .map((_: number, index: number) => (
              <div key={index}>
                <RenderAvgRating
                  index={index}
                  rating={room.ratingAndComments}
                />
              </div>
            ))}
        </div>
        <div className="flex justify-between">
          <div className="">
            <LocationOnIcon
              onClick={() => {}}
              className="cursor-pointer text-theme-color1 mr-1"
            />
            <span>{room.district}</span>
          </div>
          <div className="">
            <span className="mr-1 text-theme-color2 font-bold text-lg">
              ${room.hourlyPrice}
            </span>
            <span>/hour</span>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <PeopleIcon className="text-theme-color1 mr-1" />
            Capacity: {room.capacity}
          </div>
          {isAuthenticated && user?.id !== room.userId && (
            <div className="">
              {!!isLiked ? (
                <>
                  <FavoriteIcon
                    onClick={() => {
                      onClickUnlike(isLiked);
                    }}
                    className="text-theme-color2 mr-1 cursor-pointer"
                  />
                  <span>Liked</span>
                </>
              ) : (
                <>
                  <FavoriteBorderIcon
                    onClick={() => onClickLike(room.id)}
                    className="text-theme-color2 mr-1 cursor-pointer"
                  />
                  <span>Like</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
