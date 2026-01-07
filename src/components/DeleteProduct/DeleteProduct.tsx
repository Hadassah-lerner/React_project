import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../redux/slices/systemMessageSlice';
import { ProductModel } from '../../models/ProductModel';
import { getProducts, deleteProductById } from '../../apis/apis';
import './DeleteProduct.scss';

const DeleteProduct: FC = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [loadingIds, setLoadingIds] = useState<string[]>([]); // אילו מוצרים בתהליך מחיקה
  const dispatch = useDispatch();

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

  const deleteHandler = async (id: string) => {
    try {
      setLoadingIds(prev => [...prev, id]); // מתחילים להראות loading למוצר הזה
      await deleteProductById(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      dispatch(setMessage("המוצר נמחק מרשימת המוצרים"));
    } catch (err) {
      console.error(err);
      alert("אירעה שגיאה במחיקת המוצר");
    } finally {
      setLoadingIds(prev => prev.filter(lid => lid !== id)); // מסירים את ה-spinner
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
          {products.map(product => {
            const isDeleting = loadingIds.includes(product.id);
            return (
              <tr key={product.id}>
                <td><img src={product.image} alt={product.name} width={60} /></td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>₪{product.price}</td>
                <td>
                  <button
                    onClick={() => deleteHandler(product.id)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "מוחק..." : "מחק"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteProduct;
