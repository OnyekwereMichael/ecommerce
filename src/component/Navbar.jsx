import React, { useState } from 'react'
import {AiOutlineShopping} from 'react-icons/ai'
import Cart from './Cart'
import { useStateContext } from '../../context/StateContext'

const Navbar = () => {
  const {setShowCart, showCart,  totalQuantities} = useStateContext()
  return (
    <div className='navbar-container'>
         <p className='logo'>
          <a href="/">Forever Store</a>
         </p>

         <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
          <AiOutlineShopping />
          <span className='cart-item-qty'>{totalQuantities}</span>
         </button>
         {showCart ? <Cart /> : ""}
           
    </div>
  )
}

export default Navbar
