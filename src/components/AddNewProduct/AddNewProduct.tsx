import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from '../../apis/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../redux/slices/systemMessageSlice';
import './AddNewProduct.scss';

const AddNewProduct: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [preview, setPreview] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: { name: '', category: '', price: '', image: null as File | null },
    validationSchema: yup.object({
      name: yup.string().required('יש להזין שם'),
      category: yup.string().required('יש לבחור קטגוריה'),
      price: yup.number().required('יש להזין מחיר'),
      image: yup.mixed().required('יש להעלות תמונה'),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('category', values.category);
        formData.append('price', String(values.price));
        if (values.image) formData.append('image', values.image);

        const res = await axios.post('http://localhost:3001/api/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        dispatch(setMessage('המוצר נוסף בהצלחה'));
        navigate('/products');
      } catch (err) {
        console.error(err);
        setErrorMessage('אירעה שגיאה בהכנסת המוצר');
      }
    },
  });

  // Preview של התמונה לפני שליחה
  useEffect(() => {
    if (!formik.values.image) return setPreview(null);
    const objectUrl = URL.createObjectURL(formik.values.image);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [formik.values.image]);

  return (
    <div className="add-form-page">
      <div className="add-form-card">
        <h2 className="add-form-card__title">הוסף מוצר חדש</h2>

        {/* Preview של התמונה */}
        {preview && (
          <div className="add-form-card__preview">
            <img src={preview} alt="preview" />
          </div>
        )}

        <form onSubmit={formik.handleSubmit}>
          <div className="add-form-card__field">
            <label>שם מוצר</label>
            <input
              type="text"
              name="name"
              placeholder="שם מוצר"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name && <div className="add-form-card__error">{formik.errors.name}</div>}
          </div>

          <div className="add-form-card__field">
            <label>קטגוריה</label>
            <input
              type="text"
              name="category"
              placeholder="קטגוריה"
              onChange={formik.handleChange}
              value={formik.values.category}
            />
            {formik.errors.category && <div className="add-form-card__error">{formik.errors.category}</div>}
          </div>

          <div className="add-form-card__field">
            <label>מחיר</label>
            <input
              type="number"
              name="price"
              placeholder="מחיר"
              onChange={formik.handleChange}
              value={formik.values.price}
            />
            {formik.errors.price && <div className="add-form-card__error">{formik.errors.price}</div>}
          </div>

          <div className="add-form-card__field">
            <label>תמונה</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && formik.setFieldValue('image', e.target.files[0])}
            />
            {formik.errors.image && <div className="add-form-card__error">{formik.errors.image}</div>}
          </div>

          {errorMessage && <div className="add-form-card__error">{errorMessage}</div>}

          <button type="submit" className="add-form-card__submit">הוסף מוצר</button>
        </form>
      </div>
    </div>
  );
};

export default AddNewProduct;
