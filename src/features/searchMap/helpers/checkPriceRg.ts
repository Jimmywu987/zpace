import { RoomType } from "@/types/Room";

export const checkPriceRg = (
  ob: RoomType,
  startPriceRg: number,
  endPriceRg: number
) => {
  return (
    startPriceRg <= Number(ob.hourlyPrice) &&
    Number(ob.hourlyPrice) <= endPriceRg
  );
};
