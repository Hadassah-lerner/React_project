import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserModel } from '../../models/UserModel';

interface productState {
  productState: UserModel | null;
}

const initialState: productState = {
  productState: null,
};

export const productSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.productState = null;
    }
  }
});

export const { clearProduct } = productSlice.actions;
export default productSlice.reducer;
