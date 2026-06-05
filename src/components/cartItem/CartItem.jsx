import { useContext } from "react"
import styles from "/src/components/cartItem/CartItem.module.css"

function CartItem({ item }) {
  const { addToCart, decrementQuantity, removeFromCart } = useContext()

  return (
    <>
      <div>
        <img src={item.image} alt={item.title} />
        <h3>{item.title}</h3>
        <p>${item.price.toFixed(2)}</p>
        <button onClick={() => decrementQuantity(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => addToCart(item)}>+</button>
        <button onClick={() => removeFromCart(item.id)}>Delete</button>
      </div>
    </>
  )
}

export default CartItem