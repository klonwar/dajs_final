import {createAsyncThunk} from "@reduxjs/toolkit";
import sendRequestOperation from "#src/js/redux/operations/slices/send-request-operation";

export const Operations = {
  sendRequest: createAsyncThunk(
    `send-request`,
    sendRequestOperation
  ),
  sendAppendingRequest: createAsyncThunk(
    `send-appending-request`,
    sendRequestOperation
  )
};
