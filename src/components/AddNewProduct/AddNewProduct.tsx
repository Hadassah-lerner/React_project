import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './AddNewProduct.scss';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../redux/slices/systemMessageSlice';
import { addProduct as apiAddProduct } from '../../apis/apis';

interface ProductFormValues {
  name: string;
  category: string;
  price: number;
  image: string;
}

const AddNewProduct: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validationSchema = yup.object().shape({
    name: yup.string().required('יש להזין שם'),
    category: yup.string().required('יש להזין קטגוריה'),
    price: yup
      .number()
      .typeError('יש להזין מספר חוקי')
      .required('יש להזין מחיר'),
    image: yup.string().required('יש להכניס תמונה'),
  });

  const formik = useFormik<ProductFormValues>({
    initialValues: { name: '', category: '', price: 0, image: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // קריאה ל־API עם טיפוס נכון
        const createdProduct = await apiAddProduct(values);
        dispatch(setMessage('המוצר נוסף לרשימת המוצרים'));
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

        {/* תמונה */}
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
            onChange={(e) => {
              const file = e.currentTarget.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  if (reader.result && typeof reader.result === 'string') {
                    formik.setFieldValue('image', reader.result);
                  }
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          {formik.touched.image && formik.errors.image && (
            <div className="add-form-card__error">{formik.errors.image}</div>
          )}
        </div>

        {/* שם */}
        <div className="add-form-card__field">
          <label>שם:</label>
          <input
            {...formik.getFieldProps('name')}
            placeholder="שם המוצר"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="add-form-card__error">{formik.errors.name}</div>
          )}
        </div>

        {/* קטגוריה */}
        <div className="add-form-card__field">
          <label>קטגוריה:</label>
          <input
            {...formik.getFieldProps('category')}
            placeholder="קטגוריה"
          />
          {formik.touched.category && formik.errors.category && (
            <div className="add-form-card__error">{formik.errors.category}</div>
          )}
        </div>

        {/* מחיר */}
        <div className="add-form-card__field">
          <label>מחיר:</label>
          <input
            {...formik.getFieldProps('price')}
            type="number"
            placeholder="מחיר"
          />
          {formik.touched.price && formik.errors.price && (
            <div className="add-form-card__error">{formik.errors.price}</div>
          )}
        </div>

        <button type="submit" className="add-form-card__submit">
          הוסף מוצר
        </button>

        {errorMessage && (
          <div className="add-form-card__error">{errorMessage}</div>
        )}
      </form>
    </div>
  );
};

export default AddNewProduct;
