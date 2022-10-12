import { RatingAndCommentOnRoom } from "@prisma/client";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export const RenderAvgRating = ({
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
