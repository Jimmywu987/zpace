import { ChangeEvent } from "react";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { WeeklyTimeTypes } from "@/features/roomOwner/types/weeklyTimeTypes";
import {
  HALF_DAY,
  START_HOUR,
  START_MINUTE,
} from "@/features/roomOwner/constants/timeSelection";

export const RenderWeeklyTime = (props: {
  weeklyTimeAvailability: WeeklyTimeTypes;
  setWeeklyTimeAvailability: (state: WeeklyTimeTypes) => void;
}) => {
  const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } =
    props.weeklyTimeAvailability;

  const handleChecked = (name: string) => {
    return {
      name: name,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        props.setWeeklyTimeAvailability({
          ...props.weeklyTimeAvailability,
          [name]: event.target.checked,
        });
      },
    };
  };

  const handleValue = (name: string) => {
    return {
      name: name,
      value: (props.weeklyTimeAvailability as any)[name],
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        props.setWeeklyTimeAvailability({
          ...props.weeklyTimeAvailability,
          [name]: value,
        });
      },
    };
  };

  return (
    <div className=" py-3">
      <div className="text-md md:text-lg">
        Decide available time slot(repeated weekly):
      </div>
      <span>For this timeslot, the room is available on each: </span>
      <div className="flex flex-wrap my-2">
        <div>
          <Checkbox
            checked={monday}
            color="primary"
            {...handleChecked("monday")}
          />
          <label>Monday</label>
        </div>
        <div>
          <Checkbox
            checked={tuesday}
            color="primary"
            {...handleChecked("tuesday")}
          />
          <label>Tuesday</label>
        </div>
        <div>
          <Checkbox
            checked={wednesday}
            color="primary"
            {...handleChecked("wednesday")}
          />
          <label>Wednesday</label>
        </div>
        <div>
          <Checkbox
            checked={thursday}
            color="primary"
            {...handleChecked("thursday")}
          />
          <label>Thursday</label>
        </div>
        <div>
          <Checkbox
            checked={friday}
            color="primary"
            {...handleChecked("friday")}
          />
          <label>Friday</label>
        </div>
        <div>
          <Checkbox
            checked={saturday}
            color="primary"
            {...handleChecked("saturday")}
          />
          <label>Saturday</label>
        </div>
        <div>
          <Checkbox
            checked={sunday}
            color="primary"
            {...handleChecked("sunday")}
          />
          <label>Sunday</label>
        </div>
      </div>
      <div className="space-y-2">
        <div className="space-y-1">
          <div className="text-gray-700">Start at:</div>

          <div className="flex space-x-2 md:space-x-4">
            <TextField
              select
              label="Select"
              {...handleValue("weekStartHr")}
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
              {...handleValue("weekStartMin")}
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
              id="select-weekend-id"
              select
              label="Select"
              {...handleValue("weekHalfDayOne")}
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
        <div className="space-y-1">
          <div className="text-gray-700">End at:</div>

          <div className="flex  space-x-2 md:space-x-4">
            <TextField
              select
              label="Select"
              {...handleValue("weekEndHr")}
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
              {...handleValue("weekEndMin")}
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
              {...handleValue("weekHalfDayTwo")}
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
