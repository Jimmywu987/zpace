import { CreateRoomFormButton } from "@/features/roomOwner/components/createForm/CreateRoomFormButton";
import { RenderPreview } from "@/features/roomOwner/components/createForm/RenderPreview";
import { OneTimeAvailabilityInput } from "@/features/roomOwner/components/form/OneTimeAvailabilityInput";
import { WeeklyTimeAvailabilityInput } from "@/features/roomOwner/components/form/WeeklyTimeAvailabilityInput";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CloseIcon from "@mui/icons-material/Close";
import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";

export const CreateRoomFormStepTwo = () => {
  const { formState, setValue, watch } = useFormContext();
  const { errors } = formState;

  const selectedFile: File[] = watch("selectedFile");

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
      <WeeklyTimeAvailabilityInput />
      <OneTimeAvailabilityInput />
      <CreateRoomFormButton />
    </div>
  );
};
