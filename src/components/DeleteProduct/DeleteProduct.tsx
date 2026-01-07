import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../redux/slices/systemMessageSlice';
import { ProductModel } from '../../models/ProductModel';
import { getProducts, deleteProductById } from '../../apis/apis';
import './DeleteProduct.scss';

const DeleteProduct: FC = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(); // מקבל Product[] עם id:number
        // המרה לכל id ל-string כדי להתאים ל-ProductModel
        const fixedData: ProductModel[] = data.map(p => ({
          ...p,
          id: p.id.toString(),
        }));
        setProducts(fixedData);
      } catch (err) {
        console.error('שגיאה בטעינת מוצרים:', err);
      }
    };
    fetchProducts();
  }, []);

  const deleteProductHandler = async (id: string) => {
    try {
      await deleteProductById(id); // deleteProductById מקבל string
      setProducts(prev => prev.filter(p => p.id !== id));
      dispatch(setMessage('המוצר נמחק מרשימת המוצרים'));
    } catch (err) {
      console.error('שגיאה במחיקת מוצר:', err);
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
              <td><img src={p.image} alt={p.name} width={60} /></td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>₪{p.price}</td>
              <td>
                <button onClick={() => deleteProductHandler(p.id)}>מחק</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteProduct;
