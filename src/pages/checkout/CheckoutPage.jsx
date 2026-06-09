import { useContext } from "react";
import styles from "/src/pages/checkout/CheckoutPage.module.css"
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";

function CheckoutPage() {

  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 49 ? 5 : 15;

  const total = subtotal + shipping;

  function handleOrder() {
    clearCart();
    navigate("/success");
  }

  return (
    <>
      <Header />
      <main className={styles.checkout}>
        <section className={styles.formSection}>
          <h1>Checkout</h1>

          <div className={styles.block}>
            <h2>Customer Information</h2>

            <input
              type="text"
              placeholder="Full Name"
            />

            <input
              type="email"
              placeholder="Email Address"
            />
          </div>

          <div className={styles.block}>
            <h2>Shipping Address</h2>

            <input
              type="text"
              placeholder="Street Address"
            />

            <input
              type="text"
              placeholder="City"
            />

            <input
              type="text"
              placeholder="Postal Code"
            />
          </div>

          <div className={styles.paymentOptions}>
            <label className={styles.paymentCard}>
              <input
                type="radio"
                name="payment"
                defaultChecked
              />

              <div>
                <h4>Cash on Delivery</h4>
                <p>Pay when your order arrives.</p>
              </div>
            </label>

            <label className={styles.paymentCard}>
              <input
                type="radio"
                name="payment"
              />

              <div>
                <h4>Credit Card</h4>
                <p>Demo payment method.</p>
              </div>
            </label>
          </div>

        </section>

        <aside className={styles.summary}>
          <h2>Order Summary</h2>

          {/* cart items here */}

          {cart.map((item) => (
            <div
              key={item.id}
              className={styles.summaryItem}
            >
              <span>
                {item.title} x {item.quantity}
              </span>

              <span>
                ₹{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          <div className={styles.totalSection}>
            <p>Subtotal: ₹{subtotal.toFixed(2)}</p>

            <p>Shipping: ₹{shipping.toFixed(2)}</p>

            <h3>Total: ₹{total.toFixed(2)}</h3>
          </div>

          <button
            disabled={cart.length === 0}
            onClick={handleOrder}
            className={styles.placeOrder}
          >
            Place Order
          </button>

        </aside>
      </main>
    </>
  );
}

export default CheckoutPage