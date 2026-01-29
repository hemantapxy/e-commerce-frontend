import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],          // [{ productId, variant, quantity }]
    totalQuantity: 0,   // 🔥 navbar count uses this
  },
  reducers: {
    // ✅ Sync cart from backend (on page load / refresh)
    setCartItems: (state, action) => {
      state.items = action.payload;

      state.totalQuantity = action.payload.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    },

    // ✅ Add to cart (instant navbar update)
    addItem: (state, action) => {
      const { productId, variant, quantity } = action.payload;

      const existingItem = state.items.find(
        (item) =>
          item.productId === productId &&
          item.variant === variant
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ productId, variant, quantity });
      }

      state.totalQuantity += quantity;
    },

    // ✅ Remove item (instant navbar update)
    removeItem: (state, action) => {
      const { productId } = action.payload;

      const item = state.items.find(
        (i) => i.productId === productId
      );

      if (item) {
        state.totalQuantity -= item.quantity;
        state.items = state.items.filter(
          (i) => i.productId !== productId
        );
      }
    },

    // ✅ Clear cart (after order placed / logout)
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

// ✅ EXPORT EVERYTHING YOU USE
export const {
  setCartItems,
  addItem,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
