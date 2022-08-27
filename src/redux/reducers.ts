import { combineReducers } from "redux";
import { loadingReducer } from "./loading";

/**
 * Combine reducers
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript
 */
export const rootReducer = combineReducers({
  loading: loadingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
