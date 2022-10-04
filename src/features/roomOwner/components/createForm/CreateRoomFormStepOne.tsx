import { DistrictListBox } from "@/features/common/components/DistrictListBox";
import { FormTextInput } from "@/features/common/components/input/FormTextInput";
import * as React from "react";
import { CheckBox } from "@/features/roomOwner/components/createForm/CheckBox";
import { useFormContext } from "react-hook-form";
import { SubmitButton } from "@/features/common/components/buttons/SubmitButton";
import { CreateRoomFormInputTypes } from "@/features/roomOwner/types/createRoomFormInputTypes";

export const CreateRoomFormStepOne = () => {
  const { handleSubmit, reset, setValue } =
    useFormContext<CreateRoomFormInputTypes>();
  const onSubmit = handleSubmit(() => {
    setValue("step", 1);
  });

  return (
    <div className="flex flex-col space-y-3 mx-2 md:mx-0">
      <FormTextInput
        type="text"
        name="spaceName"
        label="Name of Space"
        className="py-3 px-3"
      />
      <FormTextInput
        type="text"
        name="address"
        label="Address"
        className="py-3 px-3"
      />
      <label className="text-gray-700 space-y-1">
        <span>District:</span>
        <DistrictListBox name="district" label="" />
      </label>
      <FormTextInput
        type="number"
        name="capacity"
        label="Capacity(no. of visitors)"
        className="py-3 px-3"
      />
      <FormTextInput
        type="number"
        name="hourlyPrice"
        label="Input hourly rental ($/hour)*"
        className="py-3 px-3"
      />
      <FormTextInput
        type="text"
        name="description"
        label="Addition description of your space"
        className="py-3 px-3"
      />
      <div className="flex flex-col md:flex-row md:items-center space-x-4">
        <div className="text-gray-700">Facilities Available:</div>
        <CheckBox name="airCondition" label="air-conditioner" />
        <CheckBox name="wifi" label="wifi" />
        <CheckBox name="desk" label="desk" />
        <CheckBox name="socketPlug" label="socket plug" />
      </div>
      <div className="flex items-center space-x-3 justify-end">
        <button
          className="font-medium rounded hover:bg-gray-50 px-2 py-1"
          onClick={() => reset()}
        >
          RESET FORM
        </button>
        <SubmitButton onClick={onSubmit} className="px-3">
          NEXT
        </SubmitButton>
      </div>
    </div>
  );
};
