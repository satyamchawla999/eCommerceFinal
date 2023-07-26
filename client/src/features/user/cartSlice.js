import { createSlice } from "@reduxjs/toolkit";
import { fetchCartItems, deleteCartItems } from "./actionCreator"

const initialState = {
    cartCount: 0,
    cartItems: [],
    success: false,
    coupon: ""
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartItemQuantity: (state, action) => {
            state.cartItems.forEach((item) => {
                if (item.product.uid === action.payload.productId) {
                    console.log("yes")
                    item.quantity = action.payload.quantity
                }
            })
        },
        deleteCartItem: (state, action) => {
            state.cartItems = state.cartItems.filter((item)=>item.pUid !== action.payload.productId);
        },
        emptyCartItem: (state) => {
            state.cartItems = []
            state.quantity = 0;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCartItems.pending, (state) => {
                state.success = false;
            })

            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.cartItems = action.payload.data;
                state.cartCount = state.cartItems.length;
                state.success = true;
            })

            .addCase(fetchCartItems.rejected, (state, action) => {
                state.success = false;
                state.error = action.error.message
            })

            .addCase(deleteCartItems.fulfilled, (state, action) => {
                state.cartItems = action.payload.data;
                state.cartCount = state.cartItems.length;
                state.success = true;
            })
    },
});

export const { setCartItemQuantity, deleteCartItem, emptyCartItem } = cartSlice.actions;

export default cartSlice.reducer;