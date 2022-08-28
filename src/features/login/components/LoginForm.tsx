import { useForm, FormProvider } from "react-hook-form";
import { LoginInputTypes } from "@/features/login/types/loginInputTypes";
import { useLoginResolver } from "@/features/login/schemas/useLoginResolver";
import { FormTextInput } from "@/features/common/components/input/FormTextInput";
import { useState } from "react";
import { ShowPassword } from "@/features/common/components/ShowPassword";
import { signIn } from "next-auth/react";
import { GoogleButton } from "@/features/common/components/buttons/GoogleButton";
import { useDispatch, useSelector } from "react-redux";
import { loadingSelector, isLoading } from "@/redux/loading";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(loadingSelector);
  const [showPassword, setShowPassword] = useState(false);

  const loginFormMethods = useForm<LoginInputTypes>({
    resolver: useLoginResolver(),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = loginFormMethods.handleSubmit(async (data) => {
    dispatch(isLoading({ isLoading: true }));
    console.log({data});

    await signIn("credentials", {
      ...data,
      // callbackUrl: "/",
    });
    dispatch(isLoading({ isLoading: false }));
  });

  return (
    <FormProvider {...loginFormMethods}>
      <form onSubmit={onSubmit} className="flex flex-col space-y-3 w-full">
        <FormTextInput type="email" name="email" label="Email Address" />
        <FormTextInput
          type={showPassword ? "text" : "password"}
          name="password"
          label="Password"
        />
        <ShowPassword
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        <button
          className="bg-theme-color1 text-white py-2 rounded hover:bg-theme-color1/90 shadow-xl"
          type="submit"
          disabled={loading}
        >
          Login
        </button>
      </form>
      <hr />
      <GoogleButton disabled={loading} />
    </FormProvider>
  );
};
