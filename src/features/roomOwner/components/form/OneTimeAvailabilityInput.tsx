import { RenderOneTime } from "@/features/roomOwner/components/createForm/RenderOneTime";
import { OneTimeTypes } from "@/features/roomOwner/types/oneTimeTypes";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useFormContext } from "react-hook-form";

export const OneTimeAvailabilityInput = () => {
  const { setValue, watch } = useFormContext();

  const addOneOffTime = () => {
    if (oneTimeAvailability.length < 5) {
      setValue(
        "oneTimeAvailability",
        oneTimeAvailability.concat({
          halfOneDayOne: "",
          halfOneDayTwo: "",
          oneOffStartHr: "",
          oneOffStartMin: "",
          oneOffEndHr: "",
          oneOffEndMin: "",
          oneOffDate: "",
        })
      );
    }
  };
  const oneTimeAvailability: OneTimeTypes[] = watch("oneTimeAvailability");
  const removeOneTimeSlot = (index: number) => {
    setValue(
      "oneTimeAvailability",
      oneTimeAvailability.filter((_, indx) => index !== indx)
    );
  };
  return (
    <div className="flex flex-col space-y-4">
      <button
        className="text-white bg-theme-color1 w-full rounded py-2 text-lg p-2 flex justify-start items-center"
        onClick={addOneOffTime}
      >
        <AddIcon />
        <span>
          Click to add one-off service time slot (e.g. 24/11/2020, 3p.m. to
          5p.m.)
        </span>
      </button>
      {oneTimeAvailability.length > 0 && (
        <div className="flex flex-col space-y-4">
          {oneTimeAvailability.map((state, index: number) => {
            return (
              <div key={index} className="border-b-gray-400 border-b">
                <RenderOneTime
                  oneTimeAvailability={state}
                  setOneTimeAvailability={(state) => {
                    let newOneTimeAvailability = oneTimeAvailability.slice();
                    newOneTimeAvailability[index] = state;
                    setValue("oneTimeAvailability", newOneTimeAvailability);
                  }}
                />
                <div className="flex justify-end">
                  <DeleteForeverIcon
                    className="text-gray-700 h-8 w-8 cursor-pointer"
                    onClick={() => removeOneTimeSlot(index)}
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
