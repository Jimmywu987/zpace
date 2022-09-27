import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CloseIcon from "@mui/icons-material/Close";
import { ChangeEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import { RenderPreview } from "@/features/roomOwner/components/form/RenderPreview";
import { OneTimeTypes } from "@/features/roomOwner/types/oneTimeTypes";
import { WeeklyTimeTypes } from "@/features/roomOwner/types/weeklyTimeTypes";
import { RenderWeeklyTime } from "@/features/roomOwner/components/form/RenderWeeklyTime";
import { RenderOneTime } from "@/features/roomOwner/components/form/RenderOneTime";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useFormContext } from "react-hook-form";
import { CreateRoomFormButton } from "@/features/roomOwner/components/form/CreateRoomFormButton";

export const CreateRoomFormStepTwo = () => {
  const { formState, setValue, watch } = useFormContext();
  const { errors } = formState;

  const selectedFile: File[] = watch("selectedFile");
  const weeklyTimeAvailability: WeeklyTimeTypes[] = watch(
    "weeklyTimeAvailability"
  );
  const oneTimeAvailability: OneTimeTypes[] = watch("oneTimeAvailability");
  const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) {
      return;
    }
    const selectedFiles = Array.from(files).concat(selectedFile);
    setValue("selectedFile", selectedFiles);
  };
  const removeFile = (fileName: string) => {
    setValue(
      "selectedFile",
      selectedFile.filter((file) => fileName !== file.name)
    );
  };
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
  const removeWeeklyTimeSlot = (index: number) => {
    setValue(
      "weeklyTimeAvailability",
      weeklyTimeAvailability.filter((_, indx) => index !== indx)
    );
  };
  const removeOneTimeSlot = (index: number) => {
    setValue(
      "oneTimeAvailability",
      oneTimeAvailability.filter((_, indx) => index !== indx)
    );
  };

  return (
    <div className="flex flex-col space-y-3 my-3">
      <div className="text-2xl text-gray-700">Details about Your Space</div>
      <div>
        <div className="flex flex-col">
          <label
            htmlFor="space-img"
            className="flex items-center space-x-2 cursor-pointer"
          >
            <CameraAltIcon className="text-theme-color1 w-16 h-16" />
            <span className="px-3 py-1 text-white bg-theme-color1 rounded">
              Upload Photos of Your Space
            </span>
          </label>
          <input
            type="file"
            multiple
            id="space-img"
            className="hidden"
            onChange={onSelectFile}
          />
          {errors["selectedFile"] && (
            <div className="text-red-400 text-sm">
              Please upload space's photo
            </div>
          )}
        </div>
        {selectedFile.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {selectedFile.map((file, index: number) => (
              <div className="relative" key={index}>
                <CloseIcon
                  className="absolute text-gray-600 top-2 left-2 cursor-pointer rounded-full p-1 bg-white"
                  onClick={() => {
                    removeFile(file.name);
                  }}
                />
                <RenderPreview render={file} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <button
            className="text-white bg-theme-color1 w-full rounded p-2 text-lg flex justify-start items-center"
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
      <CreateRoomFormButton />
    </div>
  );
};
