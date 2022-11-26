type TimeSlot = { to: string; from: string; date: string };

const TimeSlotsRenderDate = ({ date }: { date: string }) => {
  return <div>{date}</div>;
};
const TimeSlotsRenderTime = ({
  info,
  timeSlotArr,
}: {
  info: TimeSlot;
  timeSlotArr: string[];
}) => {
  const timeAdjustmentIndx = timeSlotArr.indexOf(info.to);
  const timeAdjustment = timeSlotArr[timeAdjustmentIndx + 1];
  return (
    <div>
      {info.from} - {timeAdjustment}
    </div>
  );
};

export const TimeSlotsRender = ({
  bookedTimeSlot,
  timeSlotArr,
}: {
  bookedTimeSlot: TimeSlot[];
  timeSlotArr: string[];
}) => {
  return (
    <div className="shadow">
      <div className="flex items-center py-1">
        <div className=" flex flex-1 justify-center text-gray-700 ">
          Date(s)
        </div>
        <div className=" flex flex-1 justify-center text-gray-700 ">Time</div>
      </div>
      <div className="">
        {bookedTimeSlot.map((timeslot, index) => (
          <div key={index} className="flex items-center py-1 text-gray-700">
            <div className="flex flex-1 justify-center">
              <TimeSlotsRenderDate date={timeslot.date} />
            </div>
            <div className="flex flex-1 justify-center">
              <TimeSlotsRenderTime info={timeslot} timeSlotArr={timeSlotArr} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
