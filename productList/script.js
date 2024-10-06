// Define the Cedi symbol as a Unicode character
var cediSymbol = "₵"; // Unicode character for Ghanaian Cedi
// Get references to the form, table body, and total price element
var productForm = document.querySelector("#productForm");
var productTableBody = document.querySelector("#productTable tbody");
var totalPriceElement = document.querySelector("#totalPrice");
if (!productForm || !productTableBody || !totalPriceElement) {
    console.error("One or more elements are not found.");
}
else {
    var totalPrice_1 = 0;
    // Add an event listener to handle form submission
    productForm.addEventListener("submit", function (e) {
        e.preventDefault();
        // Get the product name and price from the input fields
        var productNameInput = document.querySelector("#productName");
        var productPriceInput = document.querySelector("#productPrice");
        if (productNameInput && productPriceInput) {
            var productName = productNameInput.value.trim(); // Remove extra spaces
            var productPrice = parseFloat(productPriceInput.value);
            if (!isNaN(productPrice) && productName !== "") {
                // Create a new table row
                var row = document.createElement("tr");
                var nameCell = document.createElement("td");
                var priceCell = document.createElement("td");
                nameCell.textContent = productName;
                priceCell.textContent = "".concat(cediSymbol).concat(productPrice.toFixed(2));
                row.appendChild(nameCell);
                row.appendChild(priceCell);
                // Append the row to the table body
                productTableBody.appendChild(row);
                // Update total price
                totalPrice_1 += productPrice;
                totalPriceElement.textContent = "Total Price: ".concat(cediSymbol).concat(totalPrice_1.toFixed(2));
                // Clear the input fields
                productNameInput.value = ""; // Set to empty string
                productPriceInput.value = "";
            }
            else {
                console.error("Invalid product price or name");
            }
        }
        else {
            console.error("Product name or price input fields are not found");
        }
    });
}
