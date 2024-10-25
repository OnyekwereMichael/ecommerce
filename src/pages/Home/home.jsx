import React, { useEffect, useState } from 'react';
import { Product, FooterBanner, HeroBanner, Navbar, Footer } from '../../component';
import { Route, Routes, useNavigate } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <HeroBanner />
            <div className='products-heading'>
                <h2>Best Selling Product</h2>
                <p>Clothes There are many variations</p>
            </div>
            <Product />
            <FooterBanner />
        </div>
    )
}

export default Home
