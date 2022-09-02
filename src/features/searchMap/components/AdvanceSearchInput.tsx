import { FormTextInput } from "@/features/common/components/input/FormTextInput";
import { useFormContext } from "react-hook-form";

import { SelectCalendar } from "@/features/common/components/SelectCalendar";
import Slider from "@mui/material/Slider";

export const AdvancedSearchInput = () => {
  const { setValue, watch } = useFormContext();

  const range = watch("range");

  return (
    <div className="flex flex-col w-full space-y-3 ">
      <FormTextInput type="text" name="content" label="Location / Address" />
      <div className="text-gray-700">
        {`$${range[0]} HKD to $${range[1]} HKD`} / hour
      </div>
      <Slider
        min={10}
        max={2000}
        value={range}
        step={20}
        className="text-theme-color1"
        onChange={(_, newValue) => setValue("range", newValue as number[])}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={(value) => value.toString()}
      />

      <FormTextInput type="number" name="numPpl" label="Number of visitors" />
      <SelectCalendar name="pickedDate" />
    </div>
  );
};
