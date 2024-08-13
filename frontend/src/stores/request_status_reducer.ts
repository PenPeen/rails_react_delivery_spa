import { REQUEST_STATE } from "@/config/constants/request_state_constants";
import { Restaurant } from "@/type/restaurant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ValueOf<T> = T[keyof T];

interface RequestStatusState {
  status: ValueOf<typeof REQUEST_STATE>;
  restaurants: Restaurant[];
}

export const initialState: RequestStatusState = {
  status: REQUEST_STATE.INITIAL,
  restaurants: [],
};

const requestStatusSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    fetching: (state) => {
      state.status = REQUEST_STATE.LOADING;
    },
    success: (state, action: PayloadAction<Restaurant[]>) => {
      state.status = REQUEST_STATE.OK;
      state.restaurants = action.payload;
    },
  },
});

export default requestStatusSlice;
