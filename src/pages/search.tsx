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
import { SearchPageRoomCard } from "@/features/searchMap/components/SearchPageRoomCard";
import { LoadingSpinnerSvgIcon } from "@/features/common/components/svg/common";
export default function SearchResultPage() {
  const [open, setOpen] = useState(false);
  const [loadPage, setLoadPage] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  const { rooms } = useSelector(roomsSelector);
  const { setting } = useSelector(settingSelector);
  const { place } = useSelector(toPlaceSelector);
  const dispatch = useDispatch();
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    if (inView && loadPage <= rooms.length) {
      setIsLoading(true);
      setTimeout(() => {
        setLoadPage((e) => e + 3);
        setIsLoading(false);
      }, 600);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
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

  console.log("inView", inView);
  return (
    <div className="flex justify-between w-full h-[90vh] bg-white">
      <div className="flex flex-col w-[22%]">
        <div className="text-center p-3">No. of Space available: 0</div>
        <div className="flex flex-col flex-grow overflow-y-auto w-full">
          {rooms.slice(0, loadPage).map((room: RoomType) => (
            <SearchPageRoomCard room={room} key={room.id} />
          ))}
          <div ref={ref} className="opacity-0 text-xs">
            -
          </div>
          {isLoading && loadPage < rooms.length - 1 && (
            <div className="flex justify-center">
              <LoadingSpinnerSvgIcon className="w-10 h-10" />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col w-[78%]">
        <Map availableRooms={rooms} />
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
