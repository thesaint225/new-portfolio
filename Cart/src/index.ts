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
        <p class="product-availability">In Stock: ${product.availability}</p>
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
      <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
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

      if (plusButton && minusButton && quantityInput) {
        plusButton.addEventListener("click", function () {
          let currentQuantity = parseInt(quantityInput.value);
          if (currentQuantity < product.availability) {
            quantityInput.value = (currentQuantity + 1).toString();
          }

          minusButton.addEventListener("click", function () {
            const currentQuantity = parseInt(quantityInput.value);
            if (currentQuantity > 1) {
              quantityInput.value = (currentQuantity - 1).toString();
            }
          });

          //  Add event listener  for direct input
          quantityInput.addEventListener("input", function () {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) {
              this.value = "1";
            } else if (value > product.availability) {
              this.value = product.availability.toString();
            }
          });

          // Prevent invalid characters like '-' or 'e' and combinations with Shift key
          quantityInput.addEventListener("keydown", function (e) {
            const invalidKeys = ["-", "e", "+", "."];
            if (
              invalidKeys.includes(e.key) ||
              (e.shiftKey && ["+", "-"].includes(e.key))
            ) {
              e.preventDefault();
            }
          });
        });
      }
    }
  });
}
