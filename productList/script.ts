// Define the Cedi symbol as a Unicode character
const cediSymbol = "₵"; // Unicode character for Ghanaian Cedi

// Get references to the form, table body, and total price element
const productForm = document.querySelector("#productForm") as HTMLFormElement;
const productTableBody = document.querySelector(
  "#productTable tbody"
) as HTMLTableSectionElement;
const totalPriceElement = document.querySelector("#totalPrice") as HTMLElement;

if (!productForm || !productTableBody || !totalPriceElement) {
  console.error("One or more elements are not found.");
} else {
  let totalPrice = 0;

  // Add an event listener to handle form submission
  productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get the product name and price from the input fields
    const productNameInput = document.querySelector(
      "#productName"
    ) as HTMLInputElement;
    const productPriceInput = document.querySelector(
      "#productPrice"
    ) as HTMLInputElement;

    if (productNameInput && productPriceInput) {
      const productName = productNameInput.value.trim(); // Remove extra spaces
      const productPrice = parseFloat(productPriceInput.value);

      if (!isNaN(productPrice) && productName !== "") {
        // Create a new table row
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        const priceCell = document.createElement("td");

        nameCell.textContent = productName;
        priceCell.textContent = `${cediSymbol}${productPrice.toFixed(2)}`;
        row.appendChild(nameCell);
        row.appendChild(priceCell);

        // Append the row to the table body
        productTableBody.appendChild(row);

        // Update total price
        totalPrice += productPrice;
        totalPriceElement.textContent = `Total Price: ${cediSymbol}${totalPrice.toFixed(
          2
        )}`;

        // Clear the input fields
        productNameInput.value = ""; // Set to empty string
        productPriceInput.value = "";
      } else {
        console.error("Invalid product price or name");
      }
    } else {
      console.error("Product name or price input fields are not found");
    }
  });
}
