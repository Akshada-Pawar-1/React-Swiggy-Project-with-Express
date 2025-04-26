import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      // Mutating the state here - Redux toolkit used Immer behind the scenes
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      // console.log(state.items);
      // console.log(action.payload);

      // state.items = state.items.filter((item) => {
      //   item.id !== action.payload;
      //   console.log(item.id);
      // });
      state.items.pop();
    },
    clearCart: (state) => {
      // RTK - Either mutates the existing state or returns a new state
      //   state.items.length = 0; // Mutating the state
      return { items: [] }; // new object will be replaced inside original state
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
