import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ProductModel } from '../../models/ProductModel';
import { clearProduct } from '../../redux/slices/productSlice';
import { setMessage } from '../../redux/slices/systemMessageSlice';
import './DeleteProduct.scss';
import { useFetch } from '../../custom_hook/useFetch';
import { getImageSrc } from '../../utils/getImageSrc';

const DeleteProduct: FC = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const dispatch = useDispatch();
  const baseUrl = 'http://localhost:3001/api/products?page=1&limit=1000';

  const { data, loading, error } = useFetch<{ data: ProductModel[]; meta: any }>(baseUrl);

  useEffect(() => {
    if (data) setProducts(data.data);
  }, [data]);

  const deleteProduct = async (product: ProductModel) => {
    const confirmDelete = window.confirm(`למחוק את המוצר "${product.name}"?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3001/api/products/${product.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('מחיקת המוצר נכשלה מהשרת');

      setProducts(prev => prev.filter(p => p.id !== product.id));
      dispatch(clearProduct());
      dispatch(setMessage(`המוצר "${product.name}" נמחק בהצלחה`));
    } catch (err: any) {
      console.error('שגיאה במחיקת מוצר:', err.message);
      dispatch(setMessage(`אירעה שגיאה במחיקת המוצר "${product.name}"`));
    }
  };

  return (
    <div className="delete-products-container">
      <h1>ניהול מוצרים</h1>

      {error && <p className="error-text">{error}</p>}
      {loading && <p>טוען מוצרים...</p>}

      <div className="table-responsive">
        <table className="manage-products-table">
          <thead>
            <tr>
              <th>תמונה</th>
              <th>שם</th>
              <th>קטגוריה</th>
              <th>מחיר</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  <img src={getImageSrc(p.image)} alt={p.name} />
                </td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>₪{p.price}</td>
                <td>
                  <button className="delete-product-btn" onClick={() => deleteProduct(p)}>
                    מחק
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && !loading && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center' }}>
                  אין מוצרים להצגה
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeleteProduct;
