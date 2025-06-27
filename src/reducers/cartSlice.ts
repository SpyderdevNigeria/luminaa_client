// cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  genericName: string;
  manufacturer: string;
  dosageForm: string;
  strength: string;
  category: string;
  description: string;
  price: number;
  requiresPrescription: boolean;
  isAvailable: boolean;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index >= 0) {
        state.items[index].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
  const { id, quantity } = action.payload;
  const index = state.items.findIndex(item => item.id === id);

  if (index !== -1) {
    if (quantity < 1) {
      state.items.splice(index, 1);
    } else {
      state.items[index].quantity = quantity;
    }
  }
},
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
