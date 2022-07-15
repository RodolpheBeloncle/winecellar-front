import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItemToCart: (state, action) => {
      console.log('addItemToCart', action.payload);
      state.push(action.payload);
    },
    removeItemFromCart: (state,action) => {
      console.log("removeItemFromCart",state,action)
      // From here we can take action only at this "counter" state
      // But, as we have taken care of this particular "logout" action
      // in rootReducer, we can use it to CLEAR the complete Redux Store's state
    },

    addQuantityToItem: (state, action) => {
      console.log('addQuantityToItem', action.payload);
      state.forEach((item) => {
        if (item._id === action.payload._id) {
          item.quantity += 1;
        }
      });
    },
    subtractQuantityFromItem: (state, action) => {
      console.log(' subtractQuantityFromItem', action.payload);
      state.forEach((item) => {
        if (item._id === action.payload) {
          item.quantity -= 1;
        }
      });
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  addQuantityToItem,
  subtractQuantityFromItem,
} = cartSlice.actions;
export default cartSlice.reducer;
