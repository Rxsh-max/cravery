import { useEffect, useState } from "react";
import { StoreContext } from "./StoreContext";
import axios from "axios";
export const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [food_list, setFoodList] = useState([]);

  const fetchFoodList = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/food/list`,
    );
    setFoodList(response.data.data);
  };
  const loadCartData = async(token) => {
    const response =  await axios.post(
    `${import.meta.env.VITE_API_URL}/api/cart/remove`,
    {},
    { headers: { token } }
);
  setCartItems(response.data.cartData ?? {})
  }

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      await loadCartData(token)
    }
    loadData();
  }, [token]);

  const addToCart = async(itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1,
      }));
    }
    if(token){
     await axios.post(
    `${import.meta.env.VITE_API_URL}/api/cart/add`,
    { itemId },
    { headers: { token } }
);
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const removeFromCart = async(itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
     if(token){
     await axios.post(
    `${import.meta.env.VITE_API_URL}/api/cart/remove`,
    { itemId },
    { headers: { token } }
);
    }
  };

  

  const contextValue = {
    getTotalCartAmount,
    food_list,
    setFoodList,
    addToCart,
    cartItems,
    setCartItems,
    removeFromCart,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
