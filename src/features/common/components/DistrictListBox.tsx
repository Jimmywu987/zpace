import { ListBox } from "@/features/common/components/listBox/ListBox";
import { Dispatch, SetStateAction } from "react";
const DISTRICT = [
  {
    name: "",
    value: "",
  },
  {
    name: "Tung Chung",
    value: "Tung Chung",
  },
  { name: "Kwai Tsing", value: "Kwai Tsing" },
  { name: "North", value: "North District" },
  { name: "Sai Kung", value: "Sai Kung District" },
  { name: "Sha Tin", value: "Sha Tin District" },
  { name: "Tai Po", value: "Tai Po District" },
  { name: "Tsing Yi", value: "Tsing Yi" },
  { name: "Tsuen Wan", value: "Tsuen Wan" },
  { name: "Tin Shui Wai", value: "Tin Shui Wai" },
  { name: "Tuen Mun", value: "Tuen Mun" },
  { name: "Yuen Long", value: "Yuen Long" },
  { name: "Kowloon City", value: "Kowloon City District" },
  { name: "Kwun Tong", value: "Kwun Tong District" },
  { name: "Yau Tsim Mong", value: "Yau Tsim Mong" },
  { name: "District Shui Po", value: "District Shui Po" },
  { name: "Wong Tai Sin", value: "Wong Tai Sin District" },
  { name: "Tseung Kwan O", value: "Tseung Kwan O" },
  { name: "Central and Western", value: "Central and Western" },
  { name: "Eastern", value: "Eastern District" },
  { name: "Southern", value: "Southern District" },
  { name: "Wan Chai", value: "Wan Chai District" },
];
export const DistrictListBox = ({
  setSelected,
  selected,
}: {
  setSelected: Dispatch<SetStateAction<string>>;
  selected: string;
}) => {
  return (
    <div className="w-full">
      <ListBox
        options={DISTRICT}
        setSelected={setSelected}
        selected={selected}
      />
    </div>
  );
};
