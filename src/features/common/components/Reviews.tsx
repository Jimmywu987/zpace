
interface ReviewProps {
  host: string;
  createdAt: string;
  comment: string;
  hostJoinDate: string;
}



export default function Reviews(review: ReviewProps) {
  return (
    <>
      <div className="mb-10 gap-2">
        <p>{review.createdAt.toLocaleString()}</p>
        <p className="text-lg">{review.comment}</p>
        <p className="text-lg font-bold">{review.host}</p>
        <p className="text-sm text-gray-500">Joined in {review.hostJoinDate.slice(0,4)}</p>
      </div>
    </>
  );
}