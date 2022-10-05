import { RoomType } from "@/types/Room";

export const chosenSingleDistrictSorter = (
  sortedRoomData: RoomType[],
  district: string,
  capacity: number
) => {
  let chosenDistrict = sortedRoomData.filter(
    (room: RoomType) => district === room.district
  );
  let theRestDistrict = sortedRoomData.filter(
    (room: RoomType) => district !== room.district
  );
  chosenDistrict.sort((a: RoomType, b: RoomType) => a.capacity - b.capacity);
  theRestDistrict.sort((a: RoomType, b: RoomType) => a.capacity - b.capacity);
  const findIndex = chosenDistrict.findIndex(
    (room: RoomType) => room.capacity === capacity
  );
  const firstPart = chosenDistrict.splice(0, findIndex);
  chosenDistrict = chosenDistrict.concat(firstPart);

  const findIndexTheRestPart = theRestDistrict.findIndex(
    (room: RoomType) => room.capacity === capacity
  );
  const firstPartTheRestPart = theRestDistrict.splice(0, findIndexTheRestPart);
  theRestDistrict = theRestDistrict.concat(firstPartTheRestPart);
  return chosenDistrict.concat(theRestDistrict);
};
