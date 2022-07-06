import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },

  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    decreaseProduct: (state, action) => {
      state.quantity -= 1;
      state.products.push(action.payload);
      state.total -= action.payload.price * action.payload.quantity;
    },

    // function to clear shopping cart after pdf click
  },
});

export const { addProduct, decreaseProduct } = cartSlice.actions;
export default cartSlice.reducer;
