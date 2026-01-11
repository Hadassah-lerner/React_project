import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SystemMessageState {
  message: string;
}

const initialState: SystemMessageState = {
  message: "",
};

export const systemMessageSlice = createSlice({
  name: "systemMessage",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = "";
    },
  },
});

export const { setMessage, clearMessage } = systemMessageSlice.actions;
export default systemMessageSlice.reducer;
