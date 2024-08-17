import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  count: number;
}

export const initialState: CartState = {
  count: 0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
    remove: (state, action: PayloadAction<number>) => {
      state.count -= action.payload;
    },
  },
});

export default CartSlice;
