import { useParams } from "react-router-dom"
import styles from "/src/components/productDetailsPage/ProductDetailsPage.module.css"
import { useEffect, useState } from "react"
import Loading from "../../components/loading/Loading"
import ErrorPage from "../../components/error/ErrorPage"

function ProductDetailsPage() {

    const { id } = useParams()

    const [product, setProduct] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

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

    return (
        <>
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
                        <button className={styles.cartBtn}>Add To Cart</button>
                        <button className={styles.buyBtn}>Buy Now</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetailsPage