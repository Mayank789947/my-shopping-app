import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Card from './components/card/Card'
import Home from './components/home/Home'
import ProductDetailsPage from './components/productDetailsPage/ProductDetailsPage'
import Products from './components/products/Products'

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
])

function App() {

  return (
    <>
     <RouterProvider router={router} />
    </>
     
  )
}

export default App
