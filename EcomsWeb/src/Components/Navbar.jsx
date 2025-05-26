import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import axios from "axios";

export function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoggedIn } = useAuth(); // Access login state from context
  const [isSeller, setIsSeller] = useState(false);
  
  const navigate = useNavigate();
  const userkey = localStorage.getItem("userkey");
  let profilekey = userkey;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/resultpage?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/seller/${profilekey}`);
        setIsSeller(response.data.consumersellerstatus); // Correctly set the seller status
      } catch (err) {
        console.error("Error fetching seller status:", err.message);
      }
    };


      if (profilekey) {
      fetchData(); // Call the function
    }
    
  }, [profilekey]);

  console.log("Is Seller:", isSeller);
  

  


  

  return (
    <nav className="navbar navbar-expand-lg py-3" style={{ backgroundColor: "#273F4F" }}>
      <div className="container">
        <a
          className="navbar-brand fw-bolder"
          style={{ color: "#FE7743", fontSize:"1.5rem" , transition: "transform 0.3s ease, font-size 0.3s ease" }}
          href="/"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.2)";
            e.currentTarget.style.fontSize = "1.6rem";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1.0)";
            e.currentTarget.style.fontSize = "1.5rem";
          }}
        >
          EXOtique
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form
            className="d-flex input-group"
            onSubmit={handleSearch}
            style={{
              width: "100%",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
            role="search"
          >
            
            <input
              className="form-control"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search"
            ></input>
            <button
              className="btn input-group-text me-2"
              type="submit"
              style={{ background: "#FE7743", color: "#EFEEEA" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e8602c")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FE7743")}
            >
              <i className="bi bi-search"></i>
            </button>
          </form>

          <Link
            to="/Cartpage"
            style={{ background: "#FE7743", color: "#EFEEEA" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e8602c")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FE7743")}
            className="btn me-2"
          >
            <i className="bi bi-cart-fill"></i>
          </Link>

          {/* Conditionally render login button based on login state */}
          {!isLoggedIn && (
            <button
              className="btn me-2"
              style={{ background: "#FE7743", color: "#EFEEEA" }}
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e8602c")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FE7743")}
            >
              Login
            </button>
          )}

          {isLoggedIn && (
            <>
             <Link
              to="/profilepage"
              style={{ background: "#FE7743", color: "#EFEEEA" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e8602c")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FE7743")}
              className="btn me-2"
            >
              <i className="bi bi-person-fill"></i>
            </Link>

            </>
          )}
          {isSeller &&(
              <Link
                  to="/sellerdash"
                  className="btn me-2"
                  style={{ background: "#FE7743", color: "#EFEEEA" }}
                >
              Shop
            </Link>
          )}
            
            
          </div>
        </div>
    </nav>
  );
}