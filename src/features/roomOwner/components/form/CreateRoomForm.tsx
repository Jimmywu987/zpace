import { CreateRoomInputTypes } from "@/features/roomOwner/types/createRoomInputTypes";

import { FormProvider, useForm } from "react-hook-form";

import { CreateRoomFormStepOne } from "@/features/roomOwner/components/form/CreateRoomFormStepOne";
import { CreateRoomFormStepper } from "@/features/roomOwner/components/form/CreateRoomFormStepper";
import { CreateRoomFormStepTwo } from "@/features/roomOwner/components/form/CreateRoomFormStepTwo";
import { useCreateRoomResolver } from "@/features/roomOwner/schemas/useCreateRoomResolver";

export const CreateRoomForm = () => {
  const createRoomFormMethods = useForm<CreateRoomInputTypes>({
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
        <CreateRoomFormStepper />
        <div className="max-w-[860px] mx-auto">
          {step === 0 && <CreateRoomFormStepOne />}
          {step === 1 && <CreateRoomFormStepTwo />}
        </div>
      </div>
    </FormProvider>
  );
};
