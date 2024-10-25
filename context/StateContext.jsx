import { useState, createContext, useContext, useEffect } from "react";
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query'; 
import { client } from '../lib/client';


const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const storedTotalPrice = JSON.parse(localStorage.getItem('totalPrice')) || 0;
    const storedTotalQuantities = JSON.parse(localStorage.getItem('totalQuantities')) || 0;

   if(storedCartItems) setCartItems(storedCartItems);
   if(storedTotalPrice) setTotalPrice(storedTotalPrice);
   if(storedTotalQuantities) setTotalQuantities(storedTotalQuantities);
  }, []);

    // Save cart items to localStorage whenever they change
    useEffect(() => {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
      localStorage.setItem('totalQuantities', JSON.stringify(totalQuantities));
    }, [cartItems, totalPrice, totalQuantities]);

  let foundProduct;
  let deletedProduct;
  let index;

  const onRemove = (product) => {
    // Finds the product in the cart, 
    deletedProduct = cartItems.find((item) => item._id === product._id);
    // Creates a new cart list without that product, 
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    // Updates the total price and quantity in the cart based on what’s removed
    setTotalPrice((initPrice) => initPrice - deletedProduct.price * deletedProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - deletedProduct.quantity);

    // Updates the cart state to reflect these changes. 
    setCartItems(newCartItems);
    toast.success(`${deletedProduct.name} removed from the cart.`);

  }

  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id)

    if(value === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      toast.success(`${foundProduct.name} increased in the cart.`);
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
        toast.success(`${foundProduct.name} decreased in the cart.`);
      }
    }
  }


  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1; 
      return prevQty - 1;
    });
  };



  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        incQty,
        decQty,
        onRemove, 
        toggleCartItemQuanitity
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
