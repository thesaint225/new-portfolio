interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const retrievesCartFromLocalStorage = (): CartItem[] | null => {
  try {
    const cartData = localStorage.getItem("cart");
    if (!cartData) return null;

    const parsedData = JSON.parse(cartData);
    if (isValidCartData(parsedData)) {
      return parsedData;
    } else {
      console.warn("Invalid cart data format.");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving cart data:", error);
    return null;
  }
};

const isValidCartData = (data: unknown): data is CartItem[] => {
  return (
    Array.isArray(data) &&
    data.every((item): item is CartItem => isValidCartItem(item))
  );
};

const isValidCartItem = (item: unknown): item is CartItem => {
  return (
    typeof item === "object" &&
    item !== null &&
    "id" in item &&
    "quantity" in item &&
    typeof item.id === "number" &&
    typeof item.quantity === "number" &&
    Number.isInteger(item.quantity) &&
    item.quantity >= 0
  );
};

const renderCartCountFromStorage = (): void => {
  const cartData = retrievesCartFromLocalStorage(); // Retrieve cart data here
  if (!cartData) {
    console.warn("No valid cart data found");
    return;
  }

  const totalItems = cartData.reduce((acc: number, item: CartItem) => {
    return acc + item.quantity;
  }, 0);

  const cartCountElement =
    document.querySelector<HTMLSpanElement>(".cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = totalItems.toString();
  } else {
    console.warn("Cart count element not found");
  }
};

const renderCartItemsFromStorage = (): void => {
  const cartData = retrievesCartFromLocalStorage();
  if (!cartData || cartData.length === 0) {
    console.warn("No valid cart data found");
    return;
  }

  const cartItemContainer = document.querySelector(".cart-items");
  const subtotalElement = document.querySelector(".subtotal");
  const discountElement = document.querySelector(".discount");
  const totalElement = document.querySelector(".total");
  const discountInput = document.querySelector(
    ".discount-input"
  ) as HTMLInputElement;
  const applyDiscountButton = document.querySelector(".apply-discount");

  if (
    !cartItemContainer ||
    !subtotalElement ||
    !discountElement ||
    !totalElement
  ) {
    console.warn("Cart items container or price elements not found");
    return;
  }

  // Clear existing items in cart
  cartItemContainer.innerHTML = "";
  // calculate subtotal using reduce ()
  const subtotal = cartData.reduce((acc: number, item: CartItem) => {
    return acc + item.price * item.quantity;
  }, 0);

  cartData.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("cart-item");

    cartItemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="item-image">
      <div class="item-details">
        <h3 class="item-name">${item.name}</h3>
        <p class="item-price">$${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <div class="item-quantity">
        <button class="quantity-btn minus">-</button>
        <input type="number" class="quantity-input" value="${
          item.quantity
        }" min="1">
        <button class="quantity-btn plus">+</button>
      </div>
      <button class="remove-item">Remove</button>`;

    // Event listeners
    const minusButton = cartItemElement.querySelector(
      ".minus"
    ) as HTMLButtonElement;
    const plusButton = cartItemElement.querySelector(
      ".plus"
    ) as HTMLButtonElement;
    const quantityInput = cartItemElement.querySelector(
      ".quantity-input"
    ) as HTMLInputElement;
    const removeButton = cartItemElement.querySelector(
      ".remove-item"
    ) as HTMLButtonElement;

    minusButton.addEventListener("click", () => {
      let quantity = parseInt(quantityInput.value);
      if (quantity > 1) {
        quantityInput.value = (quantity - 1).toString();
        addToCart(item.id, quantity - 1, item.name, item.price, item.image);
      }
    });

    plusButton.addEventListener("click", () => {
      let quantity = parseInt(quantityInput.value);
      quantityInput.value = (quantity + 1).toString();
      addToCart(item.id, quantity + 1, item.name, item.price, item.image);
    });

    removeButton.addEventListener("click", () => {
      const index = cartData.findIndex((cartItem) => cartItem.id === item.id);
      if (index !== -1) {
        cartData.splice(index, 1);
        saveCartToLocalStorage(); // Update local storage
        renderCartItemsFromStorage(); // Re-render cart items after removal
      }
    });

    cartItemContainer.appendChild(cartItemElement);
  });

  // update subtotal in dom
  subtotalElement.textContent = `Subtotal:$${subtotal.toFixed(2)}`;

  // Initial discount in DOM
  let discount = 0;
  // Apply discount when discount button is clicked
  applyDiscountButton?.addEventListener("click", () => {
    const discountCode = discountInput.value.trim();
    if (discountCode === "DISCOUNT10") {
      // 10% discount
      discount = subtotal * 0.1;
    } else {
      discount = 0;
      console.warn("Invalid discount code ");
    }
    // Update discount and total in the DOM
    discountElement.textContent = `Discount: -$${discount.toFixed(2)}`;
    totalElement.textContent = `Total: $${(subtotal - discount).toFixed(2)}`;
  });

  // Set initial total (without discount)
  totalElement.textContent = `Total: $${(subtotal - discount).toFixed(2)}`;
};

// Call renderCartItemsFromStorage when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  renderCartCountFromStorage(); // Update the cart count
  renderCartItemsFromStorage(); // Render the cart items
});
