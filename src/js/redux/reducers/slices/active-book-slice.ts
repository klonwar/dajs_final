import {CaseReducer, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Book} from "#src/js/redux/operations/slices/send-request-operation";

interface ActiveBookState {
  activeBook: Book
}

const setActiveBook: CaseReducer<ActiveBookState, PayloadAction<{book: Book}>> = (state, action) => {
  state.activeBook = action.payload.book;
};

const clearActiveBook: CaseReducer<ActiveBookState> = (state) => {
  state.activeBook = null;
};

const activeBookSlice = createSlice({
  name: `activeBook`,
  initialState: {
    activeBook: undefined
  } as ActiveBookState,
  reducers: {
    setActiveBook,
    clearActiveBook
  },
});

export const ActiveBookActions = {
  ...activeBookSlice.actions
};

export default activeBookSlice.reducer;
