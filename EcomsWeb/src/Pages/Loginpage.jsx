import { useState } from "react";
import { Link } from "react-router-dom"
import { Signup } from "./Signup";
import "../login.css";


export function Loginpage(){
    return(
       <>
       <div className="modal fade" id="loginModal" tabindex="-1">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Log In</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <div className="input-group">
                <input type="email" className="form-control" placeholder="Enter your email"/>
                <span className="input-group-text">
                    <i className="fas fa-envelope"></i>
                  </span>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <div className="input-group">
                <input type="password" className="form-control" placeholder="Enter your password"/>
                <span className="input-group-text password-toggle">
                    <i className="fas fa-eye"></i>
                  </span>
              </div>
            </div>

            <div className="form-check">
              <div>
                <input type="checkbox" className="form-check-input" id="remember"/>
                <label className="form-check-label" for="remember">Remember me</label>
              </div>
              <a href="#" className="text-decoration-none">Forgot password?</a>
            </div>

            <button type="submit" className="btn btn-login text-white">Sign In</button>

            <div className="divider">
              <span>or continue with</span>
            </div>

            <div className="social-login">
              <button type="button" className="btn btn-social">
                  <i className="fab fa-google"></i>Google
                </button>
              <button type="button" className="btn btn-social">
                  <i className="fab fa-facebook-f"></i>Facebook
                </button>
            </div>

            <div className="register-link">
              Don't have an account? <a href="#" className="text-decoration-none">Register now</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
       </> 
    );
}

