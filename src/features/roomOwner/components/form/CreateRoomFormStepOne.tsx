import { DistrictListBox } from "@/features/common/components/DistrictListBox";
import { FormTextInput } from "@/features/common/components/input/FormTextInput";
import * as React from "react";

export const CreateRoomFormStepOne = () => {
  return (
    <div className="flex flex-col space-y-3 w-full">
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
    </div>
  );
};
