import BallotIcon from "@mui/icons-material/Ballot";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import HistoryIcon from "@mui/icons-material/History";
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
import { NavButton } from "./button/NavButton";

export const ChatBox = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const session = useSession();
  const user = session.data?.user as User;

  return (
    <NavButton>
      <Link href={`/chats`}>Inbox</Link>
    </NavButton>
  );
};
