import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addProduct } from '../../redux/slices/shoppingCartSlice';
import { useDispatch, useSelector } from 'react-redux';
import './Product.scss';
import { useFetch } from '../../custom_hook/useFetch';
import { ReviewModel } from '../../models/ReviewModel';
import { clearReview } from '../../redux/slices/reviewSlice';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { setMessage } from '../../redux/slices/systemMessageSlice';

interface ProductProps { }

const Product: FC<ProductProps> = () => {
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state.product;
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.userState);
  const [error, setError] = useState<string>('');

  const validationSchema = yup.object().shape({
    comment: yup
      .string()
      .required('יש להזין תגובה')
      .min(2, 'התגובה צריכה להכיל לפחות 2 תווים'),
    rating: yup
      .number()
      .required('יש להזין דירוג')
      .min(1, 'הדירוג חייב להיות לפחות 1')
      .max(5, 'הדירוג לא יכול להיות מעל 5'),
  });

  const formik = useFormik({
    initialValues: {
      comment: '',
      rating: 1,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const newReview = {
          productId: product.id,
          userId: user?.id || 'guest-' + Math.floor(Math.random() * 10000),
          rating: values.rating,
          comment: values.comment,
        };

        const response = await fetch('http://localhost:3000/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newReview),
        });

        if (!response.ok) {
          throw new Error('שליחת חוות הדעת נכשלה');
        }

        const createdReview = await response.json();
        setReviews(prev => [...prev, createdReview]);
        dispatch(setMessage("חוות הדעת נוספה בהצלחה"));
        resetForm();
        setError('');
      } catch (err) {
        console.error(err);
        setError('אירעה שגיאה בשליחת חוות הדעת');
      }
    },
  });

  const addToCart = (product: any) => {
    dispatch(addProduct(product));
    dispatch(setMessage("המוצר נוסף לעגלה"));

  };

  const baseUrl = `http://localhost:3000/reviews?productId=${product.id}`;
  const { data, loading } = useFetch<ReviewModel[]>(baseUrl);

  useEffect(() => {
    if (data) {
      console.log('חוות דעת שהתקבלו מהשרת:', data);
      setReviews(data);
    }
  }, [data]);

  const deleteReview = async (review: ReviewModel) => {
    try {
      const response = await fetch(`http://localhost:3000/reviews/${review.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('מחיקת חוות הדעת נכשלה מהשרת');
      }
      setReviews(prevProducts => prevProducts.filter(p => p.id !== review.id));
      dispatch(clearReview());
      alert(' חוות הדעת נמחקה מהרשימה ');
    } catch (error: any) {
      console.error('שגיאה במחיקת  חוות הדעת:', error.message);
      alert('אירעה שגיאה במחיקת  חוות הדעת');
    }
  };

  return (
    <div className="Product">
      <div className="container-fluid product-details-page">
        <div className="product-and-review">
          <div className="product-card-mini">
            <button className="close-btn" onClick={() => navigate('/products')}>
              ✕
            </button>
            <h1 className="product-title">{product.name}</h1>
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <p><strong>קטגוריה:</strong> {product.category}</p>
              <p><strong>מחיר:</strong> ₪{product.price}</p>
              <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                הוסף לסל
              </button>
            </div>
          </div>

          <div className="review-panel">
            <h4 className="review-title">חוות דעת</h4>

            {reviews.map((review) => (
              <div className="review-card" key={review.id}>
                <div className="review-stars">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
                <p className="review-comment">{review.comment}</p>
                {user?.id && review.userId === user.id && (
                  <button className="add-to-cart-btn" onClick={() => deleteReview(review)}>מחק</button>
                )}
              </div>
            ))}

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading && (
              <div className="spinner-container">
                <div className="spinner"></div>
                <p>טוען חוות דעת...</p>
              </div>
            )}
           {user?.role === 'customer' &&(
            <div className="add-review-container">
              <h5 className="add-review-title">הוסף חוות דעת</h5>
              <form className="add-review-form" onSubmit={formik.handleSubmit}>
                <div className="add-review-field">
                  <label htmlFor="comment" className="add-review-label">תגובה</label>
                  <input
                    id="comment"
                    name="comment"
                    type="text"
                    placeholder="כתוב את דעתך"
                    className="add-review-input"
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.comment && formik.errors.comment && (
                    <div className="add-review-error">{formik.errors.comment}</div>
                  )}
                </div>

                <div className="add-review-field">
                  <label htmlFor="rating" className="add-review-label">דירוג (1 עד 5)</label>
                  <input
                    id="rating"
                    name="rating"
                    type="number"
                    min="1"
                    max="5"
                    className="add-review-input"
                    value={formik.values.rating}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.rating && formik.errors.rating && (
                    <div className="add-review-error">{formik.errors.rating}</div>
                  )}
                </div>

                {error && <div className="add-review-error">{error}</div>}

                <button type="submit" className="add-review-submit">הוסף חוות דעת</button>
              </form>
            </div>
)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
