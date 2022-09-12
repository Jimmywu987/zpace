import { CreateRoomInputTypes } from "@/features/roomOwner/types/createRoomInputTypes";

import { useS3Upload } from "next-s3-upload";
import { useRouter } from "next/router";

import { FormProvider, useForm } from "react-hook-form";

import { useCreateRoomResolver } from "@/features/roomOwner/schemas/useCreateRoomResolver";
import { isLoading, loadingSelector } from "@/redux/loading";
import { useDispatch, useSelector } from "react-redux";
import { CreateRoomFormStepper } from "@/features/roomOwner/components/form/CreateRoomFormStepper";
import { CreateRoomFormStepOne } from "@/features/roomOwner/components/form/CreateRoomFormStepOne";
import { CreateRoomFormStepTwo } from "@/features/roomOwner/components/form/CreateRoomFormStepTwo";

export const CreateRoomForm = () => {
  const { register, watch } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector(loadingSelector);

  const { uploadToS3 } = useS3Upload();

  const createRoomFormMethods = useForm<CreateRoomInputTypes>({
    resolver: useCreateRoomResolver(),
    defaultValues: {
      step: 1,
      spaceName: "",
      address: "",
    },
  });

  const onSubmit = createRoomFormMethods.handleSubmit(async (data) => {
    dispatch(isLoading({ isLoading: true }));

    dispatch(isLoading({ isLoading: false }));
  });
  const step = createRoomFormMethods.watch("step");
  return (
    <FormProvider {...createRoomFormMethods}>
      <div className="">
        <CreateRoomFormStepper />
        {step === 1 && <CreateRoomFormStepOne />}
        {step === 2 && <CreateRoomFormStepTwo />}
      </div>
    </FormProvider>
  );
};
