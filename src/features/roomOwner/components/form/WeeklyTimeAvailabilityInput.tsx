import { RenderWeeklyTime } from "@/features/roomOwner/components/createForm/RenderWeeklyTime";
import { WeeklyTimeTypes } from "@/features/roomOwner/types/weeklyTimeTypes";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useFormContext } from "react-hook-form";

export const WeeklyTimeAvailabilityInput = () => {
  const { formState, setValue, watch } = useFormContext();
  const { errors } = formState;
  const weeklyTimeAvailability: WeeklyTimeTypes[] = watch(
    "weeklyTimeAvailability"
  );
  const addWeeklyTime = () => {
    if (weeklyTimeAvailability.length < 5) {
      setValue(
        "weeklyTimeAvailability",
        weeklyTimeAvailability.concat({
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false,
          weekStartHr: "",
          weekStartMin: "",
          weekEndHr: "",
          weekEndMin: "",
          weekHalfDayOne: "",
          weekHalfDayTwo: "",
        })
      );
    }
  };
  const removeWeeklyTimeSlot = (index: number) => {
    setValue(
      "weeklyTimeAvailability",
      weeklyTimeAvailability.filter((_, indx) => index !== indx)
    );
  };
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <button
          className="text-white bg-theme-color1 w-full rounded p-2 text-md md:text-lg flex space-x-2 md:space-x-0 justify-start items-center"
          onClick={addWeeklyTime}
        >
          <AddIcon />
          <span>
            Click to add weekly rent service time slot (e.g. Monday to Friday,
            3p.m. to 5p.m.)
          </span>
        </button>
        {errors["weeklyTimeAvailability"] && (
          <div className="text-red-400 text-sm">
            Please add your space weekly time slot
          </div>
        )}
      </div>
      {weeklyTimeAvailability.length > 0 && (
        <div className="flex flex-col space-y-4">
          {weeklyTimeAvailability.map((state, index: number) => {
            return (
              <div key={index} className="border-b-gray-400 border-b ">
                <RenderWeeklyTime
                  weeklyTimeAvailability={state}
                  setWeeklyTimeAvailability={(state) => {
                    let newWeeklyTimeAvailability =
                      weeklyTimeAvailability.slice();
                    newWeeklyTimeAvailability[index] = state;
                    setValue(
                      "weeklyTimeAvailability",
                      newWeeklyTimeAvailability
                    );
                  }}
                />
                <div className="flex justify-end">
                  <DeleteForeverIcon
                    className="text-gray-700 h-8 w-8 cursor-pointer"
                    onClick={() => removeWeeklyTimeSlot(index)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
