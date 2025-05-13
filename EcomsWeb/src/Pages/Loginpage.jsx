import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Signup } from "./Signup";
import { useNavigate } from 'react-router-dom';
import "../login.css";
import axios from "axios";

export function Loginpage() {
  const [useremail, setUseremail] = useState('');
  const [userpass, setPassword] = useState('');
  const [userkey, setUserkey] = useState('');
  const navigate = useNavigate();

  const checkAccount = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Get consumerid by searching for the email
      const idResponse = await axios.post("http://localhost:3000/api/getConsumerId", {
        consumeremail: useremail
      });

      if (idResponse.data && idResponse.data.consumerid) {
        const consumerid = idResponse.data.consumerid;

        // Step 2: Use consumerid to verify email and password
        const verifyResponse = await axios.post("http://localhost:3000/api/verifyConsumer", {
          consumerid: consumerid,
          consumeremail: useremail,
          consumerpass: userpass
        });

        if (verifyResponse.data && verifyResponse.data.valid) {
          setUserkey(verifyResponse.data.userkey);
          alert(`Login successful. User Key: ${verifyResponse.data.userkey}`);
        } else {
          alert("Invalid email or password.");
        }
      } else {
        alert("Email not found.");
      }
    } catch (err) {
      alert("Login failed. Please try again.");
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
              <form onSubmit={checkAccount}>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={useremail}
                      onChange={e => setUseremail(e.target.value)}
                      required
                    />
                    <span className="input-group-text">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={userpass}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                    <span className="input-group-text password-toggle">
                      <i className="fas fa-eye"></i>
                    </span>
                  </div>
                </div>

                <div className="form-check d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <input type="checkbox" className="form-check-input" id="remember" />
                    <label className="form-check-label" htmlFor="remember">Remember me</label>
                  </div>
                  <a href="#" className="text-decoration-none">Forgot password?</a>
                </div>

                <button type="submit" className="btn btn-login text-white w-100 mb-3">Sign In</button>
              </form>
                <div className="divider text-center my-3">
                  <span>or continue with</span>
                </div>

                <div className="social-login d-flex justify-content-between mb-3">
                  <button type="button" className="btn btn-social w-48">
                    <i className="fab fa-google me-2"></i>Google
                  </button>
                  <button type="button" className="btn btn-social w-48">
                    <i className="fab fa-facebook-f me-2"></i>Facebook
                  </button>
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
