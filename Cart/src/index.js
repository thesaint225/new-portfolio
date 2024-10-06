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
            var PlusButton = productCard === null || productCard === void 0 ? void 0 : productCard.querySelector(".plus");
            var minusButton = productCard === null || productCard === void 0 ? void 0 : productCard.querySelector(".minus");
            if (PlusButton) {
                PlusButton.addEventListener("click", function () {
                    var quantityInput = productCard.querySelector(".quantity-input");
                    // check if quantityInput exist
                    if (quantityInput) {
                        var currentQuantity = parseInt(quantityInput.value);
                        if (currentQuantity < product.availability) {
                            // increase Quantity  and ensure  it is converted to string
                            quantityInput.value = (currentQuantity + 1).toString();
                        }
                    }
                });
            }
            //   add event  listener for - button
            if (minusButton) {
                minusButton.addEventListener("click", function () {
                    var quantityInput = productCard.querySelector(".quantity-input");
                    if (quantityInput) {
                        var currentQuantity = parseInt(quantityInput.value);
                        //   ensure that quantity do not go bellow 1
                        if (currentQuantity > 1) {
                            quantityInput.value = (currentQuantity - 1).toString();
                        }
                    }
                });
            }
        }
    });
}
