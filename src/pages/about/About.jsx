import Header from "../../components/header/Header";
import styles from "./About.module.css";

function AboutPage() {
  return (
    <>
      <Header />

      <main className={styles.aboutPage}>
        <section className={styles.hero}>
          <h1>About Shoppers</h1>

          <p>
            At Shoppers, we believe online shopping should be simple,
            fast, and enjoyable. We bring together quality products
            across multiple categories, helping customers discover
            great items at competitive prices.
          </p>
        </section>

        <section className={styles.cardGrid}>
          <article className={styles.card}>
            <h2>🛍️ Wide Product Selection</h2>

            <p>
              From fashion and electronics to everyday essentials,
              Shoppers offers a carefully curated collection of
              products for every lifestyle.
            </p>
          </article>

          <article className={styles.card}>
            <h2>🚚 Fast Delivery</h2>

            <p>
              We work with trusted delivery partners to ensure your
              orders arrive safely and on time.
            </p>
          </article>

          <article className={styles.card}>
            <h2>💳 Secure Shopping</h2>

            <p>
              Your shopping experience is protected with secure
              transactions and reliable order management.
            </p>
          </article>
        </section>

        <section className={styles.missionSection}>
          <h2>Our Mission</h2>

          <p>
            Our mission is to make quality products accessible to
            everyone through a seamless online shopping experience.
            We focus on customer satisfaction, convenience, and
            delivering value with every purchase.
          </p>
        </section>

        <section className={styles.statsSection}>
          <div className={styles.statCard}>
            <h3>1000+</h3>
            <p>Products Available</p>
          </div>

          <div className={styles.statCard}>
            <h3>24/7</h3>
            <p>Customer Support</p>
          </div>

          <div className={styles.statCard}>
            <h3>Fast</h3>
            <p>Order Processing</p>
          </div>
        </section>
      </main>
    </>
  );
}

export default AboutPage;