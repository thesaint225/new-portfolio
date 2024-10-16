"use strict";
// Product interface for type safety
// define  Product Data as array of objects
const products = [
    {
        id: 1,
        name: "Trendy Graphic Tee",
        sku: "TEE123",
        price: 24.99,
        originalPrice: 34.99,
        availability: 15,
        description: "Express your style with our comfortable and eye-catching graphic tee.",
        image: "images/Female bags/img1.jpeg",
        tags: ["Fashion", "Casual"],
        relatedProducts: ["Classic Denim Jacket", "Slim Fit Chinos"],
    },
    {
        id: 2,
        name: "Trendy Graphic Tee",
        sku: "TEE123",
        price: 24.99,
        originalPrice: 34.99,
        availability: 15,
        description: "Express your style with our comfortable and eye-catching graphic tee.",
        image: "images/Female bags/img1.jpeg",
        tags: ["Fashion", "Casual"],
        relatedProducts: ["Classic Denim Jacket", "Slim Fit Chinos"],
    },
    {
        id: 3,
        name: "Trendy Graphic Tee",
        sku: "TEE123",
        price: 24.99,
        originalPrice: 34.99,
        availability: 15,
        description: "Express your style with our comfortable and eye-catching graphic tee.",
        image: "images/Female bags/img2.jpg",
        tags: ["Fashion", "Casual"],
        relatedProducts: ["Classic Denim Jacket", "Slim Fit Chinos"],
    },
    {
        id: 4,
        name: "Trendy Graphic Tee",
        sku: "TEE123",
        price: 24.99,
        originalPrice: 34.99,
        availability: 15,
        description: "Express your style with our comfortable and eye-catching graphic tee.",
        image: "images/Female bags/img3.jpg",
        tags: ["Fashion", "Casual"],
        relatedProducts: ["Classic Denim Jacket", "Slim Fit Chinos"],
    },
];
// Use a more efficient data structure for products
const productMap = new Map(products.map((product) => [product.id, product]));
let cartData = [];
/**
 * Updates the state of quantity adjustment buttons based on current quantity and stock.
 * @param plusButton - The button to increase quantity
 * @param minusButton - The button to decrease quantity
 * @param currentQuantity - The current quantity in the cart
 * @param remainingStock - The remaining stock of the product
 */
const updateButtonsState = (plusButton, minusButton, currentQuantity, remainingStock) => {
    if (plusButton && minusButton) {
        plusButton.disabled = remainingStock <= 0;
        minusButton.disabled = currentQuantity <= 0;
    }
};
/**
 * Updates the displayed availability of a product.
 * @param availabilityElement - The element displaying availability
 * @param newQuantity - The new quantity in the cart
 * @param availabilityStock - The initial stock of the product
 * @returns The remaining stock
 */
const updateAvailability = (availabilityElement, newQuantity, availabilityStock) => {
    const remainingStock = Math.max(0, availabilityStock - newQuantity);
    if (availabilityElement) {
        availabilityElement.textContent = remainingStock.toString();
    }
    return remainingStock;
};
/**
 * Updates the total cart count displayed in the UI.
 */
const updateCartCount = () => {
    const quantityInputs = document.querySelectorAll(".quantity-input");
    const totalQuantity = Array.from(quantityInputs).reduce((total, input) => {
        return total + (parseInt(input.value) || 0);
    }, 0);
    const cartCountElement = document.querySelector(".cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = totalQuantity.toString();
    }
};
/**
 * Loads cart data from localStorage and updates the UI.
 */
const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
        try {
            cartData = JSON.parse(storedCart);
            updateUIFromCartData();
            updateCartCount();
        }
        catch (error) {
            console.error("Error parsing cart data:", error);
            cartData = [];
        }
    }
};
// Function to update the UI based on cart data
function updateUIFromCartData() {
    cartData.forEach((item) => {
        const productCard = document.querySelector(`.product-card[data-id="${item.id}"]`);
        if (productCard) {
            const quantityInput = productCard.querySelector(".quantity-input");
            if (quantityInput) {
                quantityInput.value = item.quantity.toString(); // Update input with stored quantity
            }
        }
    });
}
/**
 * Adds or updates items in the cart.
 * @param productId - The ID of the product
 * @param quantity - The quantity to add or update
 */
