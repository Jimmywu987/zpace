import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const useSearchMapFormResolver = () => {
  return yupResolver(
    yup.object({
      content: yup.string().optional(),
      range: yup.array().min(2).of(yup.number()).required(),
      numPpl: yup.number().optional(),
      pickedDate: yup.string().optional(),
    })
  );
};
