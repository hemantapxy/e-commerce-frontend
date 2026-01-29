import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [], // array of product objects
  },
  reducers: {
    // ✅ Set wishlist from backend
    setWishlist: (state, action) => {
      state.items = action.payload;
    },

    // ✅ Add product to wishlist
    addToWishlist: (state, action) => {
      const exists = state.items.find(
        (p) => p._id === action.payload._id
      );

      if (!exists) {
        state.items.push(action.payload);
      }
    },

    // ✅ Remove product from wishlist
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(
        (p) => p._id !== action.payload
      );
    },

    // ✅ Clear wishlist (logout)
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

// ✅ EXPORT ACTIONS (THIS FIXES YOUR ERROR)
export const {
  setWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
