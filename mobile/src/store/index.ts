import { combineReducers, legacy_createStore, Store } from "redux";
import { reducers } from "../reducers";
import { StateType, ActionType } from "../types";

export const store: Store<StateType, ActionType<any>> = legacy_createStore(
  combineReducers({
    ...reducers,
  })
);
