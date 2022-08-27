import {
  EyeSvgIcon,
  ClosedEyeSvgIcon,
} from "@/features/login/components/svg/NewSignSvg";

import { Dispatch, SetStateAction } from "react";
export const ShowPassword = ({
  showPassword,
  setShowPassword,
}: {
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <span
      className="flex items-center space-x-1 cursor-pointer mx-2"
      onClick={() => {
        setShowPassword((show) => !show);
      }}
    >
      {!showPassword ? (
        <EyeSvgIcon className="text-gray-600 w-5 h-5" />
      ) : (
        <ClosedEyeSvgIcon className="text-gray-600 w-5 h-5" />
      )}
      <span className="text-sm text-gray-600">
        {showPassword ? "Hide" : "Show"} Password
      </span>
    </span>
  );
};
