import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeatureKey } from "../featureKey";
import { RootState } from "../reducers";

/**
 * Payload
 */
export type MarkerPayload = {
  selected: {
    lat: number | null;
    lng: number | null;
  };
};

/**
 * State
 */

export type MarkerState = {
  selected: {
    lat: number | null;
    lng: number | null;
  };
};

const initialState: MarkerState = {
  selected: {
    lat: null,
    lng: null,
  },
};

/**
 * Slice
 * @see https://redux-toolkit.js.org/api/createslice
 */
const slice = createSlice({
  name: FeatureKey.MARKER,
  initialState,
  reducers: {
    toStoreMarkerIP: (
      state: MarkerState,
      action: PayloadAction<MarkerPayload>
    ): MarkerState => {
      const { selected } = action.payload;
      return {
        ...state,
        selected: selected,
      };
    },
  },
});

/**
 * Reducer
 */
export const markerReducer = slice.reducer;

/**
 * Action
 */
export const { toStoreMarkerIP } = slice.actions;

/**
 * Selector
 * @param state PageStateType
 */
export const markerSelector = (state: RootState): MarkerState => state.marker;
