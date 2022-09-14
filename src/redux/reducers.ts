import { combineReducers } from "redux";
import { loadingReducer } from "./loading";
import { locationReducer } from "./location";
import { settingReducer } from "./setting";
import { markerReducer } from "./marker";
import { toStoreRoomReducer } from "./toStoreRoom";
import { toPlaceReducer } from "./toPlace";
import { roomsReducer } from "./rooms";
import { userReducer } from "./user";

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
  rooms: roomsReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
