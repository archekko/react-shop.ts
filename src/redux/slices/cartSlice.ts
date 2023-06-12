import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Product } from "./productsSlice";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPriceASC, calcTotalPriceAdd } from "../../utils/calcTotalPrice";

export type CartItem = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  sizes: number;
  types: string;
  count: number;
};

interface CartSlaceState {
  totalPrice: number;
  items: CartItem[];
}


export const initialState: CartSlaceState = getCartFromLS();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems: (state, action: PayloadAction<CartItem>) => {
      const itemFind = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (itemFind) {
        itemFind.count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = calcTotalPriceAdd(state.items); 
    },
    removeItems: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      // state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count - sum, 0);
      state.totalPrice = calcTotalPriceAdd(state.items);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItems: (state, action: PayloadAction<string>) => {
      const itemFind = state.items.find((item) => item.id === action.payload);
      if (itemFind) {
        itemFind.count--;
      }
      state.totalPrice = calcTotalPriceAdd(state.items);
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemsByID = (id: string) => (state: RootState) => state.cart.items.find(obj => obj.id === id);

// Action creators are generated for each case reducer function
export const { addItems, removeItems, clearItems, minusItems } = cartSlice.actions;

export default cartSlice.reducer;
