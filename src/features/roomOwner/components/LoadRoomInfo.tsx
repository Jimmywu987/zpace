import { RoomOwnerPageProps } from "@/pages/room-owner/[user_id]";

import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import { RoomCard } from "./RoomCard";
export const LoadRoomInfo = ({ props }: { props: RoomOwnerPageProps }) => {
  const { roomsInfo } = props;
  if (roomsInfo.length === 0) {
    return (
      <div>
        <MapsHomeWorkIcon className="w-20 h-20 text-theme-color1" />
        Currently no space is stored.
      </div>
    );
  }
  return (
    <div className="space-y-4 py-8">
      {roomsInfo.map((room, index) => {
        return <RoomCard room={room} key={index} />;
      })}
    </div>
  );
};
