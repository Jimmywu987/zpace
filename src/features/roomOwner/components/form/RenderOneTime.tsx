import { ChangeEvent } from "react";

import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { OneTimeTypes } from "@/features/roomOwner/types/oneTimeTypes";
import {
  HALF_DAY,
  START_HOUR,
  START_MINUTE,
} from "@/features/roomOwner/constants/timeSelection";
import { d2 } from "@/helpers/d2";

export const RenderOneTime = (props: {
  oneTimeAvailability: OneTimeTypes;
  setOneTimeAvailability: (state: OneTimeTypes) => void;
}) => {
  const handleValue = (name: string) => {
    return {
      name: name,
      value: (props.oneTimeAvailability as any)[name],
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        props.setOneTimeAvailability({
          ...props.oneTimeAvailability,
          [name]: value,
        });
      },
    };
  };

  return (
    <div className="py-3 space-y-2">
      <div className="text-lg">
        Decide available time slot(on a particular day):
      </div>

      <div>
        <TextField
          id="date"
          {...handleValue("oneOffDate")}
          label="Date Available"
          type="date"
          inputProps={{
            min: `${new Date().getFullYear()}-${d2(
              new Date().getMonth() + 1
            )}-${d2(new Date().getDate())}`,
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="space-y-1">
        <div className="text-gray-700">Start at:</div>

        <div className="flex space-x-4">
          <TextField
            select
            label="Select"
            {...handleValue("oneOffStartHr")}
            helperText="Select start time of each time slot (hour)"
            variant="outlined"
          >
            {START_HOUR.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Select"
            {...handleValue("oneOffStartMin")}
            helperText="Select start time of each time slot (minutes)"
            variant="outlined"
          >
            {START_MINUTE.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Select"
            {...handleValue("halfOneDayOne")}
            helperText="Select A.M./P.M."
            variant="outlined"
          >
            {HALF_DAY.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="space-y-1">
          <div className="text-gray-700">End at:</div>

          <div className="flex space-x-4">
            <TextField
              select
              label="Select"
              {...handleValue("oneOffEndHr")}
              helperText="Select end time of each time slot (hour)"
              variant="outlined"
            >
              {START_HOUR.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Select"
              {...handleValue("oneOffEndMin")}
              helperText="Select end time of each time slot (minutes)"
              variant="outlined"
            >
              {START_MINUTE.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Select"
              {...handleValue("halfOneDayTwo")}
              helperText="Select A.M./P.M."
              variant="outlined"
            >
              {HALF_DAY.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
      </div>
    </div>
  );
};
