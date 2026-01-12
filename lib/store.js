import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import productReducer from "./features/product/productSlice";
import addressReducer from "./features/address/addressSlice";
import ratingReducer from "./features/rating/ratingSlice";
import chatReducer from "./features/chat/chatSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      product: productReducer,
      address: addressReducer,
      rating: ratingReducer,
      chat: chatReducer,
    },
  });
};
