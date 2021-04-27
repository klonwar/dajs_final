import {CaseReducer, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Book} from "#src/js/redux/operations/slices/send-request-operation";

export interface SavedBook extends Book {
  read: boolean
}

interface ReadListState {
  booksList: Record<string, SavedBook>
}

const fromStorage: CaseReducer<ReadListState> = (state) => {
  if (localStorage.getItem(`readList`)) {
    try {
      state.booksList = JSON.parse(localStorage.getItem(`readList`)).booksList;
    } catch (e) {
      state.booksList = {};
    }
  }
};

const removeBook: CaseReducer<ReadListState, PayloadAction<{ key: string }>> = (state, action) => {
  delete state.booksList[action.payload.key];
};

const pushBook: CaseReducer<ReadListState, PayloadAction<{ book: Book }>> = (state, action) => {
  if (!state.booksList[action.payload.book.key])
    state.booksList[action.payload.book.key] = {read: false, ...action.payload.book};
};

const toggleReadState: CaseReducer<ReadListState, PayloadAction<{ key: string }>> = (state, action) => {
  if (state.booksList[action.payload.key])
    state.booksList[action.payload.key].read = !state.booksList[action.payload.key].read;
};

const readListSlice = createSlice({
  name: `readList`,
  initialState: {
    booksList: {}
  } as ReadListState,
  reducers: {
    fromStorage,
    removeBook,
    toggleReadState,
    pushBook
  },
});

export const ReadListActions = {
  ...readListSlice.actions
};

export default readListSlice.reducer;
