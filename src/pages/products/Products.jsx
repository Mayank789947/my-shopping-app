import { useEffect, useState } from "react"
import styles from "./Products.module.css"
import Card from "../../components/card/Card"
import { useNavigate } from "react-router-dom"
import Loading from "../../components/loading/Loading"
import ErrorPage from "../../components/error/ErrorPage"

function Products() {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products")

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`)
                }

                const data = await response.json()
                setData(data)
                setError(null)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) return <Loading />
    if (error) {
        return (
            <ErrorPage
                title="Unable to load products"
                message={error.message}
            />
        )
    }

    function handleClick(id) {
        navigate(`/products/${id}`)
    }

    return (
        <>
            <div className={styles.productsGrid}>
                {data && data.map((product) => (
                    <Card
                        key={product.id}
                        product={product}
                        onClick={() => handleClick(product.id)}
                    />
                ))}
            </div>
        </>
    )

}

export default Products