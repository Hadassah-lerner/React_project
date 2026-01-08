import { FC } from "react";
import { ProductModel } from "../../models/ProductModel";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct, deleteProduct } from '../../redux/slices/shoppingCartSlice';

interface Props {
  product: ProductModel;
}

const ProductCard: FC<Props> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        onClick={() => navigate(`/products/${product.id}`)}
      />

      <h3>{product.name}</h3>
      <p>{product.price} ₪</p>

      <button onClick={() => dispatch(addToCart(product))}>
        הוסף לסל
      </button>
    </div>
  );
};

export default ProductCard;
