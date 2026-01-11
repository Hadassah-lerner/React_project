import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './AddNewProduct.scss';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../redux/slices/systemMessageSlice';

interface AddNewProductProps {}

const AddNewProduct: FC<AddNewProductProps> = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validationSchema = yup.object().shape({
    name: yup.string().required('יש להזין שם'),
    category: yup.string().required('יש להזין קטגוריה'),
    price: yup.number().typeError('יש להזין מספר חוקי').required('יש להזין מחיר'),
    image: yup.string().required('יש להכניס תמונה'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      category: '',
      price: '',
      image: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:3000/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (response.ok) dispatch(setMessage("המוצר נוסף לרשימת המוצרים"));

        if (!response.ok) throw new Error('נכשלה ההכנסה');

        sessionStorage.setItem('my-token', 'smile');
        navigate('/products');
      } catch {
        setErrorMessage('אירעה שגיאה בהכנסת המוצר, נסה שוב');
      }
    },
  });

  return (
    <div className="add-form-page" dir="rtl">
      <form className="add-form-card" onSubmit={formik.handleSubmit}>
        <button
          type="button"
          className="add-form-card__close"
          onClick={() => navigate('/products')}
        >
          ✕
        </button>

        <h2 className="add-form-card__title">
          {formik.values.name || 'מוצר חדש'}
        </h2>

        {formik.values.image && (
          <img
            src={formik.values.image}
            alt="product"
            className="add-form-card__image"
          />
        )}

        
 <div className="add-form-card__field">
  <label>תמונה:</label>
  <input
    type="file"
    accept="image/*"
    onChange={(event) => {
      const file = event.currentTarget.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          formik.setFieldValue('image', reader.result);
        };
        reader.readAsDataURL(file);
      }
    }}
  />
  {formik.touched.image && formik.errors.image && (
    <div className="add-form-card__error">{formik.errors.image}</div>
  )}
</div>


        <div className="add-form-card__field">
          <label>שם:</label>
          <input
            name="name"
            type="text"
            placeholder="שם המוצר"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="add-form-card__error">{formik.errors.name}</div>
          )}
        </div>

        <div className="add-form-card__field">
          <label>קטגוריה:</label>
          <input
            name="category"
            type="text"
            placeholder="קטגוריה"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.category && formik.errors.category && (
            <div className="add-form-card__error">{formik.errors.category}</div>
          )}
        </div>

        <div className="add-form-card__field">
          <label>מחיר:</label>
          <input
            name="price"
            type="number"
            placeholder="מחיר"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.price && formik.errors.price && (
            <div className="add-form-card__error">{formik.errors.price}</div>
          )}
        </div>

        <button type="submit" className="add-form-card__submit">
          הוסף מוצר
        </button>

        {errorMessage && <div className="add-form-card__error">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default AddNewProduct;
