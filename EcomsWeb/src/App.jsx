import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Landingpage } from './Pages/Landingpage'
import { Loginpage } from './Pages/Loginpage' 
import { Cartpage } from './Pages/Cartpage'
import { Resultpage } from './Pages/Resultpage'
import { Profilepage } from './Pages/Profilepage'
import { Signup } from './Pages/Signup'
import { Products } from './Pages/Products'
import { Productpreview } from './Components/Productpreview'
import { Checkoutpage } from './Pages/Checkout'

function App() {

  return (
    <>

      <Router>
      <Loginpage  />
        <Routes>
          <Route path="/" element={<Landingpage/>}/>
          <Route path="/loginpage" element={<Loginpage/>}/>
          <Route path="/cartpage" element={<Cartpage/>}/>
          <Route path="/checkout" element={<Checkoutpage/>}/>
          <Route path="/resultpage" element={<Resultpage/>}/>
          <Route path="/profilepage" element={<Profilepage/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/products/:productId" element={<Products />} />
          <Route path="/productsearch" element={<Productpreview/>}/>
          <Route path="/productpreview" element={<Productpreview/>}/>
        </Routes>
      </Router>
     
      
    </>
      )
}

export default App
