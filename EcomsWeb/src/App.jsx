import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Landingpage } from './Pages/Landingpage'
import { Loginpage } from './Pages/Loginpage' 
import { Cartpage } from './Pages/Cartpage'
import { Resultpage } from './Pages/Resultpage'
import { Profilepage } from './Pages/Profilepage'
import { Signup } from './Pages/Signup'
import { Checkoutpage } from './Pages/Checkout'
import { SellerDashboard } from './Pages/SellerDashboard'
import { Sellerproducts } from './Pages/Sellerproducts'
import { Sellershop } from './Pages/Sellershop'
import { Sellerorders } from './Pages/Sellerorders'
import { Sellercancel } from './Pages/Sellercancel'

function App() {

  return (
    <>

      <Router>
      <Loginpage />
        <Routes>
          <Route path="/" element={<Landingpage/>}/>
          <Route path="/loginpage" element={<Loginpage/>}/>
          <Route path="/cartpage" element={<Cartpage/>}/>
          <Route path="/checkout" element={<Checkoutpage/>}/>
          <Route path="/resultpage" element={<Resultpage/>}/>
          <Route path="/profilepage" element={<Profilepage/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/sellerpage" element={<SellerDashboard/>}/>
          <Route path="/sellerproducts" element={<Sellerproducts/>}/>
          <Route path="/sellershop" element={<Sellershop/>}/>
          <Route path="/sellerorders" element={<Sellerorders/>}/>
          <Route path="/sellercancel" element={<Sellercancel/>}/>
        </Routes>
      </Router>
     
      
    </>
      )
}

export default App
