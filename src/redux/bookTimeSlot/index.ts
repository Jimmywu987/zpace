import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeatureKey } from "../featureKey";
import { RootState } from "../reducers";

/**
 * Payload
 */
export type ITimeSlotPayload = {
  timeSlot: any[];
};

/**
 * State
 */
export type ITimeSlotState = {
  timeSlot: any[];
};

const initialState: ITimeSlotState = {
  timeSlot: [],
};

/**
 * Slice
 * @see https://redux-toolkit.js.org/api/createslice
 */
const slice = createSlice({
  name: FeatureKey.TIME_SLOT,
  initialState,
  reducers: {
    toStoreTimeSlot: (
      state: ITimeSlotState,
      action: PayloadAction<ITimeSlotPayload>
    ): ITimeSlotState => {
      return {
        ...state,
        timeSlot: action.payload.timeSlot,
      };
    },
  },
});

/**
 * Reducer
 */
export const timeSlotReducer = slice.reducer;

/**
 * Action
 */
export const { toStoreTimeSlot } = slice.actions;

/**
 * Selector
 * @param state PageStateType
 */
export const timeSlotSelector = (state: RootState): ITimeSlotState =>
  state.timeSlot;
