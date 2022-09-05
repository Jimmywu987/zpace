import getConfig from "next/config";

export type Config = {
  env: {
    REACT_APP_GOOGLE_MAPS_API_KEY: string;
  };
};
const { publicRuntimeConfig } = getConfig() ?? {};
export const getPublicConfig = (): Config => publicRuntimeConfig;
