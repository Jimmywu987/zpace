

export default function Reviews(review: ReviewProps) {

  return (
    <>
      <div className="mb-10 gap-2">
        <p>{new Date((parseInt(review.createdAt))).toDateString()}</p>
        <p className="text-lg">{review.comment}</p>
        <div className="flex">
          <img
            className="w-[5rem] rounded-full"
            src={`https://joeschmoe.io/api/v1/${review.image}`}
            alt="image"
          />
          <div className="flex flex-col">
            <p className="text-lg font-bold">{review.host}</p>
            <p className="text-sm text-gray-500">
              Joined in {new Date((parseInt(review.hostJoinDate))).getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

type ReviewProps = {
  host: string;
  createdAt: string;
  comment: string;
  hostJoinDate: string;
  image: string;
};