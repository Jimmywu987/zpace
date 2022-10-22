import { settingSelector, toSet } from "@/redux/setting";
import { getRoomInfoById } from "@/services/getRoom";
import { User } from "@/types/User";
import { GetServerSideProps } from "next";
import React, { useState, ChangeEvent, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import { getSession, useSession } from "next-auth/react";
import Carousel from "react-bootstrap/Carousel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import InfoIcon from "@mui/icons-material/Info";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { RenderAvgRating } from "@/features/common/components/RenderAvgRating";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Chip from "@mui/material/Chip";
import WifiIcon from "@mui/icons-material/Wifi";
import PowerIcon from "@mui/icons-material/Power";
import AirIcon from "@mui/icons-material/Air";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import { likeRoom, unlikeRoom } from "@/apis/api";
import { DateBookingSection } from "@/features/room/components/DateBookingSection";
import { prisma } from "@/services/prisma";
import { TimeslotStatusEnum } from "@prisma/client";
import { CommentGrid } from "@/features/room/components/CommentGrid";
import { RatingAndComments, RoomDetailPageProps } from "@/features/room/types";

const StarRender = ({
  ratingState,
  index,
}: {
  ratingState: number | null;
  index: number;
}) => {
  let num = 1;
  if (!ratingState) {
    num = 1;
  } else if (ratingState >= index) {
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
const RoomDetailPage = (props: RoomDetailPageProps) => {
  const { roomInfo, canRate } = props;
  const { roomImgs, userId, ratingAndComments, spaceName, district, address } =
    roomInfo;
  const session = useSession();
  const dispatch = useDispatch();

  const bookingVisitorsRef = useRef<HTMLInputElement | null>(null);
  const chatRef = useRef<HTMLInputElement | null>(null);
  const commentRef = useRef<HTMLInputElement | null>(null);
  const { setting } = useSelector(settingSelector);
  const [pickedDate, setPickedDate] = useState(false);
  const [viewBox, setViewBox] = useState(0);
  const [ratingState, setRatingState] = useState<null | number>(null);

  const [toSubmit, setToSubmit] = useState(false);
  const [submitRatingAlert, setSubmitRatingAlert] = useState(false);

  const [pickDate, setPickDate] = useState("");
  const [isLiked, setIsLiked] = useState("");

  const currentUser = session.data?.user as User;
  console.log("roomInfo", roomInfo);
  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setViewBox(newValue);
  };
  const isAuthenticated = session.status === "authenticated";
  const ifUserIsHost = currentUser && userId === currentUser.id;
  const onClickSubmit = () => {
    if (bookingVisitorsRef.current?.value) {
      dispatch(
        toSet({
          setting: {
            ppl: Number(bookingVisitorsRef.current?.value),
            priceRg: setting.priceRg,
            date: setting.date,
          },
        })
      );
      setToSubmit(true);
    }
  };

  const onClickUnlike = async (likeId: string) => {
    const res = await unlikeRoom({ id: likeId });
    if (res && res.status === 200) {
      setIsLiked("");
    }
  };
  const onClickLike = async (roomId: string) => {
    const res = await likeRoom({ roomId });
    if (res && res.status === 200) {
      const { id } = res.data;
      setIsLiked(id);
    }
  };
  const starRatingOnClick = (index: number) => {
    setRatingState(index);
  };
  const pickDayFun = (message: string) => {
    setPickDate(message);
  };
  const onSubmitChat = async () => {};
  const onSubmitRating = async () => {};
  return (
    <>
      {ifUserIsHost && (
        <Alert severity="warning">
          <strong>
            <div className="">
              This read-only page is for the space's host to know how is the
              space displayed to visitors.
            </div>
          </strong>
        </Alert>
      )}
      <br />
      {roomImgs.length === 0 && (
        <Container className="">
          <MapsHomeWorkIcon className="w-20 h-20 text-theme-color1" />
        </Container>
      )}
      {roomImgs.length > 0 && (
        <Carousel
          indicators={false}
          prevIcon={
            <i className="fas direction-icon fa-chevron-circle-left"></i>
          }
          nextIcon={
            <i className="fas direction-icon fa-chevron-circle-right"></i>
          }
        >
          {roomImgs.map((img, index: number) => {
            return (
              <Carousel.Item className="" key={index}>
                <img src={img.url} alt="First slide pict" />
              </Carousel.Item>
            );
          })}
        </Carousel>
      )}

      <div className="">
        <Tabs
          value={viewBox}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<InfoIcon />} label="Overview" />
          <Tab icon={<RateReviewIcon />} label="Contact Host"></Tab>
        </Tabs>
      </div>

      {viewBox === 0 && (
        <div>
          <div>
            <h2>{spaceName}</h2>
            <div>
              {Array(5)
                .fill("")
                .map((_: number, index: number) => (
                  <div key={index}>
                    <RenderAvgRating index={index} rating={ratingAndComments} />
                  </div>
                ))}
            </div>
            <div>
              {ratingAndComments.length}{" "}
              {ratingAndComments.length > 1 ? "visitors rate" : "visitor rates"}{" "}
              this space
            </div>
            <div>
              <h6>{district}</h6>
              <h6>{address}</h6>
            </div>
            <h6 style={{ width: "100%" }}>Facilities</h6>
            <div className="">
              {roomInfo.wifi && (
                <Chip
                  icon={<WifiIcon />}
                  className=""
                  label="Wifi"
                  color="primary"
                />
              )}

              {roomInfo.socketPlug && (
                <Chip
                  icon={<PowerIcon />}
                  className=""
                  label="Socket Plug"
                  color="primary"
                />
              )}

              {roomInfo.airCondition && (
                <Chip
                  icon={<AirIcon />}
                  className=""
                  label="Air Condition"
                  color="primary"
                />
              )}

              {roomInfo.desk && (
                <Chip
                  icon={<TableRestaurantIcon />}
                  className=""
                  label="Desk"
                  color="primary"
                />
              )}
            </div>
            <div>
              <h6>About the Zpace</h6>
              <h4>
                {!!roomInfo.description.trim()
                  ? roomInfo.description
                  : "No room description is avaliable at the moment"}
              </h4>
            </div>
          </div>
          <div>
            <div>
              <div>
                <div>
                  <h3>
                    <span>${roomInfo.hourlyPrice}</span>
                    /hr
                  </h3>
                  <div>
                    {isAuthenticated && (
                      <div>
                        <button
                          className=""
                          onClick={() => setPickedDate(false)}
                        >
                          Today
                        </button>
                        <button
                          className=""
                          onClick={() => setPickedDate(true)}
                        >
                          This Week
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <input type="number" className="" ref={bookingVisitorsRef} />
                <button className="" onClick={onClickSubmit}>
                  Book Now
                </button>
                {pickDate !== "" && <Alert severity="error">{pickDate}</Alert>}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {!ifUserIsHost && isAuthenticated && (
                  <div className="">
                    {!!isLiked ? (
                      <>
                        <FavoriteIcon
                          onClick={() => {
                            onClickUnlike(isLiked);
                          }}
                          className="text-theme-color2 mr-1 cursor-pointer"
                        />
                        <span>Liked</span>
                      </>
                    ) : (
                      <>
                        <FavoriteBorderIcon
                          onClick={() => onClickLike(roomInfo.id)}
                          className="text-theme-color2 mr-1 cursor-pointer"
                        />
                        <span>Like</span>
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className="likecount">
                <span>{roomInfo.likes.length} people like this</span>
              </div>
            </div>
          </div>
          <div>
            <DateBookingSection
              pickDayFun={pickDayFun}
              setToSubmit={setToSubmit}
              toSubmit={toSubmit}
              pickedDate={pickedDate}
              roomInfo={roomInfo}
            />
          </div>
        </div>
      )}
      <div>
        <div>
          <div>
            {viewBox === 0 ? (
              <div className="">
                <div className="">
                  <div className="">
                    <img src={roomInfo.user.profileImg} alt="profile-pic" />
                  </div>
                  <div className="">
                    {<h2>Hosted by {roomInfo.user.username}</h2>}
                    <span>Joined in {roomInfo.user.createdAt.toString()}</span>
                  </div>
                </div>
                <div className="hostDetail-description-box">
                  <h5 style={{ margin: "10px", fontWeight: 600 }}>
                    {roomInfo.user.description}
                  </h5>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <h2>{roomInfo.spaceName}</h2>
                  {Array(5)
                    .fill("")
                    .map((_, index) => (
                      <div key={index}>
                        <RenderAvgRating
                          index={index}
                          rating={ratingAndComments}
                        />
                      </div>
                    ))}
                  <div>
                    {ratingAndComments.length}{" "}
                    {ratingAndComments.length > 1
                      ? "visitors rate"
                      : "visitor rates"}{" "}
                  </div>
                </div>
              </>
            )}
          </div>
          <div>
            <div>
              {viewBox === 1 && (
                <>
                  <div className="">
                    <div className="">
                      {<h3>Enquire {roomInfo.user.username} now!</h3>}
                    </div>
                    <div className="">
                      <span>
                        Joined in {roomInfo.user.createdAt.toString()}
                      </span>
                    </div>
                  </div>
                  {isAuthenticated && (
                    <div>
                      <input
                        className=""
                        required
                        type="textarea"
                        ref={chatRef}
                      />
                      <div className="">
                        <button
                          className=""
                          disabled={ifUserIsHost}
                          onClick={onSubmitChat}
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div>
            {submitRatingAlert && (
              <Alert variant="filled" severity="warning">
                Please rate your experience
              </Alert>
            )}
            {canRate && (
              <div>
                <h2 className="">
                  Rate your experience at {roomInfo.spaceName}!
                </h2>
                <>
                  <div>
                    <div>
                      {Array(5)
                        .fill("")
                        .map((_, index) => (
                          <div
                            key={index}
                            onClick={() => starRatingOnClick(index)}
                          >
                            <StarRender
                              index={index}
                              ratingState={ratingState}
                            />
                          </div>
                        ))}
                    </div>
                    <div className="submit_div">
                      <input
                        className=""
                        required
                        type="text"
                        ref={commentRef}
                      />
                      <button className="" onClick={onSubmitRating}>
                        Send
                      </button>
                    </div>
                  </div>
                </>
              </div>
            )}
          </div>
        </div>
        <div>
          <div>
            {viewBox === 0 && ratingAndComments.length > 0 && (
              <>
                <h3>Visitors' Ratings and Reviews</h3>
                <div>
                  {ratingAndComments.map((comment, index) => (
                    <CommentGrid
                      element={comment as RatingAndComments}
                      key={index}
                    />
                  ))}
                </div>
              </>
            )}

            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { roomId } = context.query;

  if (!roomId || Array.isArray(roomId)) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
  let canRate = false;
  const roomInfo = await getRoomInfoById(roomId);

  const session = await getSession(context);
  if (session) {
    const { id } = session.user as User;
    const bookedTimeSlots = await prisma.customerBookingTimeslot.findMany({
      where: {
        customerId: id,
        roomId,
        status: TimeslotStatusEnum.COMPLETED,
        isRatedFromCustomer: false,
      },
    });
    canRate = bookedTimeSlots.length > 0;
  }

  return {
    props: {
      roomInfo: JSON.parse(JSON.stringify(roomInfo)),
      canRate,
    },
  };
};

export default RoomDetailPage;
