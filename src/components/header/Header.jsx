import styles from './Header.module.css'

function Header () {
    return (
        <>
         <div className={styles.header}>
            <div className={styles.logo}>Shoppers</div>
            <ul className={styles.listContainer}>
                <li>Home</li>
                <li>Products</li>
                <li>About</li>
            </ul>
            <div className={styles.orderContainer}>
                <button className={styles.btn}>Order now</button>
                <i>cart image</i>
            </div>
         </div>
        </>
    )
}

export default Header