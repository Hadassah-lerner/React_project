import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice';
import reviewReducer from './slices/reviewSlice';
import shoppingCartReducer from './slices/shoppingCartSlice';
import systemMessageReducer from './slices/systemMessageSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    review: reviewReducer,
    shoppingCart: shoppingCartReducer,
    systemMessage: systemMessageReducer,
  },
});

// סוג שמייצג את כל מצב ה־Redux
export type RootState = ReturnType<typeof store.getState>;
// סוג של dispatch (שימושי ל־TypeScript)
export type AppDispatch = typeof store.dispatch;
