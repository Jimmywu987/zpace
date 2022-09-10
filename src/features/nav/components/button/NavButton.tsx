import { ButtonHTMLAttributes, FC } from "react";

export const NavButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <button
      className="text-lg text-link-normal transition hover:bg-link-bgHover hover:scale-110 hover:text-red-500 py-2 px-2.5 rounded font-normal"
      {...props}
    />
  );
};
