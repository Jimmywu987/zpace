import { AdvancedSearchModal } from "@/features/searchMap/components/modal/AdvancedSearchModal";
import { Map } from "@/features/searchMap/components/Map";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchRooms } from "@/apis/api";
import { useDispatch, useSelector } from "react-redux";
import { settingSelector } from "@/redux/setting";
import { toPlaceSelector } from "@/redux/toPlace";
import { roomsSelector, toStoreRooms } from "@/redux/rooms";
import { checkPriceRg } from "@/features/searchMap/helpers/checkPriceRg";
import { sortByAttribute } from "@/features/searchMap/helpers/sortByAttribute";
import { RoomType } from "@/types/Room";
import { chosenDistrictsSorter } from "@/features/searchMap/helpers/chosenDistrictsSorter";
import { chosenSingleDistrictSorter } from "@/features/searchMap/helpers/chosenSingleDistrictSorter";
export default function SearchResultPage() {
  const [open, setOpen] = useState(false);
  const { rooms } = useSelector(roomsSelector);
  const { setting } = useSelector(settingSelector);
  const { place } = useSelector(toPlaceSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRoomDataThunk = async () => {
      const res = await fetchRooms(setting);
      if (!res || res.status !== 200) {
        return;
      }
      const startPriceRg = Number(setting.priceRg[0]);
      const endPriceRg = Number(setting.priceRg[1]);
      const capacity = setting.ppl;

      const roomData = res.data.roomInfos.filter((room: RoomType) =>
        checkPriceRg(room, startPriceRg, endPriceRg)
      );
      const sortedRoomData: RoomType[] = sortByAttribute(roomData, "district");
      dispatch(
        toStoreRooms({
          rooms:
            place.length > 1
              ? chosenDistrictsSorter(sortedRoomData, place, capacity)
              : chosenSingleDistrictSorter(sortedRoomData, place[0], capacity),
        })
      );
    };
    fetchRoomDataThunk();
  }, []);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  console.log("rooms", rooms);
  return (
    <div className="flex justify-between w-full">
      <div className="flex flex-col w-[25%]">
        <div className="text-center">No. of Space available: 0</div>
        <div className="">
          {rooms.map((room: RoomType) => {
            return (
              <div key={room.id}>{/** here should build the room card */}</div>
            );
          })}
          <div ref={ref}></div>
        </div>
      </div>
      <div className="flex flex-col w-[75%]">
        <Map />
      </div>
      <AdvancedSearchModal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      />
    </div>
  );
}
