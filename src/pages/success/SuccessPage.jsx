import Header from "../../components/header/Header";
import styles from "/src/pages/success/SuccessPage.module.css";
import { useNavigate } from "react-router-dom";

function SuccessPage() {
    const navigate = useNavigate();

    const orderId = Math.floor(
        100000 + Math.random() * 900000
    );

    return (
        <>
            <Header />

            <main className={styles.successPage}>
                <div className={styles.icon}>🎉</div>

                <h1>Order Placed Successfully!</h1>

                <p>Order ID: #{orderId}</p>
                <p>
                    Thank you for your purchase. Your order has been
                    received and is being processed.
                </p>

                <div className={styles.actions}>
                    <button
                        className={styles.button}
                        onClick={() => navigate("/products")}
                    >
                        Continue Shopping
                    </button>
                </div>
            </main>
        </>
    );
}

export default SuccessPage;