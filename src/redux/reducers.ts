import { combineReducers } from "redux";
import { loadingReducer } from "./loading";
import { locationReducer } from "./location";
import { settingReducer } from "./setting";
import { markerReducer } from "./marker";
import { toStoreRoomReducer } from "./toStoreRoom";
import { toPlaceReducer } from "./toPlace";

/**
 * Combine reducers
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript
 */
export const rootReducer = combineReducers({
  loading: loadingReducer,
  location: locationReducer,
  setting: settingReducer,
  marker: markerReducer,
  toStoreRoom: toStoreRoomReducer,
  toPlace: toPlaceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
