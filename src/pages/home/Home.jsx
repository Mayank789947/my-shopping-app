import styles from "./Home.module.css";
import Header from "/src/components/header/Header.jsx"
import shopImage from "/src/assets/shopImage.webp"; // transparent image
import { useNavigate } from "react-router-dom";


function Home() {

    const navigate = useNavigate()

    function handleCTABtn() {
      navigate(`/products`)
    }

    return (
        <>
            <Header />
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span className={styles.heroTag}>
                        GOOD FINDS. GREAT TIMES.
                    </span>

                    <h1>
                        Shop the best.
                        <br />
                        Live your <span>style.</span>
                    </h1>

                    <p>
                        Discover quality products you'll love,
                        <br />
                        at prices that make sense.
                    </p>

                    <button 
                        className={styles.ctaBtn}
                        onClick={handleCTABtn}
                    >
                        Explore Now →
                    </button>

                    <div className={styles.features}>
                        <div>🏆 Top Quality</div>
                        <div>🚚 Fast Delivery</div>
                        <div>🛡️ Secure Payments</div>
                        <div>🎧 24/7 Support</div>
                    </div>
                </div>

                <div className={styles.heroImage}>
                    <img src={shopImage} alt="Shopping Products" />
                </div>
            </section>
        </>

    );
}

export default Home;