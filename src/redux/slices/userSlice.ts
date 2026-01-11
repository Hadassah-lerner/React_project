import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserModel } from '../../models/UserModel';

interface UserState {
  userState: UserModel | null;
}

const initialState: UserState = {
  userState: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    currUser: (state, action: PayloadAction<UserModel>) => {
      state.userState = action.payload;
    },
    clearUser: (state) => {
      state.userState = null;
    }
  }
});

export const { currUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
