import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductModel } from "../../models/ProductModel";


interface ShoppingCartState {
    productList: ProductModel[];
  }
  
  const initialState: ShoppingCartState = {
    productList: [],
  };
  
  export const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {
      addProduct: (state, action: PayloadAction<ProductModel>) => {
        state.productList.push(action.payload);
      },
      deleteProduct: (state, action: PayloadAction<ProductModel>) => {
      state.productList = state.productList.filter(
      (product) => product.id !== action.payload.id
      );
      }
      
      }
      }) 


export const { addProduct, deleteProduct } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;