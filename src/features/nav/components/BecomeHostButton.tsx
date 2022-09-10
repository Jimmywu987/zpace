import Dialog from "@mui/material/Dialog";
import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { NavButton } from "@/features/nav/components/button/NavButton";
import { SubmitButton } from "@/features/common/components/buttons/SubmitButton";
import { becomeHost } from "@/apis/api";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
export const BecomeHostBox = ({
  onClickConfirm,
}: {
  onClickConfirm: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const openModal = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const checkBoxOnChange = () => {
    setChecked((check) => !check);
  };

  return (
    <div>
      <NavButton onClick={openModal}>Become a host</NavButton>
      <Dialog open={open} onClose={handleClose}>
        <div className="flex flex-col p-4 space-y-5">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-medium text-theme-color1">
              Become a host on Zpace
            </h4>
            <CloseIcon onClick={handleClose} className="cursor-pointer" />
          </div>
          <p>
            By becoming a Host to on Zpace, you will be able to rent out your
            space, implying that you agree with Zpace's terms and conditions.
          </p>
          <div className="flex space-x-2 items-center">
            <input
              type="checkbox"
              className="w-4 h-4 accent-theme-color1 text-theme-color1"
              onChange={checkBoxOnChange}
              checked={checked}
            />
            <label>I agree to Zpace's Terms and Conditions.</label>
          </div>
          <SubmitButton
            onClick={async () => {
              await onClickConfirm();
              handleClose();
            }}
            disabled={!checked}
          >
            Confirm
          </SubmitButton>
        </div>
      </Dialog>
    </div>
  );
};
