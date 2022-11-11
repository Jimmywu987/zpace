import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { FeatureKey } from "../featureKey";
import { RootState } from "../reducers";

/**
 * Payload
 */
export type SettingPayload = {
  setting: {
    ppl: number;
    priceRg: number[];
    date: string;
  };
};

/**
 * State
 */

export type SettingState = {
  setting: {
    ppl: number;
    priceRg: number[];
    date: string;
  };
};
const localTime = dayjs(new Date());

const getDate = `${localTime.year()}-${
  localTime.month() ? localTime.month() + 1 : 1
}-${localTime.date()}`;
const initialState: SettingState = {
  setting: {
    ppl: 1,
    priceRg: [50, 500],
    date: getDate,
  },
};

/**
 * Slice
 * @see https://redux-toolkit.js.org/api/createslice
 */
const slice = createSlice({
  name: FeatureKey.SETTING,
  initialState,
  reducers: {
    toSet: (
      state: SettingState,
      action: PayloadAction<SettingPayload>
    ): SettingState => {
      const { setting } = action.payload;
      return {
        ...state,
        setting: setting,
      };
    },
  },
});

/**
 * Reducer
 */
export const settingReducer = slice.reducer;

/**
 * Action
 */
export const { toSet } = slice.actions;

/**
 * Selector
 * @param state PageStateType
 */
export const settingSelector = (state: RootState): SettingState =>
  state.setting;
