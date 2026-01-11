import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { shoppingCartSlice } from './redux/slices/shoppingCartSlice';
import { userSlice } from './redux/slices/userSlice';
import { productSlice } from './redux/slices/productSlice';
import { systemMessageSlice } from './redux/slices/systemMessageSlice';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const mystore = configureStore({
  reducer: {
    shoppingCart: shoppingCartSlice.reducer,
    user: userSlice.reducer,
    prouct: productSlice.reducer,
    systemMessage:systemMessageSlice.reducer,
  },
});

root.render(
  <Provider store={mystore}>
  <BrowserRouter>
    <App></App>
  </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
