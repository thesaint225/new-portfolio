// define  Product Data as array of objects
var products = [
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
    // Add more product objects here
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
    // Add more product objects here
    {
        id: 1,
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
    // Add more product objects here
    {
        id: 1,
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
var productGridElement = document.querySelector("#productGrid");
console.log(productGridElement);
var cartCountElement = document.querySelector(".cart-count");
if (productGridElement) {
    // Loop through products and create product cards dynamically
    products.forEach(function (product) {
        var productHTML = "\n    <div class=\"product-card\" data-id=\"".concat(product.id, "\">\n      <img src=\"").concat(product.image, "\" alt=\"").concat(product.name, "\">\n      <div class=\"product-info\">\n        <h3>").concat(product.name, "</h3>\n        <p class=\"product-sku\">SKU: ").concat(product.sku, "</p>\n        <p class=\"product-price\">$").concat(product.price, " <span>$").concat(product.originalPrice, "</span></p>\n<p class=\"product-availability\">In Stock: <span class=\"availability-value\">").concat(product.availability, "</span></p></p>\n        <p class=\"product-description\">").concat(product.description, "</p>\n        <div class=\"product-tags\">\n          ").concat(product.tags
            .map(function (tag) { return "<span class=\"tag\">".concat(tag, "</span>"); })
            .join(""), "\n        </div>\n      </div>\n      <div class=\"related-products\">\n        <h4>You May Also Like</h4>\n        <ul>\n          ").concat(product.relatedProducts.map(function (item) { return "<li>".concat(item, "</li>"); }).join(""), "\n        </ul>\n      </div>\n      <div class=\"quantity-selector\">\n        <button class=\"quantity-btn minus\" data-id=\"").concat(product.id, "\">-</button>\n        <input type=\"number\" class=\"quantity-input\" value=\"0\" min=\"1\" max=\"").concat(product.availability, "\" data-id=\"").concat(product.id, "\">\n        <button class=\"quantity-btn plus\" data-id=\"").concat(product.id, "\">+</button>\n      </div>\n     \n    </div>\n  ");
        // append  generated HTML to product grid  container
        productGridElement.insertAdjacentHTML("beforeend", productHTML);
        // Get last added product card to attach event listener
        var productCard = productGridElement.lastElementChild;
        // check if productCard exists before proceeding
        if (productCard) {
            // Add  event listener for + button
            var plusButton_1 = productCard.querySelector(".plus");
            var minusButton_1 = productCard.querySelector(".minus");
            var quantityInput_1 = productCard.querySelector(".quantity-input");
            var availabilityElement_1 = productCard.querySelector(".availability-value");
            // Initialize default quantity
            var currentQuantity_1 = 0;
            var availabilityStock_1 = product.availability;
            function updateAvailability(newQuantity) {
                var remainingStock = availabilityStock_1 - newQuantity;
                currentQuantity_1 = newQuantity;
                if (availabilityElement_1) {
                    availabilityElement_1.textContent = remainingStock.toString();
                }
                updateButtonsState(remainingStock);
            }
            function updateButtonsState(remainingStock) {
                if (plusButton_1 && minusButton_1) {
                    // if the remaining stock is 0 or less than  zero disable the button
                    if (remainingStock <= 0) {
                        plusButton_1.setAttribute("disabled", "true");
                    }
                    else {
                        plusButton_1.removeAttribute("disabled");
                    }
                    //   if the current quantity is 1 or less,disable minus button
                    if (currentQuantity_1 <= 0) {
                        minusButton_1.setAttribute("disabled", "true");
                    }
                    else {
                        minusButton_1.removeAttribute("disabled");
                    }
                }
            }
            if (plusButton_1 && minusButton_1 && quantityInput_1) {
                // Event listener for the plus button
                plusButton_1.addEventListener("click", function () {
                    var currentQuantity = parseInt(quantityInput_1.value);
                    if (currentQuantity < availabilityStock_1) {
                        var newQuantity = currentQuantity + 1;
                        quantityInput_1.value = newQuantity.toString();
                        updateAvailability(newQuantity);
                        updateCartCount();
                    }
                });
                // Event listener for the minus button
                minusButton_1.addEventListener("click", function () {
                    var currentQuantity = parseInt(quantityInput_1.value);
                    if (currentQuantity > 0) {
                        var newQuantity = currentQuantity - 1;
                        quantityInput_1.value = newQuantity.toString();
                        updateAvailability(newQuantity);
                        updateCartCount();
                    }
                });
                // Handle direct input changes
                quantityInput_1.addEventListener("input", function () {
                    var inputValue = parseInt(quantityInput_1.value);
                    if (isNaN(inputValue) || inputValue < 1) {
                        quantityInput_1.value = "1";
                        updateAvailability(1);
                    }
                    else if (inputValue > availabilityStock_1) {
                        inputValue = availabilityStock_1;
                        quantityInput_1.value = inputValue.toString();
                    }
                    else {
                        updateAvailability(inputValue);
                    }
                    updateCartCount();
                });
                // Prevent invalid characters
                quantityInput_1.addEventListener("keydown", function (e) {
                    var invalidKeys = ["-", "e", "+", "."];
                    if (invalidKeys.includes(e.key) ||
                        (e.shiftKey && ["+", "-"].includes(e.key))) {
                        e.preventDefault();
                    }
                });
                // Update the buttons' state based on the stock initially
                updateButtonsState(availabilityStock_1);
            }
        }
    });
}
// function update cart count based on the quantities across all inputs
function updateCartCount() {
    var quantityInputs = document.querySelectorAll(".quantity-input");
    console.log(quantityInputs);
    var totalQuantity = 0;
    quantityInputs.forEach(function (input) {
        var inputValue = parseInt(input.value);
        if (!isNaN(inputValue)) {
            totalQuantity += inputValue;
        }
    });
    // Update the cart count element with the total quantity
    if (cartCountElement) {
        cartCountElement.textContent = totalQuantity.toString();
    }
}
