import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
  },

  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1
      state.products.push(action.payload);
    },
    increaseQuantityProduct: (state, action) => {
      console.log('action.payload', action.payload);
      state.quantity += 1;
      state.products.push(action.payload);
    },

    decreaseProduct: (state, action) => {
      state.quantity -= 1;
      state.products = action.payload.products;
    },

    resetCartProduct: (state) => {
      state.products = [];
      state.quantity = 0;
    },
  },
});

export const {
  addProduct,
  decreaseProduct,
  resetCartProduct,
  increaseQuantityProduct,
} = cartSlice.actions;
export default cartSlice.reducer;
