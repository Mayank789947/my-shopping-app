import { useContext } from "react"
import styles from "/src/pages/cartPage/CartPage.module.css"
import { CartContext } from "../../context/CartContext"
import CartItem from "../../components/cartItem/CartItem"
import Header from "../../components/header/Header"

function CartPage() {
  const { cart } = useContext(CartContext)

  const totalPrice = cart.reduce(
    (prev, curr) => prev + curr.price * curr.quantity, 0)

  const totalItems = cart.reduce(
    (prev, curr) => prev + curr.quantity, 0)

  return (
    <>
      <Header />
      {(cart.length === 0) ? (
        <div>Your cart is empty</div>
      ) : (
        cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
          />
        ))
      )
      }
      <div className={styles.cartSummary}>
        <p>Total Items: {totalItems}</p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <button>Checkout</button>
      </div>
    </>
  )

}

export default CartPage