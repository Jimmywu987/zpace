import MenuBookIcon from "@mui/icons-material/MenuBook";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import HistoryIcon from "@mui/icons-material/History";
import { useState } from "react";
import { NavButton } from "@/features/nav/components/button/NavButton";

export const ManageRoomBox = () => {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <NavButton onClick={openModal} className="flex items-center space-x-2">
        <MenuBookIcon />
        <span>Manage Booking</span>
      </NavButton>
    </div>
  );
};
