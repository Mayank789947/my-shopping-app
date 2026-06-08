import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import Card from "./Card";
import { CartContext } from "../../context/CartContext";

const product = {
  id: 1,
  title: "Test Product",
  price: 29.99,
  image: "test.jpg",
  category: "electronics",
  rating: {
    rate: 4.5,
    count: 120,
  },
};

describe("Card component", () => {
  function renderCard(
    ui,
    {
      cart = [],
      addToCart = vi.fn(),
      incrementQuantity = vi.fn(),
      decrementQuantity = vi.fn(),
    } = {}
  ) {
    render(
      <CartContext.Provider
        value={{
          cart,
          addToCart,
          incrementQuantity,
          decrementQuantity,
        }}
      >
        {ui}
      </CartContext.Provider>
    );

    return {
      addToCart,
      incrementQuantity,
      decrementQuantity,
    };
  }

  it("renders product title and price", () => {
    renderCard(<Card product={product} />);

    expect(
      screen.getByText("Test Product")
    ).toBeInTheDocument();

    expect(
      screen.getByText("$29.99")
    ).toBeInTheDocument();
  });

  it("renders product image", () => {
    renderCard(<Card product={product} />);

    const image = screen.getByRole("img", {
      name: "Test Product",
    });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test.jpg");
  });

  it("renders action buttons when item is not in cart", () => {
    renderCard(<Card product={product} />);

    expect(
      screen.getByRole("button", { name: "View" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Add To Cart",
      })
    ).toBeInTheDocument();
  });

  it("calls onClick when View button is clicked", async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();

    renderCard(
      <Card
        product={product}
        onClick={mockOnClick}
      />
    );

    await user.click(
      screen.getByRole("button", {
        name: "View",
      })
    );

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("calls addToCart when Add To Cart button is clicked", async () => {
    const user = userEvent.setup();

    const { addToCart } = renderCard(
      <Card product={product} />
    );

    await user.click(
      screen.getByRole("button", {
        name: "Add To Cart",
      })
    );

    expect(addToCart).toHaveBeenCalledTimes(1);
    expect(addToCart).toHaveBeenCalledWith(product);
  });

  it("renders quantity controls when item is already in cart", () => {
    renderCard(<Card product={product} />, {
      cart: [
        {
          ...product,
          quantity: 3,
        },
      ],
    });

    expect(
      screen.getByText("3")
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "Add To Cart",
      })
    ).not.toBeInTheDocument();
  });

  it("calls incrementQuantity when + button is clicked", async () => {
    const user = userEvent.setup();

    const { incrementQuantity } = renderCard(
      <Card product={product} />,
      {
        cart: [
          {
            ...product,
            quantity: 1,
          },
        ],
      }
    );

    await user.click(
      screen.getByRole("button", {
        name: "+",
      })
    );

    expect(incrementQuantity).toHaveBeenCalledWith(
      product.id
    );
  });

  it("calls decrementQuantity when − button is clicked", async () => {
    const user = userEvent.setup();

    const { decrementQuantity } = renderCard(
      <Card product={product} />,
      {
        cart: [
          {
            ...product,
            quantity: 1,
          },
        ],
      }
    );

    await user.click(
      screen.getByRole("button", {
        name: "−",
      })
    );

    expect(decrementQuantity).toHaveBeenCalledWith(
      product.id
    );
  });
});