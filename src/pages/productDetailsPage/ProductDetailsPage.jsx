import { useNavigate, useParams } from "react-router-dom"
import styles from "/src/pages/productDetailsPage/ProductDetailsPage.module.css"
import { useContext, useEffect, useState } from "react"
import Loading from "../../components/loading/Loading"
import ErrorPage from "../../components/error/ErrorPage"
import { CartContext } from "../../context/CartContext"
import Header from "../../components/header/Header"

function ProductDetailsPage() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const {
        cart,
        addToCart,
        incrementQuantity,
        decrementQuantity
    } = useContext(CartContext);

    const cartItem = cart.find(
        (item) => item.id === product.id
    );


    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setLoading(true)

                const response = await fetch(`https://fakestoreapi.com/products/${id}`)

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`)
                }

                const productData = await response.json()

                setProduct(productData)
                setError(null)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        fetchProductData()
    }, [id])

    if (loading) return <Loading />
    if (error) {
        return (
            <ErrorPage
                title="Unable to load product"
                message={error.message}
            />
        )
    }

    function handleBuyBtn(product) {
        addToCart(product);
        navigate(`/cartpage`);
    }

    return (
        <>
            <Header />
            <div className={styles.productContainer}>
                <div className={styles.leftContainer}>
                    <img className={styles.productImage} src={product.image} alt={product.title} />
                </div>
                <div className={styles.rightContainer}>
                    <p className={styles.category}>{product.category}</p>

                    <h2>{product.title}</h2>

                    <p className={styles.price}>${product.price}</p>

                    <p className={styles.rating}>
                        ⭐ {product.rating.rate} <span>({product.rating.count} reviews)</span>
                    </p>

                    <p className={styles.description}>
                        {product.description}
                    </p>


                    <div className={styles.btnContainer}>
                        {
                            !cartItem ? (
                                <button
                                    className={styles.cartBtn}
                                    onClick={() => addToCart(product)}
                                >
                                    Add To Cart
                                </button>
                            ) : (
                                <div className={styles.quantityControls}>
                                    <button
                                        className={styles.quantityBtn}
                                        onClick={() =>
                                            decrementQuantity(product.id)
                                        }
                                    >
                                        −
                                    </button>

                                    <span className={styles.quantity}>
                                        {cartItem.quantity}
                                    </span>

                                    <button
                                        className={styles.quantityBtn}
                                        onClick={() =>
                                            incrementQuantity(product.id)
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                            )
                        }
                        <button 
                          className={styles.buyBtn}
                          onClick={() => handleBuyBtn(product)}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetailsPage