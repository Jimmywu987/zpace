import { RoomType } from "@/types/Room";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeatureKey } from "../featureKey";
import { RootState } from "../reducers";

/**
 * Payload
 */
export type ToStoreRoomPayload = {
  chosenRoom: RoomType | undefined;
};

/**
 * State
 */

export type ToStoreRoomState = {
  chosenRoom: RoomType | undefined;
};

const initialState: ToStoreRoomState = {
  chosenRoom: undefined,
};

/**
 * Slice
 * @see https://redux-toolkit.js.org/api/createslice
 */
const slice = createSlice({
  name: FeatureKey.TO_STORE,
  initialState,
  reducers: {
    toStoreRoomInfo: (
      state: ToStoreRoomState,
      action: PayloadAction<ToStoreRoomPayload>
    ): ToStoreRoomState => {
      const { chosenRoom } = action.payload;
      return {
        ...state,
        chosenRoom,
      };
    },
  },
});

/**
 * Reducer
 */
export const toStoreRoomReducer = slice.reducer;

/**
 * Action
 */
export const { toStoreRoomInfo } = slice.actions;

/**
 * Selector
 * @param state PageStateType
 */
export const toStoreRoomSelector = (state: RootState): ToStoreRoomState =>
  state.toStoreRoom;
