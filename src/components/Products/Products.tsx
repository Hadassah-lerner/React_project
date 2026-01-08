import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from "../../apis/productsApi";
import ProductCard from '../Product/ProductCard';
import './Products.scss';
import { ProductModel } from '../../models/ProductModel';

const PAGE_SIZE = 10;

const Products: React.FC = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<ProductModel[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('all');

  const loadProducts = async (reset = false) => {
    setLoading(true);
    try {
      const result = await getProducts(page, PAGE_SIZE, category); 
      // result צריך להיות { data, pages, items }
      setProducts(prev => reset ? result.data : [...prev, ...result.data]);
      setPages(result.pages);
    } catch (err) {
      console.error('Error loading products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    loadProducts(true);
  }, [category]);

  const handleLoadMore = () => {
    if (page < pages) {
      setPage(prev => prev + 1);
    }
  };

  // טוען עמוד חדש כש-page משתנה
  useEffect(() => {
    if (page > 1) loadProducts();
  }, [page]);

  return (
    <div className="products-container">
      <h2>מוצרים</h2>

      <div className="category-select">
        <label>קטגוריה:</label>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="all">כל הקטגוריות</option>
          <option value="flowers">פרחים</option>
          <option value="plants">צמחים</option>
          <option value="gifts">מתנות</option>
        </select>
      </div>

      {loading && page === 1 ? (
        <div className="spinner">טוען...</div>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card-wrapper">
              <div
                className="product-card"
                onClick={() => navigate('/product', { state: { product } })}
              >
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.price} ₪</p>
              </div>
              <button
                className="add-to-cart-btn"
                onClick={() => console.log('Add to cart', product)}
              >
                הוסף לסל
              </button>
            </div>
          ))}
        </div>
      )}

      {page < pages && (
        <div className="load-more-container">
          <button onClick={handleLoadMore} disabled={loading}>
            {loading ? 'טוען...' : 'טען עוד'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
