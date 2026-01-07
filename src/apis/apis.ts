import { ProductModel } from '../models/ProductModel';
import { UserModel } from '../models/UserModel';

const BASE_URL = "/api";

/* ===================== PRODUCTS ===================== */

export const getProducts = async (): Promise<ProductModel[]> => {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("שגיאה בשליפת מוצרים");

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
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("מוצר לא נמצא");

  const p = await res.json();
  return new ProductModel(
    p.id,
    p.name,
    p.category,
    p.price,
    p.image
  );
};

export const addProduct = async (
  product: Omit<ProductModel, "id">
): Promise<ProductModel> => {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) throw new Error("שגיאה בהוספת מוצר");

  const p = await res.json();
  return new ProductModel(
    p.id,
    p.name,
    p.category,
    p.price,
    p.image
  );
};

export const deleteProductById = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/products/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("מחיקת המוצר נכשלה");
};

export const updateProduct = async (
  id: string,
  product: Omit<ProductModel, "id">
): Promise<ProductModel> => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) throw new Error("עדכון המוצר נכשל");

  const p = await res.json();
  return new ProductModel(
    p.id,
    p.name,
    p.category,
    p.price,
    p.image
  );
};

/* ===================== USERS ===================== */

export const getUserByEmail = async (email: string): Promise<UserModel[]> => {
  const res = await fetch(`${BASE_URL}/users?email=${email}`);
  if (!res.ok) throw new Error("שגיאה בשליפת משתמש");

  const data = await res.json();
  return data.map(
    (u: any) =>
      new UserModel(
        u.id,
        u.name,
        u.email,
        u.password,
        u.role
      )
  );
};

export const addUser = async (
  user: Omit<UserModel, "id">
): Promise<UserModel> => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!res.ok) throw new Error("הרשמת המשתמש נכשלה");

  const u = await res.json();
  return new UserModel(
    u.id,
    u.name,
    u.email,
    u.password,
    u.role
  );
};

export const updateUser = async (
  id: string,
  user: Omit<UserModel, "id">
): Promise<UserModel> => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!res.ok) throw new Error("עדכון המשתמש נכשל");

  const u = await res.json();
  return new UserModel(
    u.id,
    u.name,
    u.email,
    u.password,
    u.role
  );
};
