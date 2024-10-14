// define  Product Data as array of objects
const products = [
  {
    id: 1,
    name: "Trendy Graphic Tee",
    sku: "TEE123",
    price: 24.99,
    originalPrice: 34.99,
    availability: 15,
    description:
      "Express your style with our comfortable and eye-catching graphic tee.",
    image: "images/Female bags/img1.jpeg",
    tags: ["Fashion", "Casual"],
    relatedProducts: ["Classic Denim Jacket", "Slim Fit Chinos"],
  },
  // Add more product objects here

  {
    id: 2,
    name: "Trendy Graphic Tee",
    sku: "TEE123",
    price: 24.99,
    originalPrice: 34.99,
    availability: 15,
    description:
      "Express your style with our comfortable and eye-catching graphic tee.",
    image: "images/Female bags/img1.jpeg",
    tags: ["Fashion", "Casual"],
    relatedProducts: ["Classic Denim Jacket", "Slim Fit Chinos"],
  },
  // Add more product objects here
  {
    id: 3,
    name: "Trendy Graphic Tee",
    sku: "TEE123",
    price: 24.99,
    originalPrice: 34.99,
    availability: 15,
    description:
      "Express your style with our comfortable and eye-catching graphic tee.",
    image: "images/Female bags/img2.jpg",
    tags: ["Fashion", "Casual"],
    relatedProducts: ["Classic Denim Jacket", "Slim Fit Chinos"],
  },
  // Add more product objects here
  {
    id: 4,
    name: "Trendy Graphic Tee",
    sku: "TEE123",
    price: 24.99,
    originalPrice: 34.99,
    availability: 15,
    description:
      "Express your style with our comfortable and eye-catching graphic tee.",
    image: "images/Female bags/img3.jpg",
    tags: ["Fashion", "Casual"],
    relatedProducts: ["Classic Denim Jacket", "Slim Fit Chinos"],
  },
];

let cartData: { id: number; quantity: number }[] = [];

// update the state button
const updateButtonsState = (
  plusButton: HTMLButtonElement | null,
  minusButton: HTMLButtonElement | null,
  currentQuantity: number,
  remainingStock: number
) => {
  if (plusButton && minusButton) {
    if (remainingStock <= 0) {
      plusButton.setAttribute("disabled", "true");
    } else {
      plusButton.removeAttribute("disabled");
    }

    if (currentQuantity <= 0) {
      minusButton.setAttribute("disabled", "true");
    } else {
      minusButton.removeAttribute("disabled");
    }
  }
};

// define the structure for a cart item
interface CartItem {
  id: number;
  quantity: number;
}

// define functions outside the loop to make  them accessible
// function update the updateAvailability
const updateAvailability = (
  availabilityElement: HTMLElement | null,
  newQuantity: number,
  availabilityStock: number
) => {
  const remainingStock = availabilityStock - newQuantity;
  if (availabilityElement) {
    availabilityElement.textContent = remainingStock.toString();
  }
  return remainingStock;
};
// function update cart count based on the quantities across all inputs

const updateCartCount = () => {
  const quantityInputs = document.querySelectorAll(".quantity-input");

  let totalQuantity = 0;

  quantityInputs.forEach((input) => {
    const inputValue = parseInt((input as HTMLInputElement).value);
    if (!isNaN(inputValue)) {
      totalQuantity += inputValue;
    }
  });

  // Update the cart count element with the total quantity
  if (cartCountElement) {
    cartCountElement.textContent = totalQuantity.toString();
  }
};

// load cart data from localStorage

function loadCartFromLocalStorage() {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cartData = JSON.parse(storedCart);
    updateUIFromCartData(); // Update UI based on loaded cart data
    updateCartCount(); // Update cart count based on loaded cart data
  }
}

// Function to update the UI based on cart data
function updateUIFromCartData() {
  cartData.forEach((item) => {
    const productCard = document.querySelector<HTMLElement>(
      `.product-card[data-id="${item.id}"]`
    );
    if (productCard) {
      const quantityInput =
        productCard.querySelector<HTMLInputElement>(".quantity-input");
      if (quantityInput) {
        quantityInput.value = item.quantity.toString(); // Update input with stored quantity
      }
    }
  });
}

//  Function to add/update items in the cart
function addToCart(productId: number, quantity: number) {
  const existingProductIndex = cartData.findIndex(
    (item) => item.id === productId
  );

  if (existingProductIndex !== -1) {
    // Update the quantity if the product already exists in the cart
    if (quantity > 0) {
      cartData[existingProductIndex].quantity = quantity;
    } else {
      // Remove the product from the cart if quantity is 0
      cartData.splice(existingProductIndex, 1);
    }
  } else if (quantity > 0) {
    // Add the product if it doesn't exist in the cart and quantity is greater than 0
    cartData.push({ id: productId, quantity });
  }

  console.log("Updated cartData:", cartData); // Debug log
  saveCartToLocalStorage();
}

