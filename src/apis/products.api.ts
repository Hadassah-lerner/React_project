import axios from './axios';
import { ProductModel } from '../models/ProductModel';

export interface ApiResponse {
  data: ProductModel[];
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
  };
}

/**
 * מחזיר את המוצרים עם pagination.
 */
export const getProducts = async (page: number, category?: string) => {
  const res = await axios.get<ApiResponse>('/products', {
    params: {
      page,
      limit: 20,
      ...(category && { category }),
    },
  });
  return res.data; // { data: ProductModel[], meta: {...} }
};

/**
 * מחזיר מוצר לפי ID
 */
export const getProductById = async (id: string | number) => {
  const res = await axios.get<ProductModel>(`/products/${id}`);
  return res.data;
};

/**
 * יוצר מוצר חדש
 */
export const createProduct = async (product: Omit<ProductModel, 'id'>) => {
  const res = await axios.post<ProductModel>('/products', product);
  return res.data;
};

/**
 * מעדכן מוצר קיים
 */
export const updateProduct = async (id: string | number, product: Partial<ProductModel>) => {
  const res = await axios.put<ProductModel>(`/products/${id}`, product);
  return res.data;
};

/**
 * מוחק מוצר לפי ID
 */
export const deleteProduct = async (id: string | number) => {
  await axios.delete(`/products/${id}`);
  return { success: true };
};
