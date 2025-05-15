import React, { useState, useRef } from "react";
import { Navbar } from "../Components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";


export function Signup(){
  const [step, setStep] = useState(1);
  const nextStep = () => setStep(step + 1);
  const [userdata, setUserdata] = useState({
    consumerusername: '',
    consumerpassword: '',
    consumerfirstname: '',
    consumermiddlename: '',
    consumerlastname: '',
    consumerbirthdate: '',
    consumerimage: '',
    consumerphone: '',
    consumeremail: ''
  });

  

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "#EFEEEA", minHeight: "100vh", padding: "20px" }}>
        {step === 1 && <CreateAccount onNext={nextStep} />}
        {step === 2 && <AccountConfirmation onNext={nextStep} />}
        {step === 3 && <PersonalInformation />}
      </div>
    </>
  );
}

function CreateAccount({ onNext }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPasswordTip, setShowPasswordTip] = useState(false);

  return (
    <div className="container" style={modalStyle}>
      <h4 style={titleStyle}>Create an Account</h4>
      <div className="row mb-3">
        <div className="col">
          <input className="form-control" placeholder="Username" />
        </div>
        <div className="col">
          <input className="form-control" placeholder="Phone number" />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <div className="input-group">
            <input
              className="form-control"
              placeholder="Create your password"
              type={showPassword ? "text" : "password"}
              onFocus={() => setShowPasswordTip(true)}
              onBlur={() => setShowPasswordTip(false)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
          </div>
          {showPasswordTip && (
            <div style={{ fontSize: "small", color: "#fff", marginTop: "5px" }}>
              Password must include: a symbol, an uppercase letter, a lowercase letter, and a number.
            </div>
          )}
        </div>
        <div className="col">
          <div className="input-group">
            <input
              className="form-control"
              placeholder="Confirm your password"
              type={showConfirm ? "text" : "password"}
              onFocus={() => setShowPasswordTip(true)}
              onBlur={() => setShowPasswordTip(false)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              <i className={`fa ${showConfirm ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
          </div>
        </div>
      </div>
      <div style={{color:"white"}}  className="text-center mb-2">--- OR ---</div>
      <div className="d-flex justify-content-center gap-3 mb-3">
        <button className="btn btn-light"> <i className="fab fa-google"></i> Google</button>
        <button className="btn btn-primary"> <i className="fab fa-facebook-f"></i> </button>
      </div>
      <div className="text-end">
        <button style={{ background: "#FE7743" }} className="btn btn-dark" onClick={onNext}>Proceed</button>
      </div>
    </div>
  );
}

function AccountConfirmation({ onNext }) {
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    if (e.target.value.length === 1 && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  return (
    <div className="container" style={modalStyle}>
      <h4 style={titleStyle}>Enter the Confirmation Code</h4>
      <div className="d-flex justify-content-center gap-2 mb-2">
        {[...Array(6)].map((_, i) => (
          <input
            key={i}
            ref={el => inputsRef.current[i] = el}
            className="form-control text-center"
            style={{ width: "40px" }}
            maxLength="1"
            onChange={e => handleChange(e, i)}
          />
        ))}
      </div>
      <div className="text-center mb-3" style={{ fontSize: "small", color: "#EFEEEA" }}>
        Didn't receive it yet? <a href="#" className="text-white">Resend Code</a>
      </div>
      <div className="text-end">
        <button style={{ background: "#FE7743" }} className="btn btn-dark" onClick={onNext}>Confirm</button>
      </div>
    </div>
  );
}

function PersonalInformation() {
  const [email, setEmail] = useState("");
  const isValidEmail = email.endsWith("@gmail.com");

  return (
    <div className="container" style={modalStyle}>
      <h4 style={titleStyle}>Personal Information</h4>
      <div className="row">
        <div className="col-md-6 mb-3">
          <input className="form-control" placeholder="First name" />
        </div>
        <div className="col-md-6 mb-3">
          <select className="form-control">
            <option value="">Select Province/State</option>
            <option>Laguna</option>
            <option>Quezon</option>
            <option>Cavite</option>
          </select>
        </div>
        <div className="col-md-6 mb-3">
          <input className="form-control" placeholder="Last name" />
        </div>
        <div className="col-md-6 mb-3">
          <select className="form-control">
            <option value="">Select City/Municipality</option>
            <option>San Pablo</option>
            <option>Calamba</option>
            <option>Lucena</option>
          </select>
        </div>
        <div className="col-md-6 mb-1">
          <input
            className="form-control"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!isValidEmail && <div style={{ color: "red", fontSize: "small" }}>Invalid email format</div>}
        </div>
        <div className="col-md-6 mb-3">
          <select className="form-control">
            <option value="">Select Barangay</option>
            <option>Barangay 1</option>
            <option>Barangay 2</option>
            <option>Barangay 3</option>
          </select>
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label text-white">Birthdate</label>
          <input className="form-control" type="date" />
        </div>
        <div className="col-md-6 mb-3">
          <input className="form-control" placeholder="House number/ Street name" />
        </div>
      </div>
      <div className="text-end">
        <button style={{ background: "#FE7743" }} className="btn btn-dark">Confirm</button>
      </div>
    </div>
  );
}


const modalStyle = {
  backgroundColor: "#273F4F",
  color: "#000",
  padding: "30px",
  borderRadius: "10px",
  maxWidth: "700px",
  margin: "auto",
  marginTop: "50px"
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "20px",
  fontWeight: "bold",
  color: "#EFEEEA"
};