const addToCart = (productId, quantity) => {
    const index = cartData.findIndex((item) => item.id === productId);
    if (index !== -1) {
        if (quantity > 0) {
            cartData[index].quantity = quantity;
        }
        else {
            cartData.splice(index, 1);
        }
    }
    else if (quantity > 0) {
        cartData.push({ id: productId, quantity });
    }
    saveCartToLocalStorage();
    updateCartCount();
};
/* *
 * Saves the current cart data to localStorage.
 */
const saveCartToLocalStorage = () => {
    try {
        localStorage.setItem("cart", JSON.stringify(cartData));
    }
    catch (error) {
        console.error("Error saving cart data:", error);
    }
};
/**

/**
 * Creates HTML for a single product card.
 * @param product - The product data
 * @returns HTML string for the product card
 */
const createProductCardHTML = (product) => {
    return `
    <div class="product-card" data-id="${product.id}">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="product-sku">SKU: ${product.sku}</p>
        <p class="product-price">$${product.price} <span>$${product.originalPrice}</span></p>
        <p class="product-availability">In Stock: <span class="availability-value">${product.availability}</span></p>
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
        <input type="number" class="quantity-input" value="1" min="1" max="${product.availability}" data-id="${product.id}">
        <button class="quantity-btn plus" data-id="${product.id}">+</button>
      </div>
    </div>
  `;
};
/**
 * Sets up event listeners for a product card.
 * @param productCard - The product card element
 * @param product - The product data
 */
const setupProductCardListeners = (productCard, product) => {
    const plusButton = productCard.querySelector(".plus");
    const minusButton = productCard.querySelector(".minus");
    const quantityInput = productCard.querySelector(".quantity-input");
    const availabilityElement = productCard.querySelector(".availability-value");
    let availabilityStock = product.availability;
    if (plusButton && minusButton && quantityInput) {
        plusButton.addEventListener("click", () => handleQuantityChange(1));
        minusButton.addEventListener("click", () => handleQuantityChange(-1));
        quantityInput.addEventListener("input", handleDirectInput);
        quantityInput.addEventListener("keydown", preventInvalidInput);
        // Initialize button states
        const currentQuantity = parseInt(quantityInput.value) || 0;
        updateButtonsState(plusButton, minusButton, currentQuantity, availabilityStock);
    }
    function handleQuantityChange(change) {
        if (quantityInput) {
            let currentQuantity = parseInt(quantityInput.value);
            const newQuantity = Math.max(0, Math.min(currentQuantity + change, availabilityStock));
            quantityInput.value = newQuantity.toString();
            const remainingStock = updateAvailability(availabilityElement, newQuantity, availabilityStock);
            updateButtonsState(plusButton, minusButton, newQuantity, remainingStock);
            addToCart(product.id, newQuantity);
        }
    }
    function handleDirectInput() {
        if (quantityInput) {
            let inputValue = parseInt(quantityInput.value);
            if (isNaN(inputValue) || inputValue < 0) {
                inputValue = 0;
            }
            else if (inputValue > availabilityStock) {
                inputValue = availabilityStock;
            }
            quantityInput.value = inputValue.toString();
            updateAvailability(availabilityElement, inputValue, availabilityStock);
            addToCart(product.id, inputValue);
        }
    }
    function preventInvalidInput(e) {
        if (!/^[0-9]$/.test(e.key) &&
            !["Backspace", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)) {
            e.preventDefault();
        }
    }
};
/**
 * Initializes the product grid with all products.
 */
/**
 * Initializes the product grid with all products.
 */
