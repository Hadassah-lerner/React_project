// כתובת בסיס לשרת
// בלוקאלי:
//const BASE_URL = "http://localhost:3001";

// ב-AWS:
const BASE_URL = "https://13.48.55.220:3001";

// ===================== TYPES =====================
import { ProductModel } from '../models/ProductModel';
import { UserModel } from '../models/UserModel';

export const getProducts = async (): Promise<ProductModel[]> => {
  const res = await fetch('...');
  const data = await res.json();

  return data.map(
    (p: any) =>
      new ProductModel(
        p.id,
        p.name,
        p.category,
        p.price,
        p.image
      )
  );
};

export const getProductById = async (id: string): Promise<ProductModel> => {
  const res = await fetch(`.../${id}`);
  const p = await res.json();

  return new ProductModel(
    p.id,
    p.name,
    p.category,
    p.price,
    p.image
  );
};

/*export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  content: string;
  rating: number;
}*/

// ===================== PRODUCTS =====================

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("שגיאה בשליפת מוצרים");
  return res.json();
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("מוצר לא נמצא");
  return res.json();
};

export const addProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("שגיאה בהוספת מוצר");
  return res.json();
};

export const deleteProductById = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/products/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("מחיקת המוצר נכשלה");
};

export const updateProduct = async (id: string, product: Omit<Product, "id">): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("עדכון המוצר נכשל");
  return res.json();
};

// ===================== USERS =====================

export const getUsers = async (): Promise<User[]> => {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error("שגיאה בשליפת משתמשים");
  return res.json();
};

export const getUserByEmail = async (email: string): Promise<User[]> => {
  const res = await fetch(`${BASE_URL}/users?email=${email}`);
  if (!res.ok) throw new Error("שגיאה בשליפת משתמש");
  return res.json();
};

export const addUser = async (user: Omit<User, "id">): Promise<User> => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("הרשמת המשתמש נכשלה");
  return res.json();
};

export const updateUser = async (id: string, user: Omit<User, "id">): Promise<User> => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("עדכון המשתמש נכשל");
  return res.json();
};

export const deleteUserById = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/users/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("מחיקת המשתמש נכשלה");
};

// ===================== REVIEWS =====================

export const getReviewsByProductId = async (productId: string): Promise<Review[]> => {
  const res = await fetch(`${BASE_URL}/reviews?productId=${productId}`);
  if (!res.ok) throw new Error("שגיאה בשליפת חוות דעת");
  return res.json();
};

export const addReview = async (review: Omit<Review, "id">): Promise<Review> => {
  const res = await fetch(`${BASE_URL}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (!res.ok) throw new Error("שליחת חוות הדעת נכשלה");
  return res.json();
};

export const deleteReviewById = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/reviews/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("מחיקת חוות הדעת נכשלה");
};
