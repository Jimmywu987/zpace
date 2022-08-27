import getConfig from "next/config";

export type Config = {};
const { publicRuntimeConfig } = getConfig() ?? {};
export const getPublicConfig = (): Config => publicRuntimeConfig;
