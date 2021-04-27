import {RootState} from "#src/js/redux/reducers/root-reducer";
import {Book, OpenLibraryResponse} from "#src/js/redux/operations/slices/send-request-operation";
import {createSelector} from "@reduxjs/toolkit";
import {SavedBook} from "#src/js/redux/reducers/slices/read-list-slice";

export const searchResponseSelector = (state: RootState): OpenLibraryResponse =>
  state?.searchReducer?.response;
export const searchQuerySelector = (state: RootState): string =>
  state?.searchReducer?.search;
export const isSearchPendingSelector = (state: RootState): boolean =>
  state?.searchReducer?.pending;

export const searchResultsNumberSelector = createSelector<RootState, OpenLibraryResponse, number>(
  searchResponseSelector,
  (item) => item?.numFound
);
export const searchStartNumberSelector = createSelector<RootState, OpenLibraryResponse, number>(
  searchResponseSelector,
  (item) => item?.start
);

export const activeBookSelector = (state: RootState): Book =>
  state?.activeBookReducer?.activeBook;
export const activeBookKeySelector = createSelector<RootState, Book, string>(
  activeBookSelector,
  (item) => item?.key
);

export const readListSelector = (state: RootState): Record<string, SavedBook> =>
  state?.readListReducer?.booksList;