// src/api/apis.ts

// כתובת בסיס לשרת
// בלוקאלי:
//const BASE_URL = "http://localhost:3001";

// ב-AWS:
 const BASE_URL = "https://13.48.55.220:3001";

/* ===================== PRODUCTS ===================== */

export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("שגיאה בשליפת מוצרים");
  return res.json();
};

export const getProductById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("מוצר לא נמצא");
  return res.json();
};

export const addProduct = async (product: any) => {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("שגיאה בהוספת מוצר");
  return res.json();
};

export const deleteProductById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("מחיקת המוצר נכשלה");
  return res.json();
};

export const updateProduct = async (id: string, product: any) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("עדכון המוצר נכשל");
  return res.json();
};

/* ===================== USERS ===================== */

export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error("שגיאה בשליפת משתמשים");
  return res.json();
};

export const getUserByEmail = async (email: string) => {
  const res = await fetch(`${BASE_URL}/users?email=${email}`);
  if (!res.ok) throw new Error("שגיאה בשליפת משתמש");
  return res.json();
};

export const addUser = async (user: any) => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("הרשמת המשתמש נכשלה");
  return res.json();
};

export const updateUser = async (id: string, user: any) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("עדכון המשתמש נכשל");
  return res.json();
};

export const deleteUserById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("מחיקת המשתמש נכשלה");
  return res.json();
};

/* ===================== REVIEWS ===================== */

export const getReviewsByProductId = async (productId: string) => {
  const res = await fetch(`${BASE_URL}/reviews?productId=${productId}`);
  if (!res.ok) throw new Error("שגיאה בשליפת חוות דעת");
  return res.json();
};

export const addReview = async (review: any) => {
  const res = await fetch(`${BASE_URL}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (!res.ok) throw new Error("שליחת חוות הדעת נכשלה");
  return res.json();
};

export const deleteReviewById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/reviews/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("מחיקת חוות הדעת נכשלה");
  return res.json();
};
