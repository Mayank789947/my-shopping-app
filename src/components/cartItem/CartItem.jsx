import { useContext } from "react";
import styles from "/src/components/cartItem/CartItem.module.css";

import { CartContext } from "../../context/CartContext";

function CartItem({ item }) {
  const {
    addToCart,
    decrementQuantity,
    removeFromCart,
  } = useContext(CartContext);

  const subtotal = item.price * item.quantity;

  return (
    <div className={styles.cartItem}>
      <div className={styles.imageContainer}>
        <img
          className={styles.productImage}
          src={item.image}
          alt={item.title}
        />
      </div>

      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>
          {item.title}
        </h3>

        <p className={styles.price}>
          ${item.price.toFixed(2)}
        </p>

        <p className={styles.subtotal}>
          Subtotal: ${subtotal.toFixed(2)}
        </p>

        <div className={styles.quantityControls}>
          <button
            className={styles.quantityBtn}
            onClick={() => decrementQuantity(item.id)}
          >
            -
          </button>

          <span className={styles.quantity}>
            {item.quantity}
          </span>

          <button
            className={styles.quantityBtn}
            onClick={() => addToCart(item)}
          >
            +
          </button>
        </div>
      </div>

      <button
        className={styles.deleteBtn}
        onClick={() => removeFromCart(item.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default CartItem;