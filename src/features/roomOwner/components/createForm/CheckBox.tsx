import { useFormContext } from "react-hook-form";

export const CheckBox = ({ label, name }: { label: string; name: string }) => {
  const { watch, setValue } = useFormContext();
  const checked = watch(name);
  return (
    <div className="flex space-x-2 items-center">
      <input
        type="checkbox"
        className="w-4 h-4 accent-theme-color1 text-theme-color1"
        onChange={() => {
          setValue(name, !checked);
        }}
        checked={checked}
      />
      <label className="text-gray-700">{label}</label>
    </div>
  );
};
