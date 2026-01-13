import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { addProduct } from '../../redux/slices/shoppingCartSlice';
import { setMessage } from '../../redux/slices/systemMessageSlice';
import { clearReview } from '../../redux/slices/reviewSlice';
import { ReviewModel } from '../../models/ReviewModel';
import { createReview, deleteReviewById, getReviewsByProduct } from '../../apis/reviews.api';
import './Product.scss';
import { getImageSrc } from '../../utils/getImageSrc';

const Product: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.userState);
  const product = location.state.product;

  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Validation schema
  const validationSchema = yup.object().shape({
    comment: yup.string().required('יש להזין תגובה').min(2, 'לפחות 2 תווים'),
    rating: yup.number().required('יש להזין דירוג').min(1).max(5),
  });

  // Load reviews
  useEffect(() => {
    setLoading(true);
      getReviewsByProduct(product.id)
  .then(reviews => setReviews(reviews))
  .catch(() => setError('שגיאה בטעינת חוות דעת'))
  .finally(() => setLoading(false));
  }, [product.id]);

  // Formik
  const formik = useFormik({
    initialValues: { comment: '', rating: 1 },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const newReview = {
          productId: product.id,
          userId: user?.id || 'guest-' + Math.floor(Math.random() * 10000),
          rating: values.rating,
          comment: values.comment,
        };
       const review = await createReview(newReview);
        setReviews(prev => [...prev, review]);
        dispatch(setMessage("חוות הדעת נוספה בהצלחה"));
        resetForm();
        setError('');
      } catch {
        setError('אירעה שגיאה בשליחת חוות הדעת');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleAddToCart = () => {
    dispatch(addProduct(product));
    dispatch(setMessage("המוצר נוסף לעגלה"));
  };

  const handleDeleteReview = async (review: ReviewModel) => {
    try {
      await deleteReviewById(Number(review.id));
      setReviews(prev => prev.filter(r => r.id !== review.id));
      dispatch(clearReview());
      dispatch(setMessage('חוות הדעת נמחקה בהצלחה'));
    } catch {
      alert('אירעה שגיאה במחיקת חוות הדעת');
    }
  };

  return (
    <div className="Product">
      <div className="container-fluid product-details-page">
        <div className="product-and-review">

          {/* Product Info */}
          <div className="product-card-mini">
            <button className="close-btn" onClick={() => navigate('/products')}>✕</button>
            <h1 className="product-title">{product.name}</h1>
            <img src={getImageSrc(product.image)}  alt={product.name} className="product-image" />
            <div className="product-info">
              <p><strong>קטגוריה:</strong> {product.category}</p>
              <p><strong>מחיר:</strong> ₪{product.price}</p>
              <button className="add-to-cart-btn" onClick={handleAddToCart}>הוסף לסל</button>
            </div>
          </div>

          {/* Reviews */}
          <div className="review-panel">
            <h4 className="review-title">חוות דעת</h4>

            {loading && <p>טוען חוות דעת...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {reviews.map(review => (
              <div className="review-card" key={review.id}>
                <div className="review-stars">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
                <p className="review-comment">{review.comment}</p>
                {user?.id && review.userId === user.id && (
                  <button className="add-to-cart-btn" onClick={() => handleDeleteReview(review)}>מחק</button>
                )}
              </div>
            ))}

            {/* Add Review Form */}
            {user?.role === 'customer' && (
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
                    <label htmlFor="rating" className="add-review-label">דירוג (1-5)</label>
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