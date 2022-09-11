import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import { SubmitButton } from "@/features/common/components/buttons/SubmitButton";
import { NavButton } from "@/features/nav/components/button/NavButton";
import CloseIcon from "@mui/icons-material/Close";
import { updateUserInfo, updateUserSession } from "@/apis/api";
import { getSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { updateUser } from "@/redux/user";
import { User } from "@prisma/client";
export const BecomeHostBox = () => {
  const dispatch = useDispatch();
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
  const onClickConfirm = async () => {
    const res = await updateUserInfo({
      isRoomOwner: true,
    });
    if (res && res.status === 201) {
      await updateUserSession({
        isRoomOwner: true,
      });
      const session = await getSession();
      const { isRoomOwner } = session?.user as Partial<User>;
      dispatch(updateUser({ isRoomOwner }));
      handleClose();
      return;
    }
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
          <SubmitButton onClick={onClickConfirm} disabled={!checked}>
            Confirm
          </SubmitButton>
        </div>
      </Dialog>
    </div>
  );
};
