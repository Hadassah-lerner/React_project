import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../redux/slices/systemMessageSlice';
import { ProductModel } from '../../models/ProductModel';
import { getProducts, deleteProductById } from '../../apis/apis';
import './Products.scss';

const Products: FC = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const dispatch = useDispatch();

  // שליפת מוצרים
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  // מחיקת מוצר
  const deleteProductHandler = async (id: string) => {
    try {
      await deleteProductById(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      dispatch(setMessage('המוצר נמחק מרשימת המוצרים'));
    } catch (err) {
      console.error(err);
      alert('אירעה שגיאה במחיקת המוצר');
    }
  };

  return (
    <div className="manage-products-container">
      <h1>המוצרים שלנו</h1>

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
          {products.map(p => (
            <tr key={p.id}>
              <td>
                <img src={p.image} alt={p.name} width={60} />
              </td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>₪{p.price}</td>
              <td>
                <button onClick={() => deleteProductHandler(p.id)}>
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
