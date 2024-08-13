import { useReducer } from "react";
import requestStatusSlice, {
  initialState,
} from "@/stores/request_status_reducer";
import { Restaurant } from "@/type/restaurant";

const { actions, reducer } = requestStatusSlice;
const { fetching, success } = actions;

export const useRequestStatus = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    fetching: () => dispatch(fetching()),
    success: (restaurants: Restaurant[]) => dispatch(success(restaurants)),
  };
};
