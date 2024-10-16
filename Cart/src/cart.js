"use strict";
/**
 * Retrieves cart data from localStorage.
 * @returns An array of CartItems or null if an error occurs.
 */
const getCartFromLocalStorage = () => {
    // Changed return type to CartItem[] | null
    const cartData = localStorage.getItem("cart");
    if (!cartData) {
        return []; // Return empty array instead of null when no data exists
    }
    try {
        const parsedData = JSON.parse(cartData);
        if (isValidCartData(parsedData)) {
            return parsedData;
        }
        else {
            console.error("Invalid cart data structure");
            return null;
        }
    }
    catch (error) {
        console.error("Error parsing cart data:", error);
        return null;
    }
};
/**
 * Type guard to validate the structure of cart data.
 * @param data - The data to validate
 * @returns A type predicate indicating if the data is a valid CartItem array
 */
function isValidCartData(data) {
    return (Array.isArray(data) &&
        data.every((item) => isValidCartItem(item)));
}
/**
 * Validates an individual cart item.
 * @param item - The item to validate
 * @returns True if the item is a valid CartItem, false otherwise
 */
function isValidCartItem(item) {
    return (typeof item === "object" &&
        item !== null &&
        "id" in item &&
        "quantity" in item &&
        typeof item.id === "number" && // Changed from string to number
        typeof item.quantity === "number" &&
        Number.isInteger(item.quantity) &&
        item.quantity >= 0);
}
/**
 * Updates the cart count in the UI based on localStorage data.
 */
const renderCartCountFromStorage = () => {
    const cartData = getCartFromLocalStorage();
    if (!cartData) {
        console.warn("No valid cart data found");
        return;
    }
    const totalItems = cartData.reduce((acc, item) => {
        return acc + item.quantity;
    }, 0);
    const cartCountElement = document.querySelector(".cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = totalItems.toString();
    }
    else {
        console.warn("Cart count element not found");
    }
};
// Update cart count when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", renderCartCountFromStorage);
