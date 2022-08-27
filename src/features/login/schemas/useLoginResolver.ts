import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const useLoginResolver = () => {
  return yupResolver(
    yup.object({
      email: yup
        .string()
        .email("Incorrect email Address")
        .required("Email Address is required"),
      password: yup.string().required("Password is required"),
    })
  );
};
