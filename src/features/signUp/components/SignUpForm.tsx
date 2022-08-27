import { createUser, createUserGoogleAuth } from "@/apis/api";
import { FormTextInput } from "@/features/common/components/input/FormTextInput";
import { ShowPassword } from "@/features/common/components/ShowPassword";
import { useSignUpResolver } from "@/features/signUp/schemas/useSignUpResolver";
import { SignUpInputTypes } from "@/features/signUp/types/signUpInputTypes";

import { useS3Upload } from "next-s3-upload";
import { useRouter } from "next/router";
import { useState } from "react";

import { FormProvider, useForm } from "react-hook-form";
import { CameraSvgIcon } from "@/features/signUp/components/svg/CameraSvgIcon";
import { GoogleButton } from "@/features/common/components/buttons/GoogleButton";
import { useDispatch, useSelector } from "react-redux";
import { loadingSelector } from "@/redux/loading";

export const SignUpForm = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector(loadingSelector);
  const [showPassword, setShowPassword] = useState(false);
  const { uploadToS3 } = useS3Upload();

  const signUpFormMethods = useForm<SignUpInputTypes>({
    resolver: useSignUpResolver(),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const profileImg = watch("profileImg");
  const updatedProfileImg = profileImg && profileImg.length === 1;

  const onSubmit = signUpFormMethods.handleSubmit(async (data) => {
    let imgUrl = "/default-profile-img.png";
    if (updatedProfileImg) {
      const { url } = await uploadToS3(profileImg[0]);
      imgUrl = url;
    }
    const res = await createUser({
      ...data,
      profileImg: imgUrl,
    });
    if (res && res.status === 201) {
      router.push("/login");
    }
  });

  return (
    <FormProvider {...signUpFormMethods}>
      <form onSubmit={onSubmit} className="flex flex-col space-y-3 w-full">
        <FormTextInput type="text" name="username" label="Username" />
        <FormTextInput type="email" name="email" label="Email Address" />
        <FormTextInput
          type={showPassword ? "text" : "password"}
          name="password"
          label="Password"
        />
        <FormTextInput
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          label="Confirm Password"
        />
        <ShowPassword
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        <div>
          <label
            htmlFor="fileUpload"
            className="flex items-center text-theme-color1 cursor-pointer space-x-1"
          >
            <CameraSvgIcon className="text-theme-color1 w-5 h-5" />
            <div>
              {updatedProfileImg ? "Uploaded" : "Upload Profile Picture"}
            </div>
          </label>
          <input
            className="hidden"
            id="fileUpload"
            type="file"
            {...register("profileImg")}
          />
        </div>
        <button
          className="bg-theme-color1 text-white py-2 rounded hover:bg-theme-color1/90 shadow"
          disabled={loading}
        >
          Sign Up
        </button>
      </form>
      <hr />
      <GoogleButton disabled={loading} />
    </FormProvider>
  );
};
