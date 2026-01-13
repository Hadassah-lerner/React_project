import axios from './axios';
import { ReviewModel } from '../models/ReviewModel';

export const getReviewsByProduct = async (productId: number) => {
  const res = await axios.get<ReviewModel[]>('/reviews', {
    params: { productId },
  });
  return res.data;
};

export const createReview = async (review: {
  productId: number;
  userId: string;
  rating: number;
  comment: string;
}) => {
  const res = await axios.post<ReviewModel>('/reviews', review);
  return res.data;
};

export const deleteReviewById = async (reviewId: number) => {
  await axios.delete(`/reviews/${reviewId}`);
};