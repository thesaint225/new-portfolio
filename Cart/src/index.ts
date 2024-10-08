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
    id: 1,
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
    id: 1,
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

const productGridElement: HTMLDivElement | null =
  document.querySelector("#productGrid");
console.log(productGridElement);

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
        <input type="number" class="quantity-input" value="0" min="1" max="${
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
      // Add  event listener for + button
      const plusButton: HTMLButtonElement | null =
        productCard.querySelector(".plus");
      const minusButton: HTMLButtonElement | null =
        productCard.querySelector(".minus");
      const quantityInput: HTMLInputElement | null =
        productCard.querySelector(".quantity-input");
      const availabilityElement: HTMLElement | null = productCard.querySelector(
        ".availability-value"
      );

      // Initialize default quantity
      let currentQuantity = 0;
      let availabilityStock = product.availability;

      function updateAvailability(newQuantity: number) {
        const remainingStock = availabilityStock - newQuantity;
        currentQuantity = newQuantity;

        if (availabilityElement) {
          availabilityElement.textContent = remainingStock.toString();
        }
        updateButtonsState(remainingStock);
      }

      function updateButtonsState(remainingStock: number) {
        if (plusButton && minusButton) {
          // if the remaining stock is 0 or less than  zero disable the button
          if (remainingStock <= 0) {
            plusButton.setAttribute("disabled", "true");
          } else {
            plusButton.removeAttribute("disabled");
          }

          //   if the current quantity is 1 or less,disable minus button
          if (currentQuantity <= 0) {
            minusButton.setAttribute("disabled", "true");
          } else {
            minusButton.removeAttribute("disabled");
          }
        }
      }

      if (plusButton && minusButton && quantityInput) {
        // Event listener for the plus button
        plusButton.addEventListener("click", function () {
          let currentQuantity = parseInt(quantityInput.value);

          if (currentQuantity < availabilityStock) {
            const newQuantity = currentQuantity + 1;
            quantityInput.value = newQuantity.toString();
            updateAvailability(newQuantity);
          }
        });

        // Event listener for the minus button
        minusButton.addEventListener("click", function () {
          const currentQuantity = parseInt(quantityInput.value);
          if (currentQuantity > 0) {
            const newQuantity = currentQuantity - 1;
            quantityInput.value = newQuantity.toString();
            updateAvailability(newQuantity);
          }
        });

        // Handle direct input changes
        quantityInput.addEventListener("input", function () {
          let inputValue = parseInt(quantityInput.value);

          if (isNaN(inputValue) || inputValue < 1) {
            quantityInput.value = "1";
            updateAvailability(1);
          } else if (inputValue > availabilityStock) {
            inputValue = availabilityStock;
            quantityInput.value = inputValue.toString();
          } else {
            updateAvailability(inputValue);
          }
        });

        // Prevent invalid characters
        quantityInput.addEventListener("keydown", function (e) {
          const invalidKeys = ["-", "e", "+", "."];
          if (
            invalidKeys.includes(e.key) ||
            (e.shiftKey && ["+", "-"].includes(e.key))
          ) {
            e.preventDefault();
          }
        });

        // Update the buttons' state based on the stock initially
        updateButtonsState(availabilityStock);
      }
    }
  });
}

// function update cart count based on the quantities across all inputs

function updateCartCount() {
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
}
