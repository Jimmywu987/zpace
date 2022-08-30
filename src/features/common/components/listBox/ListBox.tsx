import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export type ListBoxType = {
  name: string;
  value: string;
};
export const ListBox = ({
  options,
  setSelected,
  selected,
}: {
  options: ListBoxType[];
  setSelected: Dispatch<SetStateAction<string>>;
  selected: string;
}) => {
  return (
    <div className="w-full">
      <FormControl variant="outlined" className="w-full">
        <InputLabel htmlFor="district-selection">Search by District</InputLabel>
        <Select
          onChange={(event) => setSelected(event.target.value)}
          label="Search by District"
          id="district-selection"
          value={selected}
          className="focus:outline-none hover:outline-none"
        >
          {options.map((option: ListBoxType, indx) => {
            return (
              <MenuItem key={indx} value={option.value}>
                {option.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};
