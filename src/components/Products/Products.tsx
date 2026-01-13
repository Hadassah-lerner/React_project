import React, { FC, useEffect, useState } from 'react';
import './Products.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ProductModel } from '../../models/ProductModel';
import { addProduct } from '../../redux/slices/shoppingCartSlice';
import { setMessage } from '../../redux/slices/systemMessageSlice';
import { getProducts, ApiResponse } from '../../apis/products.api';
import { getImageSrc } from '../../utils/getImageSrc';

const Products: FC = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [allProducts, setAllProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);

    getProducts(page, category)
      .then((res: ApiResponse) => {
        const { data, meta } = res; // ← כאן destructuring
        setAllProducts(prev => (page === 1 ? data : [...prev, ...data]));
        setHasNext(meta.hasNext);
      })
      .catch(() => setError('שגיאה בשליפת מוצרים'))
      .finally(() => setLoading(false));
  }, [page, category]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setPage(1);
    setAllProducts([]);
  };

  const handleLoadMore = () => setPage(prev => prev + 1);

  const addToCart = (product: ProductModel) => {
    dispatch(addProduct(product));
    dispatch(setMessage('המוצר נוסף לעגלה'));
  };

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>המוצרים שלנו</h1>
        <div className="filter-container">
          <label htmlFor="category">בחר קטגוריה:</label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">כל הקטגוריות</option>
            <option value="מעורב">מעורב</option>
            <option value="יחודי">יחודי</option>
            <option value="ורדים">ורדים</option>
            <option value="מתנה">מתנה</option>
            <option value="מיוחד">מיוחד</option>
          </select>
        </div>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>טוען מוצרים...</p>}

      <div className="products-grid">
        {allProducts.map(product => (
          <div key={product.id} className="product-card">
            <div
              className="helf-product-card"
              onClick={() => navigate('/product', { state: { product } })}
            >
              <img src={getImageSrc(product.image)} alt={product.name} />
              <h3>{product.name}</h3>
              <p>קטגוריה: {product.category}</p>
              <p>מחיר: ₪{product.price}</p>
            </div>

            <button className='add-to-cart-btn' onClick={() => addToCart(product)}>
              הוסף לסל
            </button>
          </div>
        ))}
      </div>

      {hasNext && !loading && (
        <button className="load-more-btn" onClick={handleLoadMore}>
          טען עוד
        </button>
      )}
    </div>
  );
};

export default Products;