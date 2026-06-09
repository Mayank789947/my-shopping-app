# Shoppers - Shopping Cart Application

## Overview

Shoppers is a modern e-commerce frontend built with React. The application allows users to browse products, view detailed product information, manage a shopping cart, complete a checkout flow, and place orders through a simulated checkout experience.

This project focuses on React fundamentals, state management, routing, responsive design, and testing while providing a realistic online shopping workflow.

---

## Features

### Product Browsing

* Fetches products from the Fake Store API
* Responsive product grid layout
* Product categories and ratings
* Dedicated product details page
* Loading and error handling states

### Shopping Cart

* Add products to cart
* Increase and decrease quantities
* Remove items automatically when quantity reaches zero
* Real-time cart badge updates
* Order summary calculations

### Checkout Flow

* Customer information form
* Shipping address form
* Payment method selection (demo)
* Order summary review
* Simulated order placement

### Notifications

* Success notifications for cart actions
* User feedback for important interactions
* Improved shopping experience

### Order Success

* Order confirmation page
* Cart reset after successful checkout
* Continue shopping functionality

### Responsive Design

* Desktop, tablet, and mobile layouts
* Mobile navigation menu
* Flexible product grid

### Testing

* Component testing with Vitest
* User interaction testing with React Testing Library
* Context and routing behavior tests

---

## Built With

* React
* React Router
* Context API
* CSS Modules
* Vitest
* React Testing Library
* Fake Store API

---

## Project Structure

```text
src/
├── components/
│   ├── card/
│   ├── cartItem/
│   ├── header/
│   ├── loading/
│   ├── notification/
│   └── error/
│
├── context/
│   └── CartContext.jsx
│
├── pages/
│   ├── home/
│   ├── products/
│   ├── productDetails/
│   ├── cartPage/
│   ├── checkout/
│   ├── success/
│   └── about/
│
├── App.jsx
└── main.jsx
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the project directory:

```bash
cd shoppers
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

## Running Tests

Run all tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test
```

Generate coverage report:

```bash
npm run coverage
```

---

## Learning Outcomes

This project helped reinforce:

* React component architecture
* State management with Context API
* React Router navigation
* API data fetching
* Conditional rendering
* Responsive UI development
* Component testing
* User interaction testing
* CSS Modules organization

---

## Future Improvements

Potential enhancements include:

* Product search and filtering
* Product categories page
* User authentication
* Wishlist functionality
* Backend integration
* Real payment gateway integration
* Order history
* Persistent user accounts

---

## Acknowledgements

Product data provided by the Fake Store API:

https://fakestoreapi.com

---

## Author

Mayank Rawat

Built as a portfolio project to practice modern React development, state management, routing, responsive UI design, and frontend testing.
