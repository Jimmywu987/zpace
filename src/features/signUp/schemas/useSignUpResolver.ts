import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const useSignUpResolver = () => {
  return yupResolver(
    yup.object({
      username: yup
        .string()
        .max(20, "username input exceed 20 letters")
        .required("Username is required"),
      email: yup
        .string()
        .email("invalid email address")
        .required("Email Address is required"),
      password: yup
        .string()
        .min(8, "At least 8-digit password is required")
        .required("Password is required"),
      confirmPassword: yup
        .string()
        // .min(8, "At least 8-digit password is required")
        .oneOf([yup.ref("password"), null], "Passwords don't match")
        .required("Confirm Password is required"),
      profileImg: yup.mixed(),
    })
  );
};
