import { REQUEST_STATE } from "@/config/constants/request_state_constants";
import { createSlice } from "@reduxjs/toolkit";

type ValueOf<T> = T[keyof T];

interface RequestStatusState {
  status: ValueOf<typeof REQUEST_STATE>;
}

export const initialState: RequestStatusState = {
  status: REQUEST_STATE.INITIAL,
};

const requestStatusSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    fetching: (state) => {
      state.status = REQUEST_STATE.LOADING;
    },
    success: (state) => {
      state.status = REQUEST_STATE.OK;
    },
  },
});

export default requestStatusSlice;
