import { ProductModel } from "../models/ProductModel";

interface ProductsResponse {
  data: ProductModel[];
  pages: number;
  items: number;
}

export const getProducts = async (
  page: number,
  limit: number,
  category?: string
): Promise<ProductsResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(category && { category })
  });

  const res = await fetch(`/api/products?${params}`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};