function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cartData));
  console.log("Saved cartData to localStorage:", cartData); // Debug log
}

// Call this to load cart data when the page loads
loadCartFromLocalStorage();

const productGridElement: HTMLDivElement | null =
  document.querySelector("#productGrid");

const cartCountElement: HTMLElement | null =
  document.querySelector(".cart-count");

if (productGridElement) {
  // Loop through products and create product cards dynamically
  products.forEach((product) => {
    const productHTML = `
    <div class="product-card" data-id="${product.id}">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="product-sku">SKU: ${product.sku}</p>
        <p class="product-price">$${product.price} <span>$${
      product.originalPrice
    }</span></p>
<p class="product-availability">In Stock: <span class="availability-value">${
      product.availability
    }</span></p></p>
        <p class="product-description">${product.description}</p>
        <div class="product-tags">
          ${product.tags
            .map((tag) => `<span class="tag">${tag}</span>`)
            .join("")}
        </div>
      </div>
      <div class="related-products">
        <h4>You May Also Like</h4>
        <ul>
          ${product.relatedProducts.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
      <div class="quantity-selector">
        <button class="quantity-btn minus" data-id="${product.id}">-</button>
        <input type="number" class="quantity-input" value="1" min="1" max="${
          product.availability
        }" data-id="${product.id}">
        <button class="quantity-btn plus" data-id="${product.id}">+</button>
      </div>
     
    </div>
  `;
    // append  generated HTML to product grid  container
    productGridElement.insertAdjacentHTML("beforeend", productHTML);

    // Get last added product card to attach event listener
    const productCard = productGridElement.lastElementChild;

    // check if productCard exists before proceeding
    if (productCard) {
      // Add event listener for + button
      const plusButton: HTMLButtonElement | null =
        productCard.querySelector(".plus");
      const minusButton: HTMLButtonElement | null =
        productCard.querySelector(".minus");
      const quantityInput: HTMLInputElement | null =
        productCard.querySelector(".quantity-input");
      const availabilityElement: HTMLElement | null = productCard.querySelector(
        ".availability-value"
      );

      // Initialize stock
      let availabilityStock = product.availability;

      if (plusButton && minusButton && quantityInput) {
        // Event listener for the plus button
        plusButton.addEventListener("click", function () {
          let currentQuantity = parseInt(quantityInput.value);

          if (currentQuantity < availabilityStock) {
            const newQuantity = currentQuantity + 1;
            quantityInput.value = newQuantity.toString();

            // Update cart and UI
            const remainingStock = updateAvailability(
              availabilityElement,
              newQuantity,
              availabilityStock
            );
            updateButtonsState(
              plusButton,
              minusButton,
              newQuantity,
              remainingStock
            );
            addToCart(product.id, newQuantity);
            saveCartToLocalStorage();
            updateCartCount();
          }
        });

        // Event listener for the minus button
        minusButton.addEventListener("click", function () {
          const currentQuantity = parseInt(quantityInput.value);
          if (currentQuantity > 0) {
            const newQuantity = currentQuantity - 1;
            quantityInput.value = newQuantity.toString();

            // Update cart and UI
            const remainingStock = updateAvailability(
              availabilityElement,
              newQuantity,
              availabilityStock
            );
            updateButtonsState(
              plusButton,
              minusButton,
              newQuantity,
              remainingStock
            );
            addToCart(product.id, newQuantity);
            saveCartToLocalStorage();
            updateCartCount();
          }
        });

        // Handle direct input changes
        quantityInput.addEventListener("input", function () {
          let inputValue = parseInt(quantityInput.value);

          if (isNaN(inputValue) || inputValue < 1) {
            quantityInput.value = "0";
            addToCart(product.id, 0); // Ensure cart is updated with 0 or removed
          } else if (inputValue > availabilityStock) {
            inputValue = availabilityStock;
            quantityInput.value = inputValue.toString();
          }

          updateAvailability(
            availabilityElement,
            inputValue,
            availabilityStock
          );
          addToCart(product.id, inputValue);
          saveCartToLocalStorage();
          updateCartCount();
        });

        // Prevent invalid characters in input field
        quantityInput.addEventListener("keydown", function (e) {
          const invalidKeys = ["-", "e", "+", "."];
          if (
            invalidKeys.includes(e.key) ||
            (e.shiftKey && ["+", "-"].includes(e.key))
          ) {
            e.preventDefault();
          }
        });

        // Initialize button states
        const currentQuantity = parseInt(quantityInput.value) || 0;
        updateButtonsState(
          plusButton,
          minusButton,
          currentQuantity,
          availabilityStock
        );
        saveCartToLocalStorage(); // Ensure the cart is saved initially
      }
    }
  });
  loadCartFromLocalStorage();
}

// function update cart count based on the quantities across all inputs
