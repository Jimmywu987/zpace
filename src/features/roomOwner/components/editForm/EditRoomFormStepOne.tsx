import { DistrictListBox } from "@/features/common/components/DistrictListBox";
import { FormTextInput } from "@/features/common/components/input/FormTextInput";
import * as React from "react";
import { CheckBox } from "@/features/roomOwner/components/createForm/CheckBox";
import { useFormContext } from "react-hook-form";
import { SubmitButton } from "@/features/common/components/buttons/SubmitButton";
import { EditRoomFormInputTypes } from "@/features/roomOwner/types/editRoomFormInputTypes";

export const EditRoomFormStepOne = () => {
  const { handleSubmit, setValue } = useFormContext<EditRoomFormInputTypes>();
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
      <div className="flex flex-col md:flex-row md:items-center space-x-4 space-y-2 md:space-y-0">
        <div className="text-gray-700">Facilities Available:</div>
        <CheckBox name="airCondition" label="air-conditioner" />
        <CheckBox name="wifi" label="wifi" />
        <CheckBox name="desk" label="desk" />
        <CheckBox name="socketPlug" label="socket plug" />
      </div>
      <div className="flex items-center space-x-3 justify-end">
        <SubmitButton onClick={onSubmit} className="px-3">
          NEXT
        </SubmitButton>
      </div>
    </div>
  );
};
