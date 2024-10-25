import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import TanstackProvider from './component/provider/TanstackProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
import { StateContext } from '../context/StateContext.jsx'
import {Toaster} from 'react-hot-toast'
createRoot(document.getElementById('root')).render(

  <StateContext >
  <BrowserRouter>
    <TanstackProvider>
      <Toaster />
    <App />
    </TanstackProvider>
  </BrowserRouter>
  </StateContext>
)
