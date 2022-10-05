import { RoomType } from "@/types/Room";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeatureKey } from "../featureKey";
import { RootState } from "../reducers";

/**
 * Payload
 */
export type RoomPayload = {
  rooms: RoomType[];
};

/**
 * State
 */
export type RoomState = {
  rooms: [];
};

const initialState: RoomState = {
  rooms: [],
};

/**
 * Slice
 * @see https://redux-toolkit.js.org/api/createslice
 */
const slice = createSlice({
  name: FeatureKey.ROOMS,
  initialState,
  reducers: {
    toStoreRooms: (
      state: RoomState,
      action: PayloadAction<RoomPayload>
    ): RoomState => {
      const { rooms } = action.payload;

      return {
        ...state,
        rooms,
      };
    },
  },
});

/**
 * Reducer
 */
export const roomsReducer = slice.reducer;

/**
 * Action
 */
export const { toStoreRooms } = slice.actions;

/**
 * Selector
 * @param state PageStateType
 */
export const roomsSelector = (state: RootState): RoomState => state.rooms;
