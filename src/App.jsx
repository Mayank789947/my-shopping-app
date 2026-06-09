import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Card from './components/card/Card'
import Home from '/src/pages/home/Home.jsx'
import ProductDetailsPage from '/src/pages/productDetailsPage/ProductDetailsPage.jsx'
import Products from '/src/pages/products/Products.jsx'
import CartPage from './pages/cartPage/CartPage'
import About from './pages/about/About'
import { useContext } from 'react'
import { CartContext } from './context/CartContext'
import Notification from './components/notification/Notification'
import SuccessPage from './pages/success/SuccessPage'
import CheckoutPage from './pages/checkout/CheckoutPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "products",
    element: <Products />,
  },
  {
    path: "products/:id",
    element: <ProductDetailsPage />
  },
  {
    path: "cartpage",
    element: <CartPage />,
  },
  {
    path: "about",
    element: <About />
  },
  {
    path: "/success",
    element: <SuccessPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
])


function App() {

  const { notification } =
    useContext(CartContext);

  return (
    <>
      <Notification notification={notification} />
      <RouterProvider router={router} />
    </>

  )
}

export default App
