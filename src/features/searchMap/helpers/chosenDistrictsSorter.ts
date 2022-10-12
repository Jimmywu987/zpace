import { RoomType } from "@/types/Room";

export const chosenDistrictsSorter = (
  sortedRoomData: RoomType[],
  place: any[],
  capacity: number
) => {
  let chosenDistrict = sortedRoomData.filter((room: RoomType) => {
    let ifMatch = false;
    for (let i = 0; i < place.length; i++) {
      const splitAddress = place[i].formatted_address.split(",");
      for (let k = 0; k < splitAddress.length; k++) {
        if (splitAddress[k].includes(room.district)) {
          ifMatch = true;
          break;
        }
      }
      if (ifMatch) {
        break;
      }
    }
    return ifMatch;
  });
  let theRestDistrict = sortedRoomData.filter((room: RoomType) => {
    let ifMatch = true;
    for (let i = 0; i < place.length; i++) {
      const splitAddress = place[i].formatted_address.split(",");
      for (let k = 0; k < splitAddress.length; k++) {
        if (splitAddress[k].includes(room.district)) {
          ifMatch = false;
          break;
        }
      }
      if (!ifMatch) {
        break;
      }
    }
    return ifMatch;
  });
  chosenDistrict.sort((a: RoomType, b: RoomType) => a.capacity - b.capacity);
  theRestDistrict.sort((a: RoomType, b: RoomType) => a.capacity - b.capacity);
  const findIndex = chosenDistrict.findIndex(
    (room: RoomType) => room.capacity >= capacity
  );
  const firstPart = chosenDistrict.splice(0, findIndex);
  chosenDistrict = chosenDistrict.concat(firstPart);

  const findIndexTheRestPart = theRestDistrict.findIndex(
    (room: RoomType) => room.capacity >= capacity
  );
  const firstPartTheRestPart = theRestDistrict.splice(0, findIndexTheRestPart);
  theRestDistrict = theRestDistrict.concat(firstPartTheRestPart);

  return chosenDistrict.concat(theRestDistrict);
};
