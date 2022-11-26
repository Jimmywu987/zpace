import { memo, ReactNode, FC } from "react";
const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;
import { LoadScript } from "@react-google-maps/api";
const LoadScriptComponent: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <LoadScript
      googleMapsApiKey={REACT_APP_GOOGLE_MAPS_API_KEY ?? ""}
      id="script-loader"
    >
      {children}
    </LoadScript>
  );
};

export const LoadScriptMemo = memo(LoadScriptComponent);
