import React from 'react';
import { useQuery } from '@tanstack/react-query'; 
import { client } from '../../lib/client'; 
import productDetails from './productDetails/productDetails';

const Product = () => {
  // Function to fetch data from Sanity
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
  const { data: products, isLoading: productLoading, error: productError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (productLoading) {
    return <div>Loading...</div>;
  }

  if (productError) {
    return <div>Error: {productError.message}</div>;
  }

  return (
    <div className="products-container">
      {products.length > 0 ? (
        products.map((product) => (
          <a href={`/productDetail/${product.slug}`} key={product._id}>
          <div key={product._id} className="product-card">
            <img src={product.imageUrl} alt={product.name} width="300" className='product-image' />
            <h3 className='product-name'>{product.name}</h3>
            <p className='product-price'>${product.price}</p>
            {/* <p>{product.details}</p> */}
          </div>
    </a>
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default Product;
