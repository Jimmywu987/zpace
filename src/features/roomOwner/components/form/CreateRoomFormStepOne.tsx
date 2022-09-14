import { FormTextInput } from "@/features/common/components/input/FormTextInput";

export const CreateRoomFormStepOne = () => {
  return (
    <div className="flex flex-col space-y-3 w-full">
      <FormTextInput type="text" name="spaceName" label="Name of Space" />
      <FormTextInput type="text" name="address" label="Address" />
    </div>
  );
};
