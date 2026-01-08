import { FC } from "react";
import { ProductModel } from "../../models/ProductModel";
import { useNavigate } from "react-router-dom";
import "./Product.scss";

interface ProductCardProps {
  product: ProductModel;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price} ₪</p>
    </div>
  );
};

export default ProductCard;
