import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useFormContext } from "react-hook-form";

export type ListBoxType = {
  name: string;
  value: string;
};
export const ListBox = ({
  label,
  name,
  onChange,
  options,
}: {
  label: string;
  onChange?: () => void;
  name: string;
  options: ListBoxType[];
}) => {
  const { setValue, watch } = useFormContext();
  return (
    <div className="w-full">
      <FormControl variant="outlined" className="w-full">
        <InputLabel htmlFor="district-selection">{label}</InputLabel>
        <Select
          onChange={
            onChange
              ? onChange
              : (event) => {
                  const { value } = event.target;
                  setValue(name, value);
                }
          }
          label="Search by District"
          id="district-selection"
          value={watch(name) ?? ""}
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
