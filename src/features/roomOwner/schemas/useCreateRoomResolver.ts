import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const useCreateRoomResolver = () => {
  return yupResolver(
    yup.object({
      step: yup.number().required(),
      spaceName: yup.string().required("Space name is required"),
      address: yup.string().required("Address is required"),
      district: yup.string().required("District is required"),
      capacity: yup.number().positive().required(),
    })
  );
};
