import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const useEditRoomResolver = () => {
  return yupResolver(
    yup.object({
      step: yup.number().required(),
      spaceName: yup.string().required("Space name is required"),
      address: yup.string().required("Address is required"),
      district: yup.string().required("District is required"),
      description: yup.string().optional(),
      capacity: yup
        .number()
        .positive("Please input capacity")
        .required("Please input capacity"),
      hourlyPrice: yup
        .number()
        .positive("Please input rental hourly")
        .required("Please input rental hourly"),
      wifi: yup.boolean(),
      desk: yup.boolean(),
      socketPlug: yup.boolean(),
      airCondition: yup.boolean(),
      selectedFile: yup.array().when("step", {
        is: 0,
        then: yup.array().optional(),
        otherwise: yup.array().min(1).required(),
      }),
      weeklyTimeAvailability: yup.array().when("step", {
        is: 0,
        then: yup.array().optional(),
        otherwise: yup.array().min(1).required(),
      }),
      oneTimeAvailability: yup.array().optional(),
    })
  );
};
