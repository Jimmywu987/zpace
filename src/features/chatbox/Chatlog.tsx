import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { DialogActions } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";


export const Chatlog = () => {
  const [modalOpen, setModalOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    toast.error("I am not a host now!");
  }

  function beHost() {
    setModalOpen(false);
    toast.success("I am a host now!");
  }

  return (
    <>
      <button
        onClick={openModal}
        className="hidden sm:block absolute right-10 transition hover:bg-link-bgHover text-lg text-link-normal hover:scale-110 hover:text-red-500 py-2 px-2.5 rounded"
      >
        Message
      </button>
      <Dialog
        open={modalOpen}
        // onAfterOpen={afterOpenModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Join us by becoming a host with Zpace!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By becoming a Host at Zpace, you will be able to share your free
            workspace with certified users, implying that you agree with Zpace's
            terms and conditions.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Disagree</Button>
          <Button onClick={beHost} autoFocus={true}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

