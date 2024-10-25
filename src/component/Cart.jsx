import React, { useRef } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from '../../context/StateContext';
import { useQuery } from '@tanstack/react-query'; 
import { client } from '../../lib/client';
import Product from '../component/Product'

const Cart = () => {
  const fetchProducts = async () => {
    const query = `*[_type == "product"] | order(_createdAt desc) {
      _id,
      name,
      price,
      "slug": slug.current,
      "details": details,
      "imageUrl": image[0].asset->url
    }`;
    const data = await client.fetch(query);
    return data;
  };

  // Fetching the data from Sanity using react-query
  const { data: Cartproducts, isLoading, error, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message.trim()}</div>;
  }

  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {/* Display cart items */}
        {cartItems.length >= 1 ? (
          <div>
            <div className="product-container">
              {cartItems.map((item) => (
                <div className="product" key={item._id}>
                  {console.log(cartItems)}
                 {item.images ? (
                    <img
                      src={item.images} // Access the correct image path
                      className="cart-product-image"
                      alt={item.name}
                    />
                  ) : (
                    <div className="no-image">No image available</div>
                  )}

                  

                  <div className="item-desc">
                    <div className="flex top">
                      <h5>{item.name}</h5>
                      <h4>${item.price}</h4>
                    </div>
                    <div className="flex bottom">
                      <div>
                        <p className="quantity-desc">
                          <span className="minus" onClick={() => toggleCartItemQuanitity(item._id, 'dec')}>
                            <AiOutlineMinus />
                          </span>
                          <span className="num">{item.quantity}</span>
                          <span className="plus" onClick={() => toggleCartItemQuanitity(item._id, 'inc')}>
                            <AiOutlinePlus />
                          </span>
                        </p>
                      </div>
                      <button
                        type="button"
                        className="remove-item"
                        onClick={() => onRemove(item)}
                      >
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ):  <div className="empty-cart">
        <AiOutlineShopping size={150} />
        <h3>Your shopping bag is empty</h3>
        <a href="/">
          <button
            type="button"
            onClick={() => setShowCart(false)}
            className="btn"
          >
            Continue Shopping
          </button>
        </a>
      </div>
        }
      </div>
    </div>
  );
};

export default Cart;
