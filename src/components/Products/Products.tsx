import { FC, useEffect, useState } from "react";
import { getProducts } from "../../apis/productsApi";
import { ProductModel } from "../../models/ProductModel";
import ProductCard from "../Product/ProductCard";
import "./Products.scss";

const PAGE_SIZE = 6;

const Products: FC = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const loadProducts = async (reset = false) => {
    setLoading(true);
    try {
      const data = await getProducts(page, PAGE_SIZE, category);

      setProducts(prev =>
        reset ? data.data : [...prev, ...data.data]
      );
      setPages(data.pages);
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadProducts();
  };

  const changeCategory = (cat?: string) => {
    setProducts([]);
    setPage(1);
    setCategory(cat);
  };

  return (
    <div className="products-container">
      <h1>המוצרים שלנו</h1>

      {/* קטגוריות */}
      <div className="categories">
        <button onClick={() => changeCategory(undefined)}>הכל</button>
        <button onClick={() => changeCategory("ורדים")}>ורדים</button>
        <button onClick={() => changeCategory("סחלבים")}>סחלבים</button>
        <button onClick={() => changeCategory("זרי כלה")}>זרי כלה</button>
      </div>

      {/* רשימת מוצרים */}
      <div className="products-grid">
      {products.map(product => (
  <ProductCard key={product.id} product={product} />
))}
      </div>


      {/* טעינה */}
      {loading && <p>טוען...</p>}

      {/* טען עוד */}
      {!loading && page < pages && (
        <button className="load-more" onClick={loadMore}>
          טען עוד
        </button>
      )}
    </div>
  );
};

export default Products;