const initializeProductGrid = () => {
    const productGridElement = document.querySelector("#productGrid");
    if (productGridElement) {
        const fragment = document.createDocumentFragment();
        products.forEach((product) => {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = createProductCardHTML(product);
            const productCard = tempDiv.firstElementChild;
            if (productCard) {
                setupProductCardListeners(productCard, product);
                fragment.appendChild(productCard);
            }
        });
        productGridElement.appendChild(fragment);
    }
};
// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
    initializeProductGrid();
    loadCartFromLocalStorage();
});
//   document.querySelector("#productGrid");
// const cartCountElement: HTMLElement | null =
//   document.querySelector(".cart-count");
// if (productGridElement) {
//   // Loop through products and create product cards dynamically
//   products.forEach((product) => {
//     const productHTML = `
//     <div class="product-card" data-id="${product.id}">
//       <img src="${product.image}" alt="${product.name}">
//       <div class="product-info">
//         <h3>${product.name}</h3>
//         <p class="product-sku">SKU: ${product.sku}</p>
//         <p class="product-price">$${product.price} <span>$${
//       product.originalPrice
//     }</span></p>
// <p class="product-availability">In Stock: <span class="availability-value">${
//       product.availability
//     }</span></p></p>
//         <p class="product-description">${product.description}</p>
//         <div class="product-tags">
//           ${product.tags
//             .map((tag) => `<span class="tag">${tag}</span>`)
//             .join("")}
//         </div>
//       </div>
//       <div class="related-products">
//         <h4>You May Also Like</h4>
//         <ul>
//           ${product.relatedProducts.map((item) => `<li>${item}</li>`).join("")}
//         </ul>
//       </div>
//       <div class="quantity-selector">
//         <button class="quantity-btn minus" data-id="${product.id}">-</button>
//         <input type="number" class="quantity-input" value="1" min="1" max="${
//           product.availability
//         }" data-id="${product.id}">
//         <button class="quantity-btn plus" data-id="${product.id}">+</button>
//       </div>
//     </div>
//   `;
//     // append  generated HTML to product grid  container
//     productGridElement.insertAdjacentHTML("beforeend", productHTML);
//     // Get last added product card to attach event listener
//     const productCard = productGridElement.lastElementChild;
//     // check if productCard exists before proceeding
//     if (productCard) {
//       // Add event listener for + button
//       const plusButton: HTMLButtonElement | null =
//         productCard.querySelector(".plus");
//       const minusButton: HTMLButtonElement | null =
//         productCard.querySelector(".minus");
//       const quantityInput: HTMLInputElement | null =
//         productCard.querySelector(".quantity-input");
//       const availabilityElement: HTMLElement | null = productCard.querySelector(
//         ".availability-value"
//       );
//       // Initialize stock
//       let availabilityStock = product.availability;
//       if (plusButton && minusButton && quantityInput) {
//         // Event listener for the plus button
//         plusButton.addEventListener("click", function () {
//           let currentQuantity = parseInt(quantityInput.value);
//           if (currentQuantity < availabilityStock) {
//             const newQuantity = currentQuantity + 1;
//             quantityInput.value = newQuantity.toString();
//             // Update cart and UI
//             const remainingStock = updateAvailability(
//               availabilityElement,
//               newQuantity,
//               availabilityStock
//             );
//             updateButtonsState(
//               plusButton,
//               minusButton,
//               newQuantity,
//               remainingStock
//             );
//             addToCart(product.id, newQuantity);
//             saveCartToLocalStorage();
//             updateCartCount();
//           }
//         });
//         // Event listener for the minus button
//         minusButton.addEventListener("click", function () {
//           const currentQuantity = parseInt(quantityInput.value);
//           if (currentQuantity > 0) {
//             const newQuantity = currentQuantity - 1;
//             quantityInput.value = newQuantity.toString();
//             // Update cart and UI
//             const remainingStock = updateAvailability(
//               availabilityElement,
//               newQuantity,
//               availabilityStock
//             );
//             updateButtonsState(
//               plusButton,
//               minusButton,
//               newQuantity,
//               remainingStock
//             );
//             addToCart(product.id, newQuantity);
//             saveCartToLocalStorage();
//             updateCartCount();
//           }
//         });
//         // Handle direct input changes
//         quantityInput.addEventListener("input", function () {
//           let inputValue = parseInt(quantityInput.value);
//           if (isNaN(inputValue) || inputValue < 1) {
//             quantityInput.value = "0";
//             addToCart(product.id, 0); // Ensure cart is updated with 0 or removed
//           } else if (inputValue > availabilityStock) {
//             inputValue = availabilityStock;
//             quantityInput.value = inputValue.toString();
//           }
//           updateAvailability(
//             availabilityElement,
//             inputValue,
//             availabilityStock
//           );
//           addToCart(product.id, inputValue);
//           saveCartToLocalStorage();
//           updateCartCount();
//         });
//         // Prevent invalid characters in input field
//         quantityInput.addEventListener("keydown", function (e) {
//           const invalidKeys = ["-", "e", "+", "."];
//           if (
//             invalidKeys.includes(e.key) ||
//             (e.shiftKey && ["+", "-"].includes(e.key))
//           ) {
//             e.preventDefault();
//           }
//         });
//         // Initialize button states
//         const currentQuantity = parseInt(quantityInput.value) || 0;
//         updateButtonsState(
//           plusButton,
//           minusButton,
//           currentQuantity,
//           availabilityStock
//         );
//         saveCartToLocalStorage(); // Ensure the cart is saved initially
//       }
//     }
//   });
//   loadCartFromLocalStorage();
// }
// function update cart count based on the quantities across all inputs
