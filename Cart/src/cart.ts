// Array of cart items stored
const cartItems = [
  {
    id: 1,
    title: "Product 1",
    description: "This is a brief description of Product 1.",
    price: 99.99,
    quantity: 1,
    image: "images/Female bags/img1.jpeg",
  },

  {
    id: 2,
    title: "Product 2",
    description: "This is a brief description of Product 2.",
    price: 79.99,
    quantity: 2,
    image: "images/Female bags/img2.jpg",
  },

  {
    id: 3,
    title: "Product 3",
    description: "This is a brief description of Product 3.",
    price: 79.99,
    quantity: 1,
    image: "images/Female bags/img3.jpg",
  },
];

// function to render cart items
function renderCartItems() {
  const cartItemsContainer: HTMLDivElement | null =
    document.querySelector("#cart-items");
  if (!cartItemsContainer) return;

  //   clear  existing items
  cartItemsContainer.innerHTML = "";

  // Initialize  subtotal  value
  let subtotalValue = 0;

  //   Loop through cart items and generate HTML

  cartItems.forEach((item) => {
    let { image, title, description, price, quantity, id } = item;
    // const itemTotal = item.price * item.quantity;
    const itemTotal = price * quantity;
    subtotalValue += itemTotal;
    const cartItemsHTML = `
                <div class="cart-item">
                <img src="${image}" alt="${title}" class="item-image">
                <div class="item-details">
                    <h2 class="item-title">${title}</h2>
                    <p class="item-description">${description}</p>
                    <p class="item-price">$${price.toFixed(2)}</p>
                    <div class="item-quantity">
                        Quantity: <input type="number" value="${quantity}" min="1" onchange="updateQuantity(${id}, this.value)">
                        <button class="remove-item" onclick="removeItem(${id})">Remove</button>
                    </div>
                </div>
            </div>

    `;
    // Append generated item to cart container
    cartItemsContainer.insertAdjacentHTML("beforeend", cartItemsHTML);
  });
  // update subtotal and total(subtotal+ shipping )
  const subtotalElement: HTMLSpanElement | null =
    document.querySelector("#subtotal");
  if (subtotalElement) {
    subtotalElement.textContent = `$${subtotalValue.toFixed(2)}`;
  }
  const totalElement = document.querySelector("#total");
  if (totalElement) {
    totalElement.textContent = `$${(subtotalValue + 10).toFixed(2)}`;
  }

  // function update item quantity

  function updateQuantity(id: number, newQuantity: number) {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      item.quantity = newQuantity;
      renderCartItems();
    }
  }

  function removeItem(id: number) {
    const index = cartItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      cartItems.splice(index, 1); // Remove the item from the array
      renderCartItems(); // Re-render the cart items
    }
  }
}

// Initial render  of cart items

renderCartItems();
