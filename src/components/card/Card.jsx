import { useContext } from "react"
import styles from "./Card.module.css"
import { CartContext } from "../../context/CartContext"

function Card({ product, onClick }) {

    const { addToCart } = useContext(CartContext)

    return (
        <>
            <article className={styles.card}>
                <img
                    className={styles.cardImage}
                    src={product.image}
                    alt={product.title}
                />

                <span className={styles.category}>
                    {product.category}
                </span>

                <h3 className={styles.productName}>
                    {product.title}
                </h3>

                <div className={styles.rating}>
                    ⭐ {product.rating.rate} <span>({product.rating.count})</span>
                </div>

                <div className={styles.priceContainer}>
                    <span className={styles.price}>
                        ${product.price}
                    </span>

                    <span className={styles.oldPrice}>
                        $49.99
                    </span>
                </div>

                <span className={styles.discount}>
                    Save 40%
                </span>

                <div className={styles.btnContainer}>
                    <button 
                      className={styles.viewBtn}
                      onClick={onClick}
                    >
                        View
                    </button>

                    <button 
                       className={styles.cartBtn}
                       onClick={() => addToCart(product)}
                    >
                        Add To Cart
                    </button>
                </div>
            </article>
        </>
    )
}

export default Card