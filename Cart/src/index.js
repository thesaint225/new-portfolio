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
if (productGridElement) {
    // Loop through products and create product cards dynamically
    products.forEach(function (product) {
        var productHTML = "\n    <div class=\"product-card\" data-id=\"".concat(product.id, "\">\n      <img src=\"").concat(product.image, "\" alt=\"").concat(product.name, "\">\n      <div class=\"product-info\">\n        <h3>").concat(product.name, "</h3>\n        <p class=\"product-sku\">SKU: ").concat(product.sku, "</p>\n        <p class=\"product-price\">$").concat(product.price, " <span>$").concat(product.originalPrice, "</span></p>\n        <p class=\"product-availability\">In Stock: ").concat(product.availability, "</p>\n        <p class=\"product-description\">").concat(product.description, "</p>\n        <div class=\"product-tags\">\n          ").concat(product.tags
            .map(function (tag) { return "<span class=\"tag\">".concat(tag, "</span>"); })
            .join(""), "\n        </div>\n      </div>\n      <div class=\"related-products\">\n        <h4>You May Also Like</h4>\n        <ul>\n          ").concat(product.relatedProducts.map(function (item) { return "<li>".concat(item, "</li>"); }).join(""), "\n        </ul>\n      </div>\n      <div class=\"quantity-selector\">\n        <button class=\"quantity-btn minus\" data-id=\"").concat(product.id, "\">-</button>\n        <input type=\"number\" class=\"quantity-input\" value=\"1\" min=\"1\" max=\"").concat(product.availability, "\" data-id=\"").concat(product.id, "\">\n        <button class=\"quantity-btn plus\" data-id=\"").concat(product.id, "\">+</button>\n      </div>\n      <button class=\"add-to-cart\" data-id=\"").concat(product.id, "\">Add to Cart</button>\n    </div>\n  ");
        // append  generated HTML to product grid  container
        productGridElement.insertAdjacentHTML("beforeend", productHTML);
        // Get last added product card to attach event listener
        var productCard = productGridElement.lastElementChild;
        // check if productCard exists before proceeding
        if (productCard) {
            // Add  event listener for + button
            var plusButton = productCard.querySelector(".plus");
            var minusButton_1 = productCard.querySelector(".minus");
            var quantityInput_1 = productCard.querySelector(".quantity-input");
            if (plusButton && minusButton_1 && quantityInput_1) {
                plusButton.addEventListener("click", function () {
                    var currentQuantity = parseInt(quantityInput_1.value);
                    if (currentQuantity < product.availability) {
                        quantityInput_1.value = (currentQuantity + 1).toString();
                    }
                    minusButton_1.addEventListener("click", function () {
                        var currentQuantity = parseInt(quantityInput_1.value);
                        if (currentQuantity > 1) {
                            quantityInput_1.value = (currentQuantity - 1).toString();
                        }
                    });
                    //  Add event listener  for direct input
                    quantityInput_1.addEventListener("input", function () {
                        var value = parseInt(this.value);
                        if (isNaN(value) || value < 1) {
                            this.value = "1";
                        }
                        else if (value > product.availability) {
                            this.value = product.availability.toString();
                        }
                    });
                    // Prevent invalid characters like '-' or 'e' and combinations with Shift key
                    quantityInput_1.addEventListener("keydown", function (e) {
                        var invalidKeys = ["-", "e", "+", "."];
                        if (invalidKeys.includes(e.key) ||
                            (e.shiftKey && ["+", "-"].includes(e.key))) {
                            e.preventDefault();
                        }
                    });
                });
            }
        }
    });
}
