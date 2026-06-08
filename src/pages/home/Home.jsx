import styles from "./Home.module.css";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  function handleCTABtn() {
    navigate("/products");
  }

  return (
    <>
      <Header />

      <main className={styles.home}>
        <section className={styles.hero}>
          <span className={styles.heroTag}>
            GOOD FINDS. GREAT TIMES.
          </span>

          <h1>
            Shop Smarter.
            <br />
            Live Your <span>Style.</span>
          </h1>

          <p>
            Discover premium products, trending collections,
            and everyday essentials — all in one place.
          </p>

          <button
            className={styles.ctaBtn}
            onClick={handleCTABtn}
          >
            Explore Products →
          </button>

          <div className={styles.features}>
            <div>🏆 Quality Products</div>
            <div>🚚 Fast Delivery</div>
            <div>🛡️ Secure Payments</div>
            <div>🎧 24/7 Support</div>
          </div>
        </section>

      </main>
    </>
  );
}

export default Home;