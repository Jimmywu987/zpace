import { SetStateAction, useState, Dispatch } from "react";

export const SelectCalendar = ({
  setPickedDate,
}: {
  setPickedDate: Dispatch<SetStateAction<string>>;
}) => {
  const d2 = (x: number) => {
    return x < 10 ? "0" + x : "" + x;
  };
  const [showCalendar, setShowCalendar] = useState(false);

  const currentDate = `${new Date().getFullYear()}-${d2(
    new Date().getMonth() + 1
  )}-${d2(new Date().getDate())}`;

  return (
    <div className="flex">
      <button
        className={`bg-theme-color1 text-white py-2 rounded hover:bg-theme-color1/90 shadow-xl flex-1 ${
          showCalendar && ""
        }`}
        onClick={() => setShowCalendar((show) => !show)}
      >
        SELECT DAY
      </button>
      <input
        className={`flex-1 border rounded p-1 ${showCalendar && "hidden"}`}
        min={currentDate}
        type="date"
        onChange={(event) => setPickedDate(event.target.value)}
      />
    </div>
  );
};
