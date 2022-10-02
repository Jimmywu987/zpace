import { ReactNode, FC } from "react";

export const ThemeTag: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <span className="bg-theme-color1 text-white rounded-full px-2 py-1 shadow whitespace-nowrap mb-1">
      {children}
    </span>
  );
};
