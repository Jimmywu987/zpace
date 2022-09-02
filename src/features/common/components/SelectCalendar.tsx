import { d2 } from "@/helpers/d2";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export const SelectCalendar = ({
  name,
  onChange,
}: {
  name: string;
  onChange?: () => void;
}) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const currentDate = `${new Date().getFullYear()}-${d2(
    new Date().getMonth() + 1
  )}-${d2(new Date().getDate())}`;
  const { setValue } = useFormContext();

  return (
    <div className="flex">
      <button
        className="bg-theme-color1 text-white py-2 rounded hover:bg-theme-color1/90 shadow-xl flex-1"
        onClick={() => setShowCalendar((show) => !show)}
      >
        SELECT DAY
      </button>
      <input
        className={`flex-1 border rounded p-1 ${!showCalendar && "hidden"}`}
        min={currentDate}
        type="date"
        onChange={
          onChange ? onChange : (event) => setValue(name, event.target.value)
        }
      />
    </div>
  );
};
