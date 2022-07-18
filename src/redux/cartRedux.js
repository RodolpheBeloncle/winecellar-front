import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItemToCart: (state, action) => {
      console.log('addItemToCart', action.payload);
      state.push(action.payload);
    },
    removeAllFromCart: (state, action) => {
      console.log('removeAllFromCart', action.payload);
      // From here we can take action only at this "counter" state
      // But, as we have taken care of this particular "logout" action
      // in rootReducer, we can use it to CLEAR the complete Redux Store's state
    },

    removeOneItem: (state, action) => {
      console.log('remove OneItem', action.payload);
      let newState = state
      newState.splice(action.payload, 1);
      console.log("newstate",newState,state)
      state = newState;

      // you receive you inputIndex from the payload
      // and you use it to splice the desired item off the array
    
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
  removeAllFromCart,
  addQuantityToItem,
  removeOneItem,
  subtractQuantityFromItem,
} = cartSlice.actions;
export default cartSlice.reducer;
