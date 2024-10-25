import React from 'react'
import { useQuery } from '@tanstack/react-query'; 
import { client } from '../../lib/client'; 
import Product from './Product';

const FooterBanner = () => {
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
    <div className='footer-banner-container'>
     <div className='banner-desc'>
           <div className='left'>
              <p>{Banner.discount}</p>
               <h3>{Banner.largeText1}</h3>
               <h3>{Banner.largeText2}</h3>
              <p>{Banner.saleTime}</p>
           </div>
           <div className='right'>
                 <p>{Banner.smallText}</p>
                 <h3>{Banner.midText}</h3>
                 <p>{Banner.desc}</p>
                 <a href={`/product/${Product}`}>
                  <button type='button'>{Banner.buttonText}</button>
                 </a>
           </div>
           <img src={Banner.imageUrl} alt="Banner Image" width={500} className='footer-banner-image' />
     </div>
    </div>
  )
}

export default FooterBanner
