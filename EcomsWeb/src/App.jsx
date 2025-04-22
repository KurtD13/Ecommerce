import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Landingpage } from './Pages/Landingpage'
import { Loginpage } from './Pages/Loginpage' 
import { Cartpage } from './Pages/Cartpage'
import { Resultpage } from './Pages/Resultpage'
import { Profilepage } from './Pages/Profilepage'
import { Signup } from './Pages/Signup'

function App() {

  return (
    <>

      <Router>
      <Loginpage />
        <Routes>
          <Route path="/" element={<Landingpage/>}/>
          <Route path="/loginpage" element={<Loginpage/>}/>
          <Route path="/cartpage" element={<Cartpage/>}/>
          <Route path="/resultpage" element={<Resultpage/>}/>
          <Route path="/profilepage" element={<Profilepage/>}/>
        </Routes>
      </Router>
     
      
    </>
      )
}

export default App
