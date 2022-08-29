import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeatureKey } from "../featureKey";
import { RootState } from "../reducers";

/**
 * Payload
 */
export type LocationPayload = {
  iP: {
    lat: number;
    lng: number;
    zoom: number;
  };
};

/**
 * State
 */
export type LocationState = {
  iP: {
    lat: number | null;
    lng: number | null;
    zoom: number;
  };
};

const initialState: LocationState = {
  iP: {
    lat: 22.396427,
    lng: 114.109497,
    zoom: 11,
  },
};

/**
 * Slice
 * @see https://redux-toolkit.js.org/api/createslice
 */
const locationSlice = createSlice({
  name: FeatureKey.LOCATION,
  initialState,
  reducers: {
    toStoreIP: (
      state: LocationState,
      action: PayloadAction<LocationPayload>
    ): LocationState => {
      const { iP } = action.payload;
      return {
        ...state,
        iP: iP,
      };
    },
    clearIP: (state: LocationState): LocationState => {
      return {
        ...state,
        iP: { lat: 22.396427, lng: 114.109497, zoom: 8 },
      };
    },
  },
});

/**
 * Reducer
 */
export const locationReducer = locationSlice.reducer;

/**
 * Action
 */
export const { toStoreIP, clearIP } = locationSlice.actions;

/**
 * Selector
 * @param state PageStateType
 */
export const locationSelector = (state: RootState): LocationState =>
  state.location;
