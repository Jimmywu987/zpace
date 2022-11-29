import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import moment from "moment";

import { RatingAndComments } from "@/pages/room-detail/[roomId]";
const StarRendering = ({
  index,
  rating,
}: {
  index: number;
  rating: number;
}) => {
  let num = 0;
  if (rating >= index) {
    num = 1;
  }
  return (
    <>
      {num === 0 ? (
        <StarBorderIcon className="text-theme-color2" />
      ) : (
        <StarIcon className="text-theme-color2" />
      )}
    </>
  );
};
export const CommentGrid = ({ element }: { element: RatingAndComments }) => {
  const [readMore, setReadMore] = useState(80);
  const [onClickReadMore, setOnClickReadMore] = useState(false);

  return (
    <div>
      <div className="">
        <div className="">
          <img
            style={{ width: "50px" }}
            src={element.user.profileImg}
            alt="profile-pic"
          />
          {element.user.username}
        </div>

        <div className="">
          {Array(5)
            .fill("")
            .map((_, indx) => (
              <StarRendering key={indx} index={indx} rating={element.rating} />
            ))}
        </div>
      </div>
      <hr className="" />
      <div
        style={{
          marginLeft: "10px",
          marginRight: "10px",
          textAlign: "left",
        }}
        className=""
      >
        <div>
          <div className="">
            {element.comment.slice(0, readMore)}
            <div
              className=""
              onClick={() => {
                if (!onClickReadMore) {
                  setReadMore(element.comment.length);
                } else {
                  setReadMore(80);
                }
                setOnClickReadMore(!onClickReadMore);
              }}
            >
              <span className="">
                {element.comment.length > 80 &&
                  (!onClickReadMore ? `View More` : `Show Less`)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="">{moment(element.createdAt).format("MMM YYYY")}</div>
    </div>
  );
};
