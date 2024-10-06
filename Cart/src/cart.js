// Array of cart items stored
var cartItems = [
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
    var cartItemsContainer = document.querySelector("#cart-items");
    if (!cartItemsContainer)
        return;
    //   clear  existing items
    cartItemsContainer.innerHTML = "";
    // Initialize  subtotal  value
    var subtotalValue = 0;
    //   Loop through cart items and generate HTML
    cartItems.forEach(function (item) {
        var image = item.image, title = item.title, description = item.description, price = item.price, quantity = item.quantity, id = item.id;
        // const itemTotal = item.price * item.quantity;
        var itemTotal = price * quantity;
        subtotalValue += itemTotal;
        var cartItemsHTML = "\n                <div class=\"cart-item\">\n                <img src=\"".concat(image, "\" alt=\"").concat(title, "\" class=\"item-image\">\n                <div class=\"item-details\">\n                    <h2 class=\"item-title\">").concat(title, "</h2>\n                    <p class=\"item-description\">").concat(description, "</p>\n                    <p class=\"item-price\">$").concat(price.toFixed(2), "</p>\n                    <div class=\"item-quantity\">\n                        Quantity: <input type=\"number\" value=\"").concat(quantity, "\" min=\"1\" onchange=\"updateQuantity(").concat(id, ", this.value)\">\n                        <button class=\"remove-item\" onclick=\"removeItem(").concat(id, ")\">Remove</button>\n                    </div>\n                </div>\n            </div>\n\n    ");
        // Append generated item to cart container
        cartItemsContainer.insertAdjacentHTML("beforeend", cartItemsHTML);
    });
    // update subtotal and total(subtotal+ shipping )
    var subtotalElement = document.querySelector("#subtotal");
    if (subtotalElement) {
        subtotalElement.textContent = "$".concat(subtotalValue.toFixed(2));
    }
    var totalElement = document.querySelector("#total");
    if (totalElement) {
        totalElement.textContent = "$".concat((subtotalValue + 10).toFixed(2));
    }
    // function update item quantity
    function updateQuantity(id, newQuantity) {
        var item = cartItems.find(function (item) { return item.id === id; });
        if (item) {
            item.quantity = newQuantity;
            renderCartItems();
        }
    }
    function removeItem(id) {
        var index = cartItems.findIndex(function (item) { return item.id === id; });
        if (index !== -1) {
            cartItems.splice(index, 1); // Remove the item from the array
            renderCartItems(); // Re-render the cart items
        }
    }
}
// Initial render  of cart items
renderCartItems();
