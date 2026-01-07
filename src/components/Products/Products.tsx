import React, { FC, useEffect, useState } from 'react';
import './Products.scss';
import { useNavigate } from 'react-router-dom';
import { ProductModel } from '../../models/ProductModel';
import { addProduct } from '../../redux/slices/shoppingCartSlice';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../redux/slices/systemMessageSlice';
import { api } from '../../api/apis';

const Products: FC = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [page, setPage] = useState<number>(1);
  const [category, setCategory] = useState<string>(''); // קטגוריה נבחרת
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // -------------------- פונקציה לטעינת מוצרים --------------------
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await api.getProducts(page, 20, category);
        if (!response.ok) throw new Error('שגיאה בטעינת מוצרים');
        const data: ProductModel[] = await response.json();

        if (page === 1) {
          setProducts(data); // עמוד ראשון - איפוס המוצרים
        } else {
          setProducts(prev => [...prev, ...data]); // עמוד נוסף - הצמדה למוצרים קיימים
        }

        setError('');
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'שגיאה בטעינת מוצרים');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, category]);

  // -------------------- שינוי קטגוריה --------------------
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setPage(1); // איפוס עמוד כששינו קטגוריה
  };

  // -------------------- טעינת עוד מוצרים --------------------
  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  // -------------------- הוספה לעגלה --------------------
  const addToCart = (product: ProductModel) => {
    dispatch(addProduct(product));
    dispatch(setMessage("המוצר נוסף לעגלה"));
  };

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>המוצרים שלנו</h1>

        <div className="filter-container">
          <label htmlFor="categorySelect">בחר קטגוריה:</label>
          <select
            id="categorySelect"
            className="category-select"
            onChange={handleCategoryChange}
            value={category}
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

      <br />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>טוען מוצרים...</p>
        </div>
      )}

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div
              className="helf-product-card"
              onClick={() => navigate('/product', { state: { product } })}
            >
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>קטגוריה: {product.category}</p>
              <p>מחיר: ₪{product.price}</p>
            </div>
            <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
              הוסף לסל
            </button>
          </div>
        ))}
      </div>

      {/* כפתור טען עוד */}
      {!loading && products.length > 0 && (
        <button className="load-more-btn" title="טען עוד" onClick={handleLoadMore}>
          <svg
            className="arrow-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Products;
