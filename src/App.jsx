import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Card from './components/card/Card'
import Home from '/src/pages/home/Home.jsx'
import ProductDetailsPage from '/src/pages/productDetailsPage/ProductDetailsPage.jsx'
import Products from '/src/pages/products/Products.jsx'

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
