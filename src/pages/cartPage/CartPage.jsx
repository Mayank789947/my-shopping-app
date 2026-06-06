import { useContext } from "react";
import styles from "/src/pages/cartPage/CartPage.module.css";

import Header from "../../components/header/Header";
import CartItem from "../../components/cartItem/CartItem";

import { CartContext } from "../../context/CartContext";

function CartPage() {
  const { cart } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (prev, curr) => prev + curr.price * curr.quantity,
    0
  );

  const totalItems = cart.reduce(
    (prev, curr) => prev + curr.quantity,
    0
  );

  return (
    <>
      <Header />

      <div className={styles.cartPage}>
        <h1 className={styles.pageTitle}>Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className={styles.emptyCart}>
            <h2>🛒</h2>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added anything yet.</p>
          </div>
        ) : (
          <div className={styles.cartLayout}>
            {/* Cart Items */}
            <div className={styles.cartItems}>
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                />
              ))}
            </div>

            {/* Order Summary */}
            <div className={styles.cartSummary}>
              <h2 className={styles.summaryTitle}>
                Order Summary
              </h2>

              <div className={styles.summaryRow}>
                <span>Total Items</span>
                <span data-testid="total-items">{totalItems}</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Total Price</span>

                <span data-testid="total-price">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <button className={styles.checkoutBtn}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CartPage;