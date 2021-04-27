import {combineReducers} from "@reduxjs/toolkit";
import searchReducer from "./slices/search-slice";
import readListReducer from "./slices/read-list-slice";
import activeBookReducer from "./slices/active-book-slice";

const rootReducer = combineReducers({
  searchReducer,
  activeBookReducer,
  readListReducer
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
