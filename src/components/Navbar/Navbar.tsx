import React, { FC } from 'react';
import './Navbar.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { currUser } from '../../redux/slices/userSlice';

interface NavbarProps { }

const Navbar: FC<NavbarProps> = () => {
  const navigate = useNavigate();
  const cartCount = useSelector((state: any) => state.shoppingCart?.productList?.length || 0);
  const user = useSelector((state: any) => state.user.userState);

  return <div className="Navbar">

    <header className="header">
      <div className="container">


        <div className="header__logo" onClick={()=>{navigate('/home')}}>
          <img src="/images/Logo.jpg" alt="logo" height="80" className="logo" />
        </div>
        <nav className="header__nav">
          <ul className="header__menu">

            <li></li>
            <li className="header__item"><a className="header__link" onClick={() => navigate('/personal_information')}> {user?.name} </a> </li>
            <li></li><li></li>
            <li></li><li></li>
            {user?.role == 'manager' && (
              <li className="header__item">
                <a className="header__link" onClick={() => navigate('/delete')}> מחיקת מוצר</a>
              </li>
            )}

            {user?.role === 'manager' && (
              <li className="header__item">
                <a className="header__link" onClick={() => navigate('/add_product')}> הוספת מוצר</a>
              </li>
            )}

            <li className="header__item"><a className="header__link" onClick={() => navigate('/products')}> מוצרים </a></li>
            <div className="cart-icon-container">
              <li className="header__item"><a className="header__link" onClick={() => navigate('/shopping_cart')}>🛒</a></li>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </div>

            {/* <li className="header__item"><button className="header__link header__button">🛒</button></li> */}

          </ul>
        </nav>
      </div>
    </header>


    <div className="main"></div>
    <Outlet />

  </div>
};

export default Navbar;