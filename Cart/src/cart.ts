// Define the type for cart items
interface CartItem {
  quantity: number;
}

const getCartFromLocalStorage = (): any[] | null => {
  // Attempt to retrieve cart data from localStorage
  let cartData = localStorage.getItem("cart");

  try {
    // check if there is data in the local storage  before parsing
    if (cartData) {
      // parse data only if it exists
      return JSON.parse(cartData);
    } else {
      // if no data exists,return an empty array or null
      return [];
    }
  } catch (error) {
    console.error("Error parsing cart data", error);
    return null;
  }
};

// function update  cart count base on localStorage

const renderCartCountFromStorage = () => {
  const cartData = getCartFromLocalStorage();
  // ensure that cartData  exist
  if (!cartData) return;
  const totalItems = cartData.reduce((acc: number, item: CartItem) => {
    return acc + item.quantity;
  }, 0);

  // select .cart-count  and update it text-content
  const cartCountElement: HTMLSpanElement | null =
    document.querySelector(".cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = totalItems.toString();
  }
};
renderCartCountFromStorage();
