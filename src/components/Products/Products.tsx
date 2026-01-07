import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addProduct } from '../../redux/slices/shoppingCartSlice';
import { useDispatch, useSelector } from 'react-redux';
import './Product.scss';
import { ReviewModel } from '../../models/ReviewModel';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { api } from '../../api/apis';
import { setMessage } from '../../redux/slices/systemMessageSlice';

interface ProductProps {}

const Product: FC<ProductProps> = () => {
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state.product;
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.userState);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // -------------------- פונקציה לטעינת חוות דעת --------------------
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await api.getReviewsByProductId(product.id);
        if (!response.ok) throw new Error('שגיאה בטעינת חוות דעת');
        const data: ReviewModel[] = await response.json();
        setReviews(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'שגיאה בטעינת חוות דעת');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [product.id]);

  // -------------------- הוספת חוות דעת --------------------
  const validationSchema = yup.object().shape({
    comment: yup.string().required('יש להזין תגובה').min(2, 'לפחות 2 תווים'),
    rating: yup.number().required('יש להזין דירוג').min(1).max(5),
  });

  const formik = useFormik({
    initialValues: { comment: '', rating: 1 },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const newReview: ReviewModel = {
          productId: product.id,
          userId: user?.id || 'guest-' + Math.floor(Math.random() * 10000),
          comment: values.comment,
          rating: values.rating,
        };
        const response = await api.addReview(newReview);
        if (!response.ok) throw new Error('שליחת חוות הדעת נכשלה');
        const createdReview = await response.json();
        setReviews(prev => [...prev, createdReview]);
        dispatch(setMessage("חוות הדעת נוספה בהצלחה"));
        resetForm();
        setError('');
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'שגיאה בשליחת חוות הדעת');
      }
    },
  });

  const addToCartHandler = () => {
    dispatch(addProduct(product));
    dispatch(setMessage("המוצר נוסף לעגלה"));
  };

  const deleteReviewHandler = async (reviewId: string | number) => {
    try {
      const response = await api.deleteReview(reviewId);
      if (!response.ok) throw new Error('מחיקת חוות הדעת נכשלה');
      setReviews(prev => prev.filter(r => r.id !== reviewId));
      dispatch(setMessage('חוות הדעת נמחקה'));
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'שגיאה במחיקת חוות הדעת');
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
              <button className="add-to-cart-btn" onClick={addToCartHandler}>
                הוסף לסל
              </button>
            </div>
          </div>

          <div className="review-panel">
            <h4 className="review-title">חוות דעת</h4>
            {loading && <p>טוען חוות דעת...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {reviews.map((review) => (
              <div className="review-card" key={review.id}>
                <div className="review-stars">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
                <p className="review-comment">{review.comment}</p>
                {user?.id && review.userId === user.id && (
                  <button className="add-to-cart-btn" onClick={() => deleteReviewHandler(review.id)}>
                    מחק
                  </button>
                )}
              </div>
            ))}

            {user?.role === 'customer' && (
              <div className="add-review-container">
                <h5 className="add-review-title">הוסף חוות דעת</h5>
                <form className="add-review-form" onSubmit={formik.handleSubmit}>
                  <div className="add-review-field">
                    <label>תגובה</label>
                    <input
                      type="text"
                      name="comment"
                      value={formik.values.comment}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.comment && formik.errors.comment && (
                      <div className="add-review-error">{formik.errors.comment}</div>
                    )}
                  </div>

                  <div className="add-review-field">
                    <label>דירוג (1-5)</label>
                    <input
                      type="number"
                      name="rating"
                      min={1}
                      max={5}
                      value={formik.values.rating}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.rating && formik.errors.rating && (
                      <div className="add-review-error">{formik.errors.rating}</div>
                    )}
                  </div>

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
