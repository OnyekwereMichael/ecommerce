import React, { useEffect, useState } from 'react';
import { Navbar, Footer, ProductDetails  } from './component';
import Home from './pages/Home/home';
import NotFound from './component/NotFound';
import { Route, Routes } from "react-router-dom"

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productDetail/:slug" element={<ProductDetails />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
