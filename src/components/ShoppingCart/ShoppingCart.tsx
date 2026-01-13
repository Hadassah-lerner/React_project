import React, { FC } from 'react';
import './ShoppingCart.scss';
import './ShoppingCart.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ProductModel } from '../../models/ProductModel';
import { deleteProduct } from '../../redux/slices/shoppingCartSlice';
import { setMessage } from '../../redux/slices/systemMessageSlice';
import { getImageSrc } from '../../utils/getImageSrc';

const ShoppingCart: React.FC = () => {
const cartItems: ProductModel[] = useSelector((state: any) => state.shoppingCart.productList)

const dispatch = useDispatch();

  const deleteFromCart = (product: ProductModel) => {
    dispatch(deleteProduct(product));
    dispatch(setMessage("המוצר נמחק מהעגלה"));

  };

 return (
  <div className="ShoppingCart">

    <h2>עגלת קניות</h2>

    {cartItems.length == 0 ? (
      <p>העגלה ריקה</p>
    ) : (
<ul className="cart-items">
  {cartItems.map((item) => (
    <li className="cart-card" key={item.id}>
      <img src={getImageSrc(item.image)} alt={item.name} className="cart-thumbnail" />
      
      <div className="cart-info">
        <div className="cart-title">{item.name}</div>
        <div className="cart-cost">₪{item.price}</div>
      </div>

      <button
        className="cart-remove-btn"
        onClick={() => deleteFromCart(item)}
      >
        X
      </button>
    </li>
  ))}
</ul>

    )}
  </div>
);
}

export default ShoppingCart;



