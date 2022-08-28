import { signIn } from "next-auth/react";

import { GoogleSvgIcon } from "@/features/common/components/buttons/svg/GoogleSvgIcon";
export const GoogleButton = ({ disabled }: { disabled: boolean }) => {
  return (
    <button
      className="cursor-pointer py-2 rounded shadow flex items-center w-full justify-center space-x-2 hover:bg-gray-50 "
      onClick={() => {
        signIn("google", { callbackUrl: "/" });
      }}
      disabled
    >
      <GoogleSvgIcon className="w-5 h-5" />
      <span className="text-gray-600">Sign in with Google</span>
    </button>
  );
};
