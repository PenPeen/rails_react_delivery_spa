import { useReducer } from 'react';
import requestStatusSlice, { initialState } from '@/stores/request_status_reducer';

const { actions, reducer } = requestStatusSlice;
const { fetching, success } = actions;

export const useRequestStatus = () => {
  const [requestState, dispatch] = useReducer(reducer, initialState);

  return {
    requestState,
    loading: () => dispatch(fetching()),
    success: () => dispatch(success()),
  };
};
