import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeatureKey } from "../featureKey";
import { RootState } from "../reducers";

/**
 * Payload
 */
export type toPlacePayload = {
  place: any[];
};

/**
 * State
 */

export type ToPlaceState = {
  place: any[];
};

const initialState: ToPlaceState = {
  place: [],
};

/**
 * Slice
 * @see https://redux-toolkit.js.org/api/createslice
 */
const slice = createSlice({
  name: FeatureKey.TO_PLACE,
  initialState,
  reducers: {
    toStorePlace: (
      state: ToPlaceState,
      action: PayloadAction<toPlacePayload>
    ): ToPlaceState => {
      const { place } = action.payload;
      return {
        ...state,
        place,
      };
    },
  },
});

/**
 * Reducer
 */
export const toPlaceReducer = slice.reducer;

/**
 * Action
 */
export const { toStorePlace } = slice.actions;

/**
 * Selector
 * @param state PageStateType
 */
export const toPlaceSelector = (state: RootState): ToPlaceState =>
  state.toPlace;
