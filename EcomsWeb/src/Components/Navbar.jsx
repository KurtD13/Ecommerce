import { Link } from "react-router-dom"
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Navbar(){

    const [inputText, setInputText] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      navigate('/resultpage', { state: { inputText } }); 
    };


    return(
        <nav className="navbar navbar-expand-lg py-3 "  style={{backgroundColor:'#273F4F'}}>
        <div className="container">
          <a className="navbar-brand fw-bolder" style={{color:'#FE7743'}} href="/">EXOtique</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

              <form className="d-flex input-group" onSubmit={handleSubmit} style={{
                width: '100%',
                fontSize: '16px',
                boxSizing: 'border-box',
              }} role="search">
                <span class="input-group-text">Search</span>
                <input className="form-control" 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                aria-label="Search"></input>
                <button to="/resultpage" className="btn input-group-text me-2" type="submit" style={{background:"#FE7743", color:'#EFEEEA'}}><i className="bi bi-search"></i></button>
              </form>

            <Link to="/Cartpage" style={{background:"#FE7743", color:'#EFEEEA'}} className="btn me-2"><i className="bi bi-cart-fill"></i></Link>
            <Link to="/loginpage" style={{background:"#FE7743", color:'#EFEEEA'}} className="btn me-2">Login</Link>
            <Link to="/profilepage" style={{background:"#FE7743", color:'#EFEEEA'}} className="btn"><i className="bi bi-person-fill"></i></Link>
          </div>
        </div>
      </nav>
    );
}
