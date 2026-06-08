import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { CartContext } from "../../context/CartContext";

function Header() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const [menuOpen, setMenuOpen] = useState(false);

  function handleCart() {
    navigate("/cartpage");
    setMenuOpen(false);
  }

  function handleLogoClick() {
    navigate("/");
    setMenuOpen(false);
  }

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div
        className={styles.logo}
        onClick={handleLogoClick}
      >
        Shoppers
      </div>

      {/* Mobile Menu Button */}
      <button
        className={styles.menuButton}
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Navigation */}
      <ul
        className={`${styles.listContainer} ${
          menuOpen ? styles.open : ""
        }`}
      >
        <li>
          <NavLink
            to="/"
            end
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? styles.activeLink : ""
            }
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/products"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? styles.activeLink : ""
            }
          >
            Products
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/about"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? styles.activeLink : ""
            }
          >
            About
          </NavLink>
        </li>
      </ul>

      {/* Cart */}
      <div
        data-testid="cart-container"
        className={styles.cartContainer}
        onClick={handleCart}
      >
        <span className={styles.cartIcon}>
          🛒
        </span>

        {cart.length > 0 && (
          <span
            data-testid="cart-count"
            className={styles.cartBadge}
          >
            {cart.length}
          </span>
        )}
      </div>
    </header>
  );
}

export default Header;