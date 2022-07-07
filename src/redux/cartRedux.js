import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
  },

  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
    },

    decreaseProduct: (state, action) => {
      state.quantity -= 1;
      state.products.push(action.payload);
    },
    resetCartProduct: (state) => {
      state.products = [];
      state.quantity = 0;
    },
  },
});

export const { addProduct, decreaseProduct, resetCartProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
