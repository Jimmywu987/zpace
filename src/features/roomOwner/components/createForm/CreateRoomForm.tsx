import { CreateRoomFormInputTypes } from "@/features/roomOwner/types/createRoomFormInputTypes";

import { FormProvider, useForm } from "react-hook-form";

import { CreateRoomFormStepOne } from "@/features/roomOwner/components/createForm/CreateRoomFormStepOne";
import { FormStepper } from "@/features/roomOwner/components/form/FormStepper";
import { CreateRoomFormStepTwo } from "@/features/roomOwner/components/createForm/CreateRoomFormStepTwo";
import { useCreateRoomResolver } from "@/features/roomOwner/schemas/useCreateRoomResolver";

const STEPS = [
  "Basic Information of Your Space",
  "Photos and Rental Services Availability",
];

export const CreateRoomForm = () => {
  const createRoomFormMethods = useForm<CreateRoomFormInputTypes>({
    resolver: useCreateRoomResolver(),
    defaultValues: {
      step: 0,
      spaceName: "",
      address: "",
      district: "",
      capacity: 0,
      hourlyPrice: 0,
      description: "",
      wifi: false,
      desk: false,
      socketPlug: false,
      airCondition: false,
      selectedFile: [],
      weeklyTimeAvailability: [],
      oneTimeAvailability: [],
    },
  });

  const step = createRoomFormMethods.watch("step");
  return (
    <FormProvider {...createRoomFormMethods}>
      <div className="">
        <FormStepper labels={STEPS} />
        <div className="max-w-[860px] mx-auto">
          {step === 0 && <CreateRoomFormStepOne />}
          {step === 1 && <CreateRoomFormStepTwo />}
        </div>
      </div>
    </FormProvider>
  );
};
