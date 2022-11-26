import BallotIcon from "@mui/icons-material/Ballot";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import HistoryIcon from "@mui/icons-material/History";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Fade from "@mui/material/Fade";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRef, useState } from "react";
export const ManageRoomBox = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const session = useSession();
  const user = session.data?.user as User;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };
  return (
    <div>
      <Button
        className="hover:bg-link-bgHover"
        onClick={handleToggle}
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        ref={anchorRef}
      >
        <div className="text-lg text-link-normal transition  hover:scale-110 hover:text-red-500 py-2 px-2 rounded flex space-x-2 items-center">
          <MenuBookIcon />
          <span className="hidden md:block">Manage Booking</span>
        </div>
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        style={{ backgroundColor: "white", zIndex: "50" }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleClose}>
                    <Link
                      href={`/room-owner/${user.id}`}
                      passHref
                      className="text-lg text-link-normal py-2 px-2.5 rounded space-x-2"
                    >
                      <BallotIcon className="menu-bar-item-icon" />
                      <span>View and Manage Your Space</span>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link
                      href={`/room-owner/booking-history/${user.id}`}
                      passHref
                      className="text-lg text-link-normal py-2 px-2.5 rounded space-x-2"
                    >
                      <HistoryIcon className="menu-bar-item-icon" />{" "}
                      <span>Booking Record</span>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link
                      href="/chart-log"
                      passHref
                      className="text-lg text-link-normal py-2 px-2.5 rounded space-x-2"
                    >
                      <EqualizerIcon />
                      <span>Statistics</span>
                    </Link>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
};
