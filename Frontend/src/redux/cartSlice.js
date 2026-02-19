import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [], // [{_id, name, price, quantity, image}]
    },
    reducers: {
        addToCart: (state, action) => {
            const itemInCart = state.items.find((item) => item._id === action.payload._id);
            if (itemInCart) {
                itemInCart.quantity++; // Increase quantity if already exists
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item._id !== action.payload);
        },
        updateQuantity: (state, action) => {
            const item = state.items.find((item) => item._id === action.payload._id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;