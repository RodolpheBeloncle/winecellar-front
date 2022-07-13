import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
  },

  reducers: {
    addProduct: (state, action) => {
      console.log('action.payload type', action.type, action);
      state.quantity += 1;
      state.products.push(action.payload);
    },
    increaseQtyProduct: (state, action) => {
      console.log('ACTION', action);
    
      console.log('updatedProducts', action.payload.orderCartList);
      state.quantity += 1;
      state.products = action.payload.orderCartList
    },

    decreaseQtyProduct: (state, action) => {
      console.log('action.payload minus', action.payload);
      state.quantity -= 1;
      state.products = action.payload;
    },

    resetCartProduct: (state) => {
      state.products = [];
      state.quantity = 0;
    },
  },
});

export const {
  addProduct,
  decreaseQtyProduct,
  resetCartProduct,
  increaseQtyProduct,
} = cartSlice.actions;
export default cartSlice.reducer;
