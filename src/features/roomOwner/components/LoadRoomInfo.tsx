import { RoomOwnerPageProps } from "@/pages/room-owner/[user_id]";
import { AppProps } from "next/app";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
export const LoadRoomInfo = ({ props }: { props: RoomOwnerPageProps }) => {
  const { roomsInfo } = props;
  if (roomsInfo.length === 0) {
    return (
      <div>
        <MapsHomeWorkIcon className="w-20 h-20 text-theme-color1" />
      </div>
    );
  }
  return <div>{/* @todo render each room grid */}</div>;
};
