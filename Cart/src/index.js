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
    // Add more product objects here
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
    // Add more product objects here
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
var cartData = [];
// update the state button
var updateButtonsState = function (plusButton, minusButton, currentQuantity, remainingStock) {
    if (plusButton && minusButton) {
        if (remainingStock <= 0) {
            plusButton.setAttribute("disabled", "true");
        }
        else {
            plusButton.removeAttribute("disabled");
        }
        if (currentQuantity <= 0) {
            minusButton.setAttribute("disabled", "true");
        }
        else {
            minusButton.removeAttribute("disabled");
        }
    }
};
// define functions outside the loop to make  them accessible
// function update the updateAvailability
var updateAvailability = function (availabilityElement, newQuantity, availabilityStock) {
    var remainingStock = availabilityStock - newQuantity;
    if (availabilityElement) {
        availabilityElement.textContent = remainingStock.toString();
    }
    return remainingStock;
};
// function update cart count based on the quantities across all inputs
var updateCartCount = function () {
    var quantityInputs = document.querySelectorAll(".quantity-input");
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
};
// load cart data from localStorage
function loadCartFromLocalStorage() {
    var storedCart = localStorage.getItem("cart");
    if (storedCart) {
        cartData = JSON.parse(storedCart);
        updateUIFromCartData(); // Update UI based on loaded cart data
        updateCartCount(); // Update cart count based on loaded cart data
    }
}
// Function to update the UI based on cart data
function updateUIFromCartData() {
    cartData.forEach(function (item) {
        var productCard = document.querySelector(".product-card[data-id=\"".concat(item.id, "\"]"));
        if (productCard) {
            var quantityInput = productCard.querySelector(".quantity-input");
            if (quantityInput) {
                quantityInput.value = item.quantity.toString(); // Update input with stored quantity
            }
        }
    });
}
//  Function to add/update items in the cart
function addToCart(productId, quantity) {
    var existingProductIndex = cartData.findIndex(function (item) { return item.id === productId; });
    if (existingProductIndex !== -1) {
        // Update the quantity if the product already exists in the cart
        if (quantity > 0) {
            cartData[existingProductIndex].quantity = quantity;
        }
        else {
            // Remove the product from the cart if quantity is 0
            cartData.splice(existingProductIndex, 1);
        }
    }
    else if (quantity > 0) {
        // Add the product if it doesn't exist in the cart and quantity is greater than 0
        cartData.push({ id: productId, quantity: quantity });
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
var productGridElement = document.querySelector("#productGrid");
var cartCountElement = document.querySelector(".cart-count");
if (productGridElement) {
    // Loop through products and create product cards dynamically
    products.forEach(function (product) {
        var productHTML = "\n    <div class=\"product-card\" data-id=\"".concat(product.id, "\">\n      <img src=\"").concat(product.image, "\" alt=\"").concat(product.name, "\">\n      <div class=\"product-info\">\n        <h3>").concat(product.name, "</h3>\n        <p class=\"product-sku\">SKU: ").concat(product.sku, "</p>\n        <p class=\"product-price\">$").concat(product.price, " <span>$").concat(product.originalPrice, "</span></p>\n<p class=\"product-availability\">In Stock: <span class=\"availability-value\">").concat(product.availability, "</span></p></p>\n        <p class=\"product-description\">").concat(product.description, "</p>\n        <div class=\"product-tags\">\n          ").concat(product.tags
            .map(function (tag) { return "<span class=\"tag\">".concat(tag, "</span>"); })
            .join(""), "\n        </div>\n      </div>\n      <div class=\"related-products\">\n        <h4>You May Also Like</h4>\n        <ul>\n          ").concat(product.relatedProducts.map(function (item) { return "<li>".concat(item, "</li>"); }).join(""), "\n        </ul>\n      </div>\n      <div class=\"quantity-selector\">\n        <button class=\"quantity-btn minus\" data-id=\"").concat(product.id, "\">-</button>\n        <input type=\"number\" class=\"quantity-input\" value=\"1\" min=\"1\" max=\"").concat(product.availability, "\" data-id=\"").concat(product.id, "\">\n        <button class=\"quantity-btn plus\" data-id=\"").concat(product.id, "\">+</button>\n      </div>\n     \n    </div>\n  ");
        // append  generated HTML to product grid  container
        productGridElement.insertAdjacentHTML("beforeend", productHTML);
        // Get last added product card to attach event listener
        var productCard = productGridElement.lastElementChild;
        // check if productCard exists before proceeding
        if (productCard) {
            // Add event listener for + button
            var plusButton_1 = productCard.querySelector(".plus");
            var minusButton_1 = productCard.querySelector(".minus");
            var quantityInput_1 = productCard.querySelector(".quantity-input");
            var availabilityElement_1 = productCard.querySelector(".availability-value");
            // Initialize stock
            var availabilityStock_1 = product.availability;
            if (plusButton_1 && minusButton_1 && quantityInput_1) {
                // Event listener for the plus button
                plusButton_1.addEventListener("click", function () {
                    var currentQuantity = parseInt(quantityInput_1.value);
                    if (currentQuantity < availabilityStock_1) {
                        var newQuantity = currentQuantity + 1;
                        quantityInput_1.value = newQuantity.toString();
                        // Update cart and UI
                        var remainingStock = updateAvailability(availabilityElement_1, newQuantity, availabilityStock_1);
                        updateButtonsState(plusButton_1, minusButton_1, newQuantity, remainingStock);
                        addToCart(product.id, newQuantity);
                        saveCartToLocalStorage();
                        updateCartCount();
                    }
                });
                // Event listener for the minus button
                minusButton_1.addEventListener("click", function () {
                    var currentQuantity = parseInt(quantityInput_1.value);
                    if (currentQuantity > 0) {
                        var newQuantity = currentQuantity - 1;
                        quantityInput_1.value = newQuantity.toString();
                        // Update cart and UI
                        var remainingStock = updateAvailability(availabilityElement_1, newQuantity, availabilityStock_1);
                        updateButtonsState(plusButton_1, minusButton_1, newQuantity, remainingStock);
                        addToCart(product.id, newQuantity);
                        saveCartToLocalStorage();
                        updateCartCount();
                    }
                });
                // Handle direct input changes
                quantityInput_1.addEventListener("input", function () {
                    var inputValue = parseInt(quantityInput_1.value);
                    if (isNaN(inputValue) || inputValue < 1) {
                        quantityInput_1.value = "0";
                        addToCart(product.id, 0); // Ensure cart is updated with 0 or removed
                    }
                    else if (inputValue > availabilityStock_1) {
                        inputValue = availabilityStock_1;
                        quantityInput_1.value = inputValue.toString();
                    }
                    updateAvailability(availabilityElement_1, inputValue, availabilityStock_1);
                    addToCart(product.id, inputValue);
                    saveCartToLocalStorage();
                    updateCartCount();
                });
                // Prevent invalid characters in input field
                quantityInput_1.addEventListener("keydown", function (e) {
                    var invalidKeys = ["-", "e", "+", "."];
                    if (invalidKeys.includes(e.key) ||
                        (e.shiftKey && ["+", "-"].includes(e.key))) {
                        e.preventDefault();
                    }
                });
                // Initialize button states
                var currentQuantity = parseInt(quantityInput_1.value) || 0;
                updateButtonsState(plusButton_1, minusButton_1, currentQuantity, availabilityStock_1);
                saveCartToLocalStorage(); // Ensure the cart is saved initially
            }
        }
    });
    loadCartFromLocalStorage();
}
// function update cart count based on the quantities across all inputs
