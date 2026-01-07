import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { shoppingCartSlice } from './redux/slices/shoppingCartSlice';
import { userSlice } from './redux/slices/userSlice';
import { productSlice } from './redux/slices/productSlice';
import { systemMessageSlice } from './redux/slices/systemMessageSlice';

const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartSlice.reducer,
    user: userSlice.reducer,
    product: productSlice.reducer, // תקן כאן
    systemMessage: systemMessageSlice.reducer,
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
