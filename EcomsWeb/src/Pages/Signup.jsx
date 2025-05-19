import React, { useState } from "react";
import { Navbar } from "../Components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export function Signup() {
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
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/user", userdata);
      if (response.status === 200) {
        setSuccessMessage("Account created successfully!");
        setErrorMessage('');

        // Redirect to the Landingpage immediately after successful signup
        navigate("/");

        // Reset the form state (this will happen after navigation)
        setUserdata({
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
      }
    } catch (err) {
      console.error("Signup error:", err);
      setErrorMessage("An error occurred during signup. Please try again.");
      setSuccessMessage('');
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "#EFEEEA", minHeight: "100vh", padding: "20px" }}>
        {step === 1 && <CreateAccount onNext={nextStep} userdata={userdata} setUserdata={setUserdata} />}
        {step === 2 && (
          <PersonalInformation
            userdata={userdata}
            setUserdata={setUserdata}
            onSignup={handleSignup}
            errorMessage={errorMessage}
            successMessage={successMessage}
          />
        )}
      </div>
    </>
  );
}

function CreateAccount({ onNext, userdata, setUserdata }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleNext = () => {
    if (userdata.consumerpassword !== passwordConfirm) {
      alert("Passwords do not match!");
      return;
    }
    onNext();
  };

  return (
    <div className="container" style={modalStyle}>
      <h4 style={titleStyle}>Create an Account</h4>
      <div className="row mb-3">
        <div className="col">
          <input
            className="form-control"
            placeholder="Username"
            value={userdata.consumerusername}
            onChange={(e) => setUserdata({ ...userdata, consumerusername: e.target.value })}
          />
        </div>
        <div className="col">
          <input
            className="form-control"
            placeholder="Phone number"
            value={userdata.consumerphone}
            onChange={(e) => setUserdata({ ...userdata, consumerphone: e.target.value })}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <div className="input-group">
            <input
              className="form-control"
              placeholder="Create your password"
              type={showPassword ? "text" : "password"}
              value={userdata.consumerpassword}
              onChange={(e) => setUserdata({ ...userdata, consumerpassword: e.target.value })}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
          </div>
        </div>
        <div className="col">
          <div className="input-group">
            <input
              className="form-control"
              placeholder="Confirm your password"
              type={showConfirm ? "text" : "password"}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
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
      <div className="text-end">
        <button style={{ background: "#FE7743" }} className="btn btn-dark" onClick={handleNext}>
          Proceed
        </button>
      </div>
    </div>
  );
}

function PersonalInformation({ userdata, setUserdata, onSignup, errorMessage, successMessage }) {
  return (
    <div className="container" style={modalStyle}>
      <h4 style={titleStyle}>Personal Information</h4>
      <div className="row">
        <div className="col-md-6 mb-3">
          <input
            className="form-control"
            placeholder="First name"
            value={userdata.consumerfirstname}
            onChange={(e) => setUserdata({ ...userdata, consumerfirstname: e.target.value })}
          />
        </div>
        <div className="col-md-6 mb-3">
          <input
            className="form-control"
            placeholder="Last name"
            value={userdata.consumerlastname}
            onChange={(e) => setUserdata({ ...userdata, consumerlastname: e.target.value })}
          />
        </div>
        <div className="col-md-6 mb-3">
          <input
            className="form-control"
            placeholder="Middle name"
            value={userdata.consumermiddlename}
            onChange={(e) => setUserdata({ ...userdata, consumermiddlename: e.target.value })}
          />
        </div>
        <div className="col-md-6 mb-3">
          <input
            className="form-control"
            placeholder="Email"
            type="email"
            value={userdata.consumeremail}
            onChange={(e) => setUserdata({ ...userdata, consumeremail: e.target.value })}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Birthdate</label>
          <input
            className="form-control"
            type="date"
            value={userdata.consumerbirthdate}
            onChange={(e) => setUserdata({ ...userdata, consumerbirthdate: e.target.value })}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Profile Image</label>
          <input
            className="form-control"
            type="file"
            onChange={(e) => setUserdata({ ...userdata, consumerimage: e.target.files[0] })}
          />
        </div>
      </div>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <div className="text-end">
        <button style={{ background: "#FE7743" }} className="btn btn-dark" onClick={onSignup}>
          Confirm
        </button>
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