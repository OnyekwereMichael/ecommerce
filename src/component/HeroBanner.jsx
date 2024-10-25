import React from 'react';
import { useQuery } from '@tanstack/react-query'; 
import { client } from '../../lib/client'; 

const HeroBanner = () => {
  const fetchBannerDetails = async () => {
    const query = `*[_type == "banner"] | order(_createdAt desc)[0]{
      _id,
      midText,
      saleTime,
      largeText1,
      desc,
      buttonText,
      smallText,
      "imageUrl": image.asset->url,
      discount,
      largeText2,
    }`;
    const data = await client.fetch(query);
    return data;
  };

  const { data: Banner, isLoading: BannerLoading, error: BannerError } = useQuery({
    queryKey: ['banner'],
    queryFn: fetchBannerDetails,
  });

  if (BannerLoading) {
    return <div>Loading...</div>;
  }

  if (BannerError) {
    return <div>Error: {BannerError.message}</div>;
  }

  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>{Banner.smallText}</p>
        <h3>{Banner.midText}</h3>
        <h1>{Banner.largeText1}</h1>
        <img src={Banner.imageUrl} alt="Banner Image" className='hero-banner-image' />

        <div>
          <a href={`/product/${Banner._id}`}>
            <button type='button'>{Banner.buttonText}</button>
          </a>

          <div className='desc'>
            <h5>Description</h5>
            <p>{Banner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
