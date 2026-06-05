import { useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'

function Header() {

    const navigate = useNavigate()
    const { cart } = useContext(CartContext)

    function handleHome() {
        navigate(`/`)
    }

    function handleProducts() {
        navigate(`/products`)
    }

    function handleCart() {
        navigate(`/cartpage`)
    }

    return (
        <>
            <div className={styles.header}>
                <div className={styles.logo}>Shoppers</div>
                <ul className={styles.listContainer}>
                    <li onClick={handleHome}>Home</li>
                    <li onClick={handleProducts}>Products</li>
                    <li>About</li>
                </ul>
                <div
                    className={styles.cartContainer}
                    onClick={handleCart}
                >
                    <span className={styles.cartIcon}>
                        🛒
                    </span>

                    {cart.length > 0 && (
                        <span className={styles.cartBadge}>
                            {cart.length}
                        </span>
                    )}
                </div>
            </div>
        </>
    )
}

export default Header