import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserModel } from '../../models/UserModel';

interface ReviewState {
  reviewState: UserModel | null;
}

const initialState: ReviewState = {
  reviewState: null,
};

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    addreview: (state, action: PayloadAction<UserModel>) => {
      state.reviewState = action.payload;
    },
    clearReview: (state) => {
      state.reviewState = null;
    }
  }
});

export const { addreview, clearReview } = reviewSlice.actions;
export default reviewSlice.reducer;
