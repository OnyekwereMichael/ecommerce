import { AiOutlinePlus, AiOutlineMinus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { client } from '../../../lib/client';
import Product from '../Product';
import { useStateContext } from '../../../context/StateContext';

const Productdetails = () => {
  const { qty, incQty, decQty, cartItems, setCartItems, totalPrice, setTotalPrice, totalQuantities, setTotalQuantities } = useStateContext();
  const [index, setIndex] = useState(0);
  const { slug } = useParams();

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    const storedTotalPrice = JSON.parse(localStorage.getItem('totalPrice'));
    const storedTotalQuantities = JSON.parse(localStorage.getItem('totalQuantities'));

    if (storedCartItems) setCartItems(storedCartItems);
    if (storedTotalPrice) setTotalPrice(storedTotalPrice);
    if (storedTotalQuantities) setTotalQuantities(storedTotalQuantities);
  }, [setCartItems, setTotalPrice, setTotalQuantities]);

  // Fetch product data
  async function getData(slug) {
    const query = `*[_type == "product" && slug.current == "${slug}"][0]{
      _id,
      name,
      price,
      "slug": slug.current,
      "details": details,
      "images": image[].asset->url
    }`;
    const data = await client.fetch(query);
    return data;
  }

  const { data: productDetail, isLoading, error, isError } = useQuery({
    queryKey: ['productDetail', slug],
    queryFn: () => getData(slug),
    enabled: !!slug,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!productDetail) {
    return <div>No product found</div>;
  }

  // Add to cart functionality
  const addToCart = () => {
    const existingProduct = cartItems.find(item => item._id === productDetail._id);

    let updatedCartItems;
    const newTotalPrice = totalPrice + productDetail.price * qty;
    const newTotalQuantities = totalQuantities + qty;

    if (existingProduct) {
      updatedCartItems = cartItems.map(item =>
        item._id === productDetail._id
          ? { ...item, quantity: item.quantity + qty }
          : item
      );
      toast.success(`${qty} ${productDetail.name} quantity updated in the cart.`);
    } else {
      updatedCartItems = [...cartItems, { ...productDetail, quantity: qty }];
      toast.success(`${qty} ${productDetail.name} added to the cart.`);
    }

    // Update state and localStorage
    setCartItems(updatedCartItems);
    setTotalPrice(newTotalPrice);
    setTotalQuantities(newTotalQuantities);

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    localStorage.setItem('totalPrice', JSON.stringify(newTotalPrice));
    localStorage.setItem('totalQuantities', JSON.stringify(newTotalQuantities));
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className='image-container'>
            <img
              src={productDetail.images[index]}
              alt={productDetail.name}
            />
          </div>

          <div className='small-images-container'>
            {productDetail.images.map((image, i) => (
              <div key={i}>
                <img
                  className='selected-image'
                  src={image}
                  alt={`Thumbnail ${i}`}
                  width="70"
                  height="70"
                  onClick={() => setIndex(i)}
                  style={{
                    cursor: 'pointer',
                    border: index === i ? '4px solid #f02d34' : 'none',
                    borderRadius: '10px'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className='product-detail-desc'>
          <h1>{productDetail.name}</h1>
          <div className='reviews'>
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{productDetail.details}</p>
          <p className='price'>${productDetail.price}</p>

          <div className='quantity'>
            <h3>Quantity: </h3>
            <p className='quantity-desc'>
              <span className='minus' onClick={decQty}><AiOutlineMinus /></span>
              <span className='num'>{qty}</span>
              <span className='plus' onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>

          <div className='buttons'>
            <button type='button' className='add-to-cart' onClick={addToCart}>Add to Cart</button>
            <button className='buy-now'>Buy Now</button>
          </div>
        </div>
      </div>

      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            <Product />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productdetails;
