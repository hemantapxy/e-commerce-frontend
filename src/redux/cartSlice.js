import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
      state.totalQuantity = action.payload.reduce((sum, item) => sum + item.quantity, 0);
    },
    addItem: (state, action) => {
      const existing = state.items.find(i => i.product._id === action.payload.product._id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(i => i.product._id !== action.payload.productId);
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
  },
});

export const { setCartItems, addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
