import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductModel } from '../../models/ProductModel';
import { useDispatch } from 'react-redux';
import { useFetch } from '../../custom_hook/useFetch';
import { clearProduct } from '../../redux/slices/productSlice';
import { setMessage } from '../../redux/slices/systemMessageSlice';
import './DeleteProduct.scss';


const Products: FC = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
const baseUrl = `http://localhost:3000/products`;
const { data, loading, error } = useFetch<ProductModel[]>(baseUrl);

useEffect(() => {
  if (data) {
    console.log('מוצרים שהתקבלו מהשרת:', data);
    setProducts(data);
  }
}, [data]);


  const deleteProduct = async (product: ProductModel) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${product.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('מחיקת המוצר נכשלה מהשרת');
      }
      setProducts(prevProducts => prevProducts.filter(p => p.id !== product.id));
      dispatch(clearProduct());
      if (response.ok) dispatch(setMessage("המוצר נמחק מרשימת המוצרים"));
    } catch (error: any) {
      console.error('שגיאה במחיקת מוצר:', error.message);
      alert('אירעה שגיאה במחיקת המוצר');
    }
  };

  return (
    <div className="manage-products-container">
      <h1>המוצרים שלנו</h1>
      <br />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>טוען מוצרים...</p>
        </div>
      )}

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
    {products.map(product => (
      <tr key={product.id}>
        <td><img src={product.image} alt={product.name} width="60"/></td>
        <td>{product.name}</td>
        <td>{product.category}</td>
        <td>₪{product.price}</td>
        <td>
          <button className="delete-product-btn" onClick={() => deleteProduct(product)}>
             מחק
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
};

export default Products;
