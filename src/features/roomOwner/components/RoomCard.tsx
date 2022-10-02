import { RoomType } from "@/types/Room";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { RatingAndCommentOnRoom } from "@prisma/client";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import moment from "moment";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Link from "next/link";
import { WeeklyTimeSlotDisplay } from "./WeeklyTimeSlotDisplay";
import { ThemeTag } from "./ThemeTag";
import { deleteRoom } from "@/apis/api";
import { deleteFile } from "@/lib/s3Uploader";

const PERSPECTIVES = [
  {
    value: "visitorPerspective",
    label: "View as Renters/Other Visitors",
  },
  {
    value: "ownerPerspective",
    label: "View as Self",
  },
];

const RenderAvgRating = ({
  index,
  rating,
}: {
  index: number;
  rating: RatingAndCommentOnRoom[];
}) => {
  let sumRating = 0;
  for (let i = 0; i < rating.length; i++) {
    sumRating = sumRating + rating[i].rating;
  }
  let avgSum = Math.round(sumRating / rating.length);

  let num = 1;
  if (avgSum >= index) {
    num = 0;
  }
  return (
    <>
      {num === 1 ? (
        <StarBorderIcon className="text-theme-color2" />
      ) : (
        <StarIcon className="text-theme-color2" />
      )}
    </>
  );
};

export const RoomCard = ({ room }: { room: RoomType }) => {
  const session = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [perspective, setPerspective] = useState(PERSPECTIVES[1].value);
  const handleDeleteRoom = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPerspective(event.target.value);
    if (perspective === PERSPECTIVES[0].value) {
      router.push(`/room-detail/${room.id}`);
    }
  };
  const onClickDelete = async () => {
    const res = await deleteRoom({ roomId: room.id });
    if (res && res.status === 201) {
      room.roomImgs.map(async (img) => {
        await deleteFile(img.url);
      });
      router.reload();
      handleClose();
    }
  };
  return (
    <>
      <div className="border-2 border-gray-300 shadow-lg p-5 rounded mx-auto max-w-[1150px]">
        <div className="flex justify-between">
          <div className="">
            <span className="">
              Average Rating from {room.ratingAndComments.length}
              {room.ratingAndComments.length > 1 ? " visitors" : " visitor"}:
            </span>
            <div className="flex">
              {Array(5)
                .fill("")
                .map((_: number, index: number) => (
                  <div key={index}>
                    <RenderAvgRating
                      index={index}
                      rating={room.ratingAndComments}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div>
            <TextField
              select
              label={<VisibilityIcon />}
              value={perspective}
              onChange={handleChange}
              variant="outlined"
              SelectProps={{
                MenuProps: {
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                },
              }}
            >
              {PERSPECTIVES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
        <div className="">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} container>
              <div className="flex overflow-y-scroll space-x-3  scrollbar-thin scrollbar-thumb-theme-color1 scrollbar-track-gray-100">
                {room.roomImgs.map((img) => (
                  <img
                    src={img.url}
                    key={img.id}
                    alt="room-pictures"
                    className="object-contain w-96 h-96"
                  />
                ))}
              </div>
            </Grid>
            <Grid item xs={12} sm={12} container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <div className="flex space-x-10 my-6">
                    <div className="space-y-1">
                      <div>
                        <strong className="text-theme-color1 text-2xl">
                          {room.spaceName}
                        </strong>
                      </div>

                      <div className="text-gray-700 text-lg">
                        Address: {room.address}
                      </div>
                      <div className="text-gray-700 text-lg">
                        Hourly Rental:$
                        {room.hourlyPrice.toString().replace(/0+$/, "")[
                          room.hourlyPrice.toString().replace(/0+$/, "")
                            .length - 1
                        ] === "."
                          ? room.hourlyPrice.toString().replace(/.0+$/, "")
                          : room.hourlyPrice.toString().replace(/0+$/, "")}
                        /hr
                      </div>
                      <div className="text-gray-700 text-lg">
                        Capacity: {room.capacity}{" "}
                        {room.capacity! > 1 ? "persons" : "person"}
                      </div>
                      <div className="flex flex-col ">
                        <div className="flex space-x-1 flex-wrap items-center">
                          {room.wifi && <ThemeTag>Wifi</ThemeTag>}
                          {room.socketPlug && <ThemeTag>Socket Plug</ThemeTag>}
                          {room.airCondition && (
                            <ThemeTag>Air Condition</ThemeTag>
                          )}
                          {room.desk && <ThemeTag>Desk</ThemeTag>}
                        </div>
                        {!room.wifi &&
                          !room.socketPlug &&
                          !room.airCondition &&
                          !room.desk && (
                            <span>
                              No room facility is specified at the moment.
                            </span>
                          )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <WeeklyTimeSlotDisplay
                        weeklyTimeSlots={room.weeklyOpenTimeslots}
                      />

                      <div className="text-gray-700">
                        Current one-off rental services available:{" "}
                        {room.oneTimeOffOpenTimeslots.length}
                      </div>
                      <div className="space-y-2 flex flex-wrap">
                        {room.oneTimeOffOpenTimeslots.map((time) => {
                          return (
                            <div key={time.id}>
                              <ThemeTag>
                                {moment(time.date).format("MMMM Do YYYY") +
                                  " , " +
                                  moment(time.startTime, "HH:mm:ss").format(
                                    "LT"
                                  ) +
                                  " - " +
                                  moment(time.endTime, "HH:mm:ss").format("LT")}
                              </ThemeTag>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item>
                  <div className="flex justify-end items-center space-x-2">
                    <Typography variant="body2" style={{ cursor: "pointer" }}>
                      <Link
                        href={`/room-owner/manage-room/edit-room/${room.id}`}
                      >
                        <a className="flex items-center space-x-2 text-theme-color1 px-2 py-1 rounded hover:bg-gray-50">
                          <span className="">View Details and Edit</span>
                          <ModeEditIcon className="" />
                        </a>
                      </Link>
                    </Typography>
                    <Typography variant="subtitle1" className="cursor-pointer">
                      <DeleteForeverIcon
                        className="text-gray-600"
                        onClick={handleDeleteRoom}
                      />
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        className="flex justify-center items-center "
      >
        <div className="bg-white p-5 space-y-3 rounded">
          <h4 className="text-lg text-gray-800">
            Delete this space from your management system?
          </h4>
          <p className=" text-gray-800">
            Please be reminded that this action is
            <strong> irreversible. </strong>
            On your confirmation, this space will be deleted from Zpace.
            <br />
            You would have to submit a new form again to re-include it in the
            system in the future.
          </p>
          <div className="flex space-x-5 justify-end">
            <button
              onClick={handleClose}
              className="hover:bg-gray-50 font-normal text-lg px-2 py-1"
            >
              Close
            </button>
            <button
              className="hover:opacity-50 bg-red-500 text-white font-normal text-lg px-2 py-1 "
              onClick={onClickDelete}
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
