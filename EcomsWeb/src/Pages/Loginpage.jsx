import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../login.css";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";

export function Loginpage() {
  const [useremail, setUseremail] = useState('');
  const [userpass, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');
  const { setIsLoggedIn } = useAuth(); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:3000/api/user/login", {
      email: useremail,
      password: userpass,
    });

    // Check if the login response contains a valid consumer ID
    if (response.data && response.data.consumerid) {
      localStorage.setItem("userkey", response.data.consumerid);

      // Fetch shop information
      let shopresponse = null;
      try {
        shopresponse = await axios.get(`http://localhost:3000/api/shop/userkey/${response.data.consumerid}`);
      } catch (err) {
        console.warn("Shop response is null or failed to fetch:", err.message);
      }

      // Handle shopkey based on shopresponse
      if (shopresponse && shopresponse.data && shopresponse.data.shopid !== null) {
        localStorage.setItem("shopkey", shopresponse.data.shopid);
      } else {
        localStorage.setItem("shopkey", "0"); // Default value if no shop exists
      }

      // Update login state
      setIsLoggedIn(true);

      // Close the modal
      const modalElement = document.getElementById("loginModal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();

      // Redirect to the homepage or another page
      navigate("/");
    } else {
      setErrorMessage("Invalid email or password.");
    }
  } catch (err) {
    console.error("Login error:", err);
    setErrorMessage("Password or Email Incorrect. Please try again.");
  }
};

  return (
    <>
      <div className="modal fade" id="loginModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Log In</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label  ">Email address</label>
                  <div className="input-group ">
                    <input
                      type="email"
                      className="form-control border-secondary"
                      placeholder="Enter your email"
                      value={useremail}
                      onChange={(e) => setUseremail(e.target.value)}
                      required
                    />
                    <span className="input-group-text border-secondary ">
                      <i className="fas fa-envelope "></i>
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"} // Toggle between text and password
                      className="form-control border-secondary"
                      placeholder="Enter your password"
                      value={userpass}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-dark border-secondary input-group-text"
                      onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                    >
                      <i className={ showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                    </button>
                  </div>
                </div>

                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}

                <div className="form-check d-flex justify-content-between align-items-center mb-3">
                
          
                </div>

                <button type="submit" className="btn btn-login text-white w-100 mb-3">Sign In</button>
              </form>
              <div className="divider text-center my-3">
                
              </div>

              <div className="social-login d-flex justify-content-between mb-3">
             
              </div>

              <div className="register-link text-center" data-bs-dismiss="modal">
                Don't have an account? <Link to="/Signup" className="text-decoration-none">Register now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}