"use strict";
/**
 * Represents an item in the shopping cart.
 */
/**
 * Retrieves cart data from localStorage.
 * @returns An array of CartItems or null if an error occurs.
 */
const getCartFromLocalStorage = () => {
    // Attempt to retrieve cart data from localStorage
    const cartData = localStorage.getItem("cart");
    if (!cartData) {
        return [];
    }
    try {
        const parsedData = JSON.parse(cartData);
        if (Array.isArray(parsedData) &&
            parsedData.every((item) => typeof item.id === "number" && typeof item.quantity === "number")) {
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
// try {
//   // check if there is data in the local storage  before parsing
//   if (cartData) {
//     // parse data only if it exists
//     return JSON.parse(cartData);
//   } else {
//     // if no data exists,return an empty array or null
//     return [];
//   }
// } catch (error) {
//   console.error("Error parsing cart data", error);
//   return null;
// }
// };
// function update  cart count base on localStorage
const renderCartCountFromStorage = () => {
    const cartData = getCartFromLocalStorage();
    // ensure that cartData  exist
    if (!cartData)
        return;
    const totalItems = cartData.reduce((acc, item) => {
        return acc + item.quantity;
    }, 0);
    // select .cart-count  and update it text-content
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
