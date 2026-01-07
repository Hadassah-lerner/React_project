import React, { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../../apis/apis';
import './Product.scss';

interface ProductModel {
  id: string; // תמיד string
  name: string;
  category: string;
  price: number;
  image: string;
}

const Product: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductModel | null>(null);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({ name: '', category: '', price: 0, image: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const fetched: ProductModel = await getProductById(id);
        setProduct(fetched);
        setFormData(fetched);
      } catch {
        setError('המוצר לא נמצא');
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.name === 'price' ? Number(e.target.value) : e.target.value;
    setFormData(prev => ({ ...prev, [e.target.name]: value }));
  };

  const handleSave = async () => {
    if (!product) return;
    try {
      const updatedProduct = await updateProduct(product.id, formData);
      setProduct(updatedProduct);
      setEditable(false);
    } catch {
      setError('אירעה שגיאה בעדכון המוצר');
    }
  };

  if (!product) return <div>{error || 'טוען מוצר...'}</div>;

  return (
    <div className="product-page">
      <h1>{product.name}</h1>
      {error && <div className="text-danger">{error}</div>}

      <img src={product.image} alt={product.name} className="product-image" />

      <div className="product-field">
        <label>שם:</label>
        <input name="name" value={formData.name} onChange={handleChange} disabled={!editable} />
      </div>

      <div className="product-field">
        <label>קטגוריה:</label>
        <input name="category" value={formData.category} onChange={handleChange} disabled={!editable} />
      </div>

      <div className="product-field">
        <label>מחיר:</label>
        <input name="price" type="number" value={formData.price} onChange={handleChange} disabled={!editable} />
      </div>

      {editable ? (
        <button onClick={handleSave}>שמור</button>
      ) : (
        <button onClick={() => setEditable(true)}>ערוך מוצר</button>
      )}

      <button onClick={() => navigate('/products')}>חזור לרשימת מוצרים</button>
    </div>
  );
};

export default Product;
