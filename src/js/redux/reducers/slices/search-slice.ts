import {ActionReducerMapBuilder, createSlice} from "@reduxjs/toolkit";
import {Operations} from "#src/js/redux/operations/operations";
import {OpenLibraryResponse} from "#src/js/redux/operations/slices/send-request-operation";

interface SearchState {
  pending: boolean;
  search: string;
  startTime: number;
  response: OpenLibraryResponse;
}

const searchSlice = createSlice({
  name: `search`,
  initialState: {
    pending: false,
    search: null,
    startTime: 0,
    response: undefined
  } as SearchState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<SearchState>) => {
    builder
      .addCase(
        Operations.sendRequest.pending,
        (state) => {
          state.pending = true;
        }
      )
      .addCase(
        Operations.sendRequest.rejected,
        (state) => {
          state.pending = false;
        }
      )
      .addCase(
        Operations.sendRequest.fulfilled,
        (state, action) => {
          state.pending = false;
          if (!state.startTime || state.startTime < action.payload.startTime) {
            state.startTime = action.payload.startTime;
            state.search = action.payload.search;
            const apResponse = action.payload.response;
            state.response = {
              numFound: apResponse?.numFound || apResponse[`num_found`],
              start: apResponse.start,
              docs: apResponse.docs
            };
          }
        })
      .addCase(
        Operations.sendAppendingRequest.pending,
        (state) => {
          state.pending = true;
        }
      )
      .addCase(
        Operations.sendAppendingRequest.rejected,
        (state) => {
          state.pending = false;
        }
      )
      .addCase(
        Operations.sendAppendingRequest.fulfilled,
        (state, action) => {
          state.pending = false;
          if (!state.startTime || state.startTime < action.payload.startTime) {
            state.startTime = action.payload.startTime;
            const apResponse = action.payload.response;
            state.response = {
              numFound: apResponse.numFound,
              start: apResponse.start,
              docs: [
                ... (state.response?.docs || []),
                ... apResponse.docs
              ]
            };
            state.search = action.payload.search;
          }
        })
    ;
  }
});

export const SearchActions = {
  ...searchSlice.actions
};

export default searchSlice.reducer;
