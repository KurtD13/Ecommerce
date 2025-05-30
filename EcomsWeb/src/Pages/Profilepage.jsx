import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { use } from "react";
import { useNavigate } from "react-router-dom";
import { useTTS } from '../TTSContext';

export function Profilepage(){
   const userkey = localStorage.getItem("userkey");
   const shopkey = localStorage.getItem("shopkey");
   let profilekey = userkey;
   
   

    return(
        <>
        
        <Navbar/>
        <div className="container">
          <div>
               
              </div>
            <ProfilePage userkey={profilekey}/>
        </div>

        <Footer/>
        </>
    );
}





const ProfileSection = ({ onEdit, userKey }) => {
  const [userData, setUserdata] = useState([]);
  let userkey = userKey;
  const shopkey = localStorage.getItem("shopkey");
   const [isTTSEnabled, setIsTTSEnabled] = useState(() => {
    // Retrieve the TTS state from localStorage or default to false
    return JSON.parse(localStorage.getItem("isTTSEnabled")) || false;
  });
  const toggleTTS = () => {
    const newState = !isTTSEnabled;
    setIsTTSEnabled(newState);
    localStorage.setItem("isTTSEnabled", JSON.stringify(newState)); // Save the state in localStorage
  };
   const speak = (text) => {
  if (isTTSEnabled) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }
  
};
  
   
  const [newShop, setNewShop] = useState({
    sellername: "",
    shippinglocation: "",
    shopname: "",
    shopdescription: "",
    shopbanner: "",
    shoplogo: "",
    userkey: userkey
  });

 const handleCreateShop = async (e) => {
  e.preventDefault();
  try {
    // Create the shop
    const response = await axios.post("http://localhost:3000/api/shop", newShop);
    if (response.status === 200) {
      alert("Shop created successfully!");

      // Reset the form fields
      setNewShop({
        sellername: "",
        shippinglocation: "",
        shopname: "",
        shopdescription: "",
        shopbanner: "",
        shoplogo: "",
        userkey: userkey,
      });

      // Update the consumersellerstatus
      try {
        const sellerStatusResponse = await axios.put(
          `http://localhost:3000/api/user/sellerstatus/${userkey}`,
          { consumersellerstatus: true } // Set the seller status to true
        );
        if (sellerStatusResponse.data) {
          console.log("Seller status updated:", sellerStatusResponse.data);
        }
      } catch (err) {
        console.error("Error updating seller status:", err.message);
      }

      // Update the shopkey in localStorage
      try {
        const shopResponse = await axios.get(`http://localhost:3000/api/shop/userkey/${userkey}`);
        if (shopResponse.data && shopResponse.data.shopid !== null) {
          localStorage.setItem("shopkey", shopResponse.data.shopid);
          console.log("Shopkey updated in localStorage:", shopResponse.data.shopid);
        }
      } catch (err) {
        console.error("Error updating shopkey in localStorage:", err.message);
      }

      // Reload the page to reflect changes
      window.location.reload();
    }
  } catch (err) {
    console.error("Error creating shop:", err);
    alert("Failed to create shop. Please try again.");
  }
};


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user');
        setUserdata(response.data); // Set the data from the local host
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, []);

  const filtered = userData.filter((u) =>
    u.consumerid.toString().includes(userkey?.toString())
  );

  if (!userkey || filtered.length === 0) {
    return (
      <section>
        <h2>My Profile</h2>
        <div className="card p-4">
          <p>Please Login</p>
        </div>
      </section>
    );
  }

 


  return (
    <>
      {filtered.map((userInfo) => (
        <section key={userInfo.consumerid}>
          <h2>My Profile</h2>
          <div className="card p-4 shadow-lg">
            <div className="d-flex justify-content-between mb-4">
              <div className="profile-info">
                <div className="d-flex align-items-center mb-4">
                  <img
                    src={userInfo.consumerimage || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}
                    className="rounded-circle me-3"
                    width="100"
                    height="100"
                    alt="Profile"
                     onClick={() => speak(userInfo.consumerusername + " profile picture")}
                  />
                  <div>
                    <h5 className="mb-0 fw-bold">{userInfo.consumerfirstname} {userInfo.consumermiddlename} {userInfo.consumerlastname}</h5>
                  </div>
                </div>
                <p onClick={() => speak(userInfo.consumerusername)}><strong>Username:</strong> {userInfo.consumerusername}</p>
                <p onClick={() => speak(userInfo.consumeremail)}><strong>Email:</strong> {userInfo.consumeremail}</p>
                <p onClick={() => speak(userInfo.consumerbirthdate.substring(0, 10))}><strong>Birthdate:</strong> {userInfo.consumerbirthdate.substring(0, 10)}</p>
                <p onClick={() => speak(userInfo.consumerphone)}><strong>Phone Number:</strong> {userInfo.consumerphone}</p>
                <label className="d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check me-2"
                  checked={isTTSEnabled}
                  onChange={toggleTTS}
                />
                Enable Text to Speech
              </label>
                 
              </div>
              <div className="text-end ">
                <div className="row">
                  
                </div>
                <button onClick={() => {
                  onEdit();
                  speak("Edit Profile");
                }} className="btn btn-warning px-3"><i class="bi bi-pencil-square"></i></button>
                <button
                    className="btn btn-danger text-start ms-1 px-4"
                   
                    onClick={() => {
                      localStorage.setItem("userkey", "0");
                      window.location.href = "/";
                    }}
                    >
                    Logout
                </button><br/>
                    {(shopkey === null || shopkey === "0" || shopkey === undefined) && 
                
                  <button
                  className="btn btn-success mt-1 px-4 fw-bold"
                  data-bs-toggle="modal"
                  data-bs-target="#createShopModal"
                >
                  Create a Shop
                </button>
            }

              </div>
            </div>
          </div>

          {/* Create Shop Modal */}
              <div
                className="modal fade"
                id="createShopModal"
                tabIndex="-1"
                aria-labelledby="createShopModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <form className="modal-content" onSubmit={handleCreateShop}>
                    <div className="modal-header">
                      <h5 className="modal-title" id="createShopModalLabel">
                        Create a Shop
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        {/* Seller Name */}
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Seller Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={newShop.sellername}
                            onChange={(e) =>
                              setNewShop({ ...newShop, sellername: e.target.value })
                            }
                            required
                          />
                        </div>
                        {/* Shipping Location */}
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Shipping Location</label>
                          <input
                            type="text"
                            className="form-control"
                            value={newShop.shippinglocation}
                            onChange={(e) =>
                              setNewShop({ ...newShop, shippinglocation: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      {/* Shop Name */}
                      <div className="mb-3">
                        <label className="form-label">Shop Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={newShop.shopname}
                          onChange={(e) =>
                            setNewShop({ ...newShop, shopname: e.target.value })
                          }
                          required
                        />
                      </div>
                      {/* Shop Description */}
                      <div className="mb-3">
                        <label className="form-label">Shop Description</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          value={newShop.shopdescription}
                          onChange={(e) =>
                            setNewShop({ ...newShop, shopdescription: e.target.value })
                          }
                          required
                        ></textarea>
                      </div>
                      {/* Shop Banner */}
                      <div className="mb-3">
                        <label className="form-label">Shop Banner (URL)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="https://example.com/banner.jpg"
                          value={newShop.shopbanner}
                          onChange={(e) =>
                            setNewShop({ ...newShop, shopbanner: e.target.value })
                          }
                          required
                        />
                      </div>
                      {/* Shop Logo */}
                      <div className="mb-3">
                        <label className="form-label">Shop Logo (URL)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="https://example.com/logo.jpg"
                          value={newShop.shoplogo}
                          onChange={(e) =>
                            setNewShop({ ...newShop, shoplogo: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-success">
                        Create Shop
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
        </section>
      ))}
    </>
  );
};

const EditProfileSection = ({ userKey }) => {
  const [userData, setUserData] = useState({
    consumerusername: "",
    consumeremail: "",
    consumerbirthdate: "",
    consumerphone: "",
    consumerpassword: "",
    consumerimage: "",
  });
const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user`);
        const user = response.data.find((u) => u.consumerid.toString() === userKey.toString());
        if (user) {
          setUserData({
            consumerusername: user.consumerusername,
            consumeremail: user.consumeremail,
            consumerbirthdate: user.consumerbirthdate.substring(0, 10),
            consumerphone: user.consumerphone,
            consumerpassword: "",
            consumerimage: user.consumerimage,
          });
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, [userKey]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/user/${userKey}`, userData);
      if (response.status === 200) {
        alert("Profile updated successfully!");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <section>
      <h2>Edit Profile</h2>
      <form className="card p-4" onSubmit={handleUpdateProfile}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            className="form-control"
            type="text"
            value={userData.consumerusername}
            onChange={(e) => setUserData({ ...userData, consumerusername: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            value={userData.consumeremail}
            onChange={(e) => setUserData({ ...userData, consumeremail: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Birthdate</label>
          <input
            className="form-control"
            type="date"
            value={userData.consumerbirthdate}
            onChange={(e) => setUserData({ ...userData, consumerbirthdate: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            className="form-control"
            type="text"
            value={userData.consumerphone}
            onChange={(e) =>
              setUserData({ ...userData, consumerphone: e.target.value.trim() })
            }
            pattern="^9[0-9]{9}$"
            maxLength="10"
            title="Please enter exactly 10 digits starting with 9."
            required
          />
        </div>
        <div className="mb-3">
  <label className="form-label">Change Password</label>
  <div className="input-group">
    <input
      className="form-control"
      type={showPassword ? "text" : "password"}
      value={userData.consumerpassword}
      onChange={(e) =>
        setUserData({ ...userData, consumerpassword: e.target.value })
      }
      pattern="^(?=.*[!@#$%^&*])(?=.*\d).{9,}$"
      title="Password must be at least 9 characters long, contain at least 1 digit and 1 special character."
    />
    <button
      type="button"
      className="btn btn-outline-secondary"
      onClick={() => setShowPassword(!showPassword)}
    >
      <i className={ showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
    </button>
  </div>
</div>
        <div className="mb-3">
          <label className="form-label">Profile Picture URL</label>
          <input
            className="form-control"
            type="text"
            value={userData.consumerimage}
            onChange={(e) => setUserData({ ...userData, consumerimage: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-warning">
          Save
        </button>
      </form>
    </section>
  );
};

const AddressSection = ({ userKey }) => {
  const [userAddress, setUserAddress] = useState([]);
  const [editAddress, setEditAddress] = useState(null); // State to hold the address being edited
  const isTTSEnabled = JSON.parse(localStorage.getItem("isTTSEnabled")) || false;
     const speak = (text) => {
      if (!isTTSEnabled) return;
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    };
  const [newAddress, setNewAddress] = useState({
    country: "Philippines", // Default to Philippines
    region: "",
    province: "",
    city: "",
    barangay: "",
    postalcode: "",
    streetname: "",
    building: "",
    housenumber: "",
    userkey: userKey,
  });

  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [citiesAndMunicipalities, setCitiesAndMunicipalities] = useState([]);
  const [barangays, setBarangays] = useState([]);

  // Fetch addresses from the database and filter by userKey
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/address");
        const filteredAddresses = response.data.filter(
          (address) => address.userkey.toString() === userKey.toString()
        );
        setUserAddress(filteredAddresses);
      } catch (err) {
        console.error("Error fetching addresses:", err);
      }
    };
    fetchAddresses();
  }, [userKey]);

  // Fetch regions on component mount
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get("https://psgc.cloud/api/regions");
        setRegions(response.data);
      } catch (err) {
        console.error("Error fetching regions:", err);
      }
    };
    fetchRegions();
  }, []);

  // Fetch provinces when a region is selected
  useEffect(() => {
    if (newAddress.region) {
      const fetchProvinces = async () => {
        try {
          const response = await axios.get(
            `https://psgc.cloud/api/regions/${newAddress.region}/provinces`
          );
          setProvinces(response.data);
        } catch (err) {
          console.error("Error fetching provinces:", err);
        }
      };
      fetchProvinces();
    } else {
      setProvinces([]);
      setCitiesAndMunicipalities([]);
      setBarangays([]);
    }
  }, [newAddress.region]);

  // Fetch cities and municipalities when a province is selected
  useEffect(() => {
    if (newAddress.province) {
      const fetchCitiesAndMunicipalities = async () => {
        try {
          const [citiesResponse, municipalitiesResponse] = await Promise.all([
            axios.get(`https://psgc.cloud/api/provinces/${newAddress.province}/cities`),
            axios.get(`https://psgc.cloud/api/provinces/${newAddress.province}/municipalities`),
          ]);

          // Combine cities and municipalities into one array
          const combined = [
            ...citiesResponse.data.map((city) => ({ ...city, type: "City" })),
            ...municipalitiesResponse.data.map((municipality) => ({
              ...municipality,
              type: "Municipality",
            })),
          ];

          setCitiesAndMunicipalities(combined);
        } catch (err) {
          console.error("Error fetching cities and municipalities:", err);
        }
      };
      fetchCitiesAndMunicipalities();
    } else {
      setCitiesAndMunicipalities([]);
      setBarangays([]);
    }
  }, [newAddress.province]);

  // Fetch barangays when a city/municipality is selected
  useEffect(() => {
    if (newAddress.city) {
      const fetchBarangays = async () => {
        try {
          const response = await axios.get(
            `https://psgc.cloud/api/cities-municipalities/${newAddress.city}/barangays`
          );
          setBarangays(response.data);
        } catch (err) {
          console.error("Error fetching barangays:", err);
        }
      };
      fetchBarangays();
    } else {
      setBarangays([]);
    }
  }, [newAddress.city]);

  const handleAddAddress = async (e) => {
    e.preventDefault();

    // Map codes to names
    const regionName = regions.find((region) => region.code === newAddress.region)?.name || "";
    const provinceName = provinces.find((province) => province.code === newAddress.province)?.name || "";
    const cityName = citiesAndMunicipalities.find((city) => city.code === newAddress.city)?.name || "";
    const barangayName = barangays.find((barangay) => barangay.code === newAddress.barangay)?.name || "";

    const addressToSubmit = {
      ...newAddress,
      region: regionName,
      province: provinceName,
      city: cityName,
      barangay: barangayName,
    };

    try {
      const response = await axios.post("http://localhost:3000/api/address", addressToSubmit);
      if (response.status === 200) {
        setUserAddress([...userAddress, response.data]);
        setNewAddress({
          country: "Philippines",
          region: "",
          province: "",
          city: "",
          barangay: "",
          postalcode: "",
          streetname: "",
          building: "",
          housenumber: "",
          userkey: userKey,
        });
        alert("Address added successfully!");
      }
    } catch (err) {
      console.error("Error adding address:", err);
      alert("Failed to add address. Please try again.");
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/address/${addressId}`);
      if (response.status === 200) {
        // Remove the deleted address from the state
        setUserAddress(userAddress.filter((address) => address.addressid !== addressId));
        alert("Address deleted successfully!");
      }
    } catch (err) {
      console.error("Error deleting address:", err);
      alert("Failed to delete address. Please try again.");
    }
  };

  return (
    <section>
      <div className="row d-flex mb-3">
         <div className="col">
            <h2>My Addresses</h2>
        </div>
        <div className="col text-end">
          <button
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#addAddressModal"
            onClick={() => speak("Adding Address")}
          >
            Add Address
          </button>
        </div>
      </div>
      {userAddress.length === 0 ? (
        <div className="card p-4">
          <p>No addresses registered yet.</p>
        </div>
      ) : (
        userAddress.map((address) => (
          <div className="card p-4 mb-3 shadow-sm" key={address.addressid}>
            <div className="d-flex justify-content-between align-items-center">
              <span  onClick={() => speak(address.housenumber + " " + address.building + ", " + address.streetname + ", " + address.barangay + ", " + address.city + ", " + address.province + ", " + address.region + ", " + address.postalcode + ", " + address.country)}>  
                {address.housenumber} {address.building}, {address.streetname}, {address.barangay},{" "}
                {address.city}, {address.province}, {address.region}, {address.postalcode},{" "}
                {address.country}
              </span>
          
                <div className="col text-end pe-1">
                  <button
                className="btn btn-sm btn-danger me-2 p-2 px-3"
                onClick={() => {handleDeleteAddress(address.addressid); speak("Address deleted successfully");} }
                  >
                    ✕
                  </button>
                  <button
                    className="btn btn-sm btn-warning  p-2 px-3 "
                    onClick={() => {setEditAddress(address); speak("Editing Address")}} // Open the edit modal
                    data-bs-toggle="modal"
                    data-bs-target="#editAddressModal"
                  >
                    ✎
                  </button>
                </div>
               
              
              
            </div>
          </div>
        ))
      )}

      {/* Add Address Modal */}
      <div
        className="modal fade"
        id="addAddressModal"
        tabIndex="-1"
        aria-labelledby="addAddressModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleAddAddress}>
            <div className="modal-header">
              <h5 className="modal-title" id="addAddressModalLabel">
                Add Address
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                {/* Region Dropdown */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Region</label>
                  <select
                    className="form-select"
                    value={newAddress.region}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        region: e.target.value,
                        province: "",
                        city: "",
                        barangay: "",
                      })
                    }
                    required
                  >
                    <option value="">Select Region</option>
                    {regions.map((region) => (
                      <option key={region.code} value={region.code}>
                        {region.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Province Dropdown */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Province</label>
                  <select
                    className="form-select"
                    value={newAddress.province}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        province: e.target.value,
                        city: "",
                        barangay: "",
                      })
                    }
                    required
                    disabled={!newAddress.region}
                  >
                    <option value="">Select Province</option>
                    {provinces.map((province) => (
                      <option key={province.code} value={province.code}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* City/Municipality Dropdown */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">City/Municipality</label>
                  <select
                    className="form-select"
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value, barangay: "" })
                    }
                    required
                    disabled={!newAddress.province}
                  >
                    <option value="">Select City/Municipality</option>
                    {citiesAndMunicipalities.map((item) => (
                      <option key={item.code} value={item.code}>
                        {item.name} ({item.type})
                      </option>
                    ))}
                  </select>
                </div>
                {/* Barangay Dropdown */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Barangay</label>
                  <select
                    className="form-select"
                    value={newAddress.barangay}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, barangay: e.target.value })
                    }
                    required
                    disabled={!newAddress.city}
                  >
                    <option value="">Select Barangay</option>
                    {barangays.map((barangay) => (
                      <option key={barangay.code} value={barangay.code}>
                        {barangay.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Additional Fields */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Postal Code</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newAddress.postalcode}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, postalcode: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Street Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newAddress.streetname}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, streetname: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Building</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newAddress.building}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, building: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">House Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newAddress.housenumber}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, housenumber: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-success">
                Add Address
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Edit Address Modal */}
      {editAddress && (
        <AddressEditSection
          address={editAddress}
          setEditAddress={setEditAddress}
          userAddress={userAddress}
          setUserAddress={setUserAddress}
        />
      )}
    </section>
  );
};

const AddressEditSection = ({ address, setEditAddress, userAddress, setUserAddress }) => {
  const [editedAddress, setEditedAddress] = useState({ ...address });
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [citiesAndMunicipalities, setCitiesAndMunicipalities] = useState([]);
  const [barangays, setBarangays] = useState([]);

  // Fetch regions on component mount
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get("https://psgc.cloud/api/regions");
        setRegions(response.data);
      } catch (err) {
        console.error("Error fetching regions:", err);
      }
    };
    fetchRegions();
  }, []);

  // Fetch provinces when a region is selected
  useEffect(() => {
    if (editedAddress.region) {
      const fetchProvinces = async () => {
        try {
          const response = await axios.get(
            `https://psgc.cloud/api/regions/${editedAddress.region}/provinces`
          );
          setProvinces(response.data);
        } catch (err) {
          console.error("Error fetching provinces:", err);
        }
      };
      fetchProvinces();
    } else {
      setProvinces([]);
      setCitiesAndMunicipalities([]);
      setBarangays([]);
    }
  }, [editedAddress.region]);

  // Fetch cities and municipalities when a province is selected
  useEffect(() => {
    if (editedAddress.province) {
      const fetchCitiesAndMunicipalities = async () => {
        try {
          const [citiesResponse, municipalitiesResponse] = await Promise.all([
            axios.get(`https://psgc.cloud/api/provinces/${editedAddress.province}/cities`),
            axios.get(`https://psgc.cloud/api/provinces/${editedAddress.province}/municipalities`),
          ]);

          // Combine cities and municipalities into one array
          const combined = [
            ...citiesResponse.data.map((city) => ({ ...city, type: "City" })),
            ...municipalitiesResponse.data.map((municipality) => ({
              ...municipality,
              type: "Municipality",
            })),
          ];

          setCitiesAndMunicipalities(combined);
        } catch (err) {
          console.error("Error fetching cities and municipalities:", err);
        }
      };
      fetchCitiesAndMunicipalities();
    } else {
      setCitiesAndMunicipalities([]);
      setBarangays([]);
    }
  }, [editedAddress.province]);

  // Fetch barangays when a city/municipality is selected
  useEffect(() => {
    if (editedAddress.city) {
      const fetchBarangays = async () => {
        try {
          const response = await axios.get(
            `https://psgc.cloud/api/cities-municipalities/${editedAddress.city}/barangays`
          );
          setBarangays(response.data);
        } catch (err) {
          console.error("Error fetching barangays:", err);
        }
      };
      fetchBarangays();
    } else {
      setBarangays([]);
    }
  }, [editedAddress.city]);

  const handleUpdateAddress = async (e) => {
  e.preventDefault();

  // Map codes to names
  const regionName = regions.find((region) => region.code === editedAddress.region)?.name || "";
  const provinceName = provinces.find((province) => province.code === editedAddress.province)?.name || "";
  const cityName = citiesAndMunicipalities.find((city) => city.code === editedAddress.city)?.name || "";
  const barangayName = barangays.find((barangay) => barangay.code === editedAddress.barangay)?.name || "";

  const updatedAddress = {
    ...editedAddress,
    region: regionName,
    province: provinceName,
    city: cityName,
    barangay: barangayName,
  };

  try {
    const response = await axios.put(
      `http://localhost:3000/api/address/${editedAddress.addressid}`,
      updatedAddress
    );
    if (response.status === 200) {
      const updatedAddresses = userAddress.map((addr) =>
        addr.addressid === editedAddress.addressid ? response.data : addr
      );
      setUserAddress(updatedAddresses);

      // Close the modal programmatically
      const modalElement = document.getElementById("editAddressModal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();

      setEditAddress(null); // Clear the edit state
      alert("Address updated successfully!");
    }
  } catch (err) {
    console.error("Error updating address:", err);
    alert("Failed to update address. Please try again.");
  }
};

  return (
    <div
      className="modal fade"
      id="editAddressModal"
      tabIndex="-1"
      aria-labelledby="editAddressModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <form className="modal-content" onSubmit={handleUpdateAddress}>
          <div className="modal-header">
            <h5 className="modal-title" id="editAddressModalLabel">
              Edit Address
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setEditAddress(null)} // Close the modal
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              {/* Region Dropdown */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Region</label>
                <select
                  className="form-select"
                  value={editedAddress.region}
                  onChange={(e) =>
                    setEditedAddress({
                      ...editedAddress,
                      region: e.target.value,
                      province: "",
                      city: "",
                      barangay: "",
                    })
                  }
                  required
                >
                  <option value="">Select Region</option>
                  {regions.map((region) => (
                    <option key={region.code} value={region.code}>
                      {region.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Province Dropdown */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Province</label>
                <select
                  className="form-select"
                  value={editedAddress.province}
                  onChange={(e) =>
                    setEditedAddress({
                      ...editedAddress,
                      province: e.target.value,
                      city: "",
                      barangay: "",
                    })
                  }
                  required
                  disabled={!editedAddress.region}
                >
                  <option value="">Select Province</option>
                  {provinces.map((province) => (
                    <option key={province.code} value={province.code}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* City/Municipality Dropdown */}
              <div className="col-md-6 mb-3">
                <label className="form-label">City/Municipality</label>
                <select
                  className="form-select"
                  value={editedAddress.city}
                  onChange={(e) =>
                    setEditedAddress({ ...editedAddress, city: e.target.value, barangay: "" })
                  }
                  required
                  disabled={!editedAddress.province}
                >
                  <option value="">Select City/Municipality</option>
                  {citiesAndMunicipalities.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.name} ({item.type})
                    </option>
                  ))}
                </select>
              </div>
              {/* Barangay Dropdown */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Barangay</label>
                <select
                  className="form-select"
                  value={editedAddress.barangay}
                  onChange={(e) =>
                    setEditedAddress({ ...editedAddress, barangay: e.target.value })
                  }
                  required
                  disabled={!editedAddress.city}
                >
                  <option value="">Select Barangay</option>
                  {barangays.map((barangay) => (
                    <option key={barangay.code} value={barangay.code}>
                      {barangay.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Additional Fields */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Postal Code</label>
                <input
                  type="text"
                  className="form-control"
                  value={editedAddress.postalcode}
                  onChange={(e) =>
                    setEditedAddress({ ...editedAddress, postalcode: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Street Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={editedAddress.streetname}
                  onChange={(e) =>
                    setEditedAddress({ ...editedAddress, streetname: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Building</label>
                <input
                  type="text"
                  className="form-control"
                  value={editedAddress.building}
                  onChange={(e) =>
                    setEditedAddress({ ...editedAddress, building: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">House Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={editedAddress.housenumber}
                  onChange={(e) =>
                    setEditedAddress({ ...editedAddress, housenumber: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-warning">
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setEditAddress(null)} // Close the modal
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PaymentSection = ({ userKey }) => {
  const [userEpayment, setUserEpayment] = useState([]);
  const [userCard, setUserCard] = useState([]);
  const [editPayment, setEditPayment] = useState(null); // State to hold the payment being edited
  const isTTSEnabled = JSON.parse(localStorage.getItem("isTTSEnabled")) || false;
    const speak = (text) => {
      if (!isTTSEnabled) return;
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    };
  const [newEwallet, setNewEwallet] = useState({
    epaymenttype: "",
    epaymentphone: "",
    epaymentstatus: true, // Ensure boolean value
    userkey: userKey,
  });

  const formatCardNumber = (number) => {
    const str = number.toString();
    return str.replace(/(\d{4})(?=\d)/g, '$1-');
  };


  const [newCard, setNewCard] = useState({
    bankname: "",
    cardnumber: "",
    expirydate: "", // Ensure correct date format (YYYY-MM-DD)
    cvv: "",
    nameoncard: "",
    card_status: true, // Ensure boolean value
    userkey: userKey,
  });

  const reformatDate = (date) => {
      if (date.includes("-")) {
        const [day, month, year] = date.split("-");
        return `${year}-${month}-${day}`;
      }
      return date;
    };


  useEffect(() => {
    const fetchEpaymentData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/ewallet");
        const filteredEpayments = response.data.filter(
          (ewallet) => ewallet.userkey.toString() === userKey.toString()
        );
        setUserEpayment(filteredEpayments);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchEpaymentData();
  }, [userKey]);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/cards");
        const filteredCards = response.data.filter(
          (card) => card.userkey.toString() === userKey.toString()
        );
        setUserCard(filteredCards);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchCardData();
  }, [userKey]);

  const handleDeleteEwallet = async (epaymentid) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/ewallet/${epaymentid}`);
      if (response.status === 200) {
        setUserEpayment(userEpayment.filter((ewallet) => ewallet.epaymentid !== epaymentid));
        alert("eWallet deleted successfully!");
      }
    } catch (err) {
      console.error("Error deleting eWallet:", err);
      alert("Failed to delete eWallet. Please try again.");
    }
  };

  const handleDeleteCard = async (paymentid) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/cards/${paymentid}`);
      if (response.status === 200) {
        setUserCard(userCard.filter((card) => card.paymentid !== paymentid));
        alert("Card deleted successfully!");
      }
    } catch (err) {
      console.error("Error deleting card:", err);
      alert("Failed to delete card. Please try again.");
    }
  };


  const handleAddEwallet = async (e) => {
    e.preventDefault();
    console.log("Adding eWallet:", newEwallet); // Debugging log
    try {
      const response = await axios.post("http://localhost:3000/api/ewallet", newEwallet);
      if (response.status === 200) {
        setUserEpayment([...userEpayment, response.data]);
        setNewEwallet({
          epaymenttype: "",
          epaymentphone: "",
          epaymentstatus: true, // Reset to boolean
          userkey: userKey,
        });
        alert("eWallet added successfully!");
      }
    } catch (err) {
      console.error("Error adding eWallet:", err);
      alert("Failed to add eWallet. Please try again.");
    }
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    console.log("Adding Card:", newCard); // Debugging log
    try {
      const response = await axios.post("http://localhost:3000/api/cards", {
        ...newCard,
        expirydate: reformatDate(newCard.expirydate), // Ensure correct date format (YYYY-MM-DD)
      });
      if (response.status === 200) {
        setUserCard([...userCard, response.data]);
        setNewCard({
          bankname: "",
          cardnumber: "",
          expirydate: "",
          cvv: "",
          nameoncard: "",
          card_status: true, // Reset to boolean
          userkey: userKey,
        });
        alert("Card added successfully!");
      }
    } catch (err) {
      console.error("Error adding card:", err);
      alert("Failed to add card. Please try again.");
    }
  };

  return (
    <section>
      <h2>Payment Methods</h2>
      <div className="card p-4 mb-4 shadow-lg">
        <h5 className="mb-3">eWallets</h5>
        <ul className="list-group mb-3">
          {userEpayment.map((ewallet) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center shadow-sm"
              key={ewallet.epaymentid}
            >
              <div onClick={() => speak(`eWallet Type: ${ewallet.epaymenttype === 1 ? "GCash" : ewallet.epaymenttype === 2 ? "Maya" : "Others"}, Phone: ${ewallet.epaymentphone}`)}>
                <strong>
                  {ewallet.epaymenttype === 1
                    ? "GCash"
                    : ewallet.epaymenttype === 2
                    ? "Maya"
                    : "Others"}
                </strong>
                <br />
                Phone: {ewallet.epaymentphone}
              </div>
              <div className="col text-end">
              <button className="btn btn-danger me-2 btn-sm"
                      onClick={() => {handleDeleteEwallet(ewallet.epaymentid); speak("Editing eWallet")}}
                      >✕</button>
              <button
                  className="btn btn-sm btn-warning "
                  onClick={() => {setEditPayment({ type: "ewallet", data: ewallet }); speak("Editing eWallet")}}
                  data-bs-toggle="modal"
                  data-bs-target="#editPaymentModal"
               
                >
                  ✎
              </button>
              </div>
              
              
            </li>
          ))}
        </ul>
        <button
          className="btn btn-success btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#addEwalletModal"
          onClick={() => speak("Adding eWallet")}
        >
          Add Wallet
        </button>
      </div>

      <div className="card p-4 shadow-lg">
        <h5 className="mb-3"  onClick={() => speak("Add Debit/Credit Card")}>Credit / Debit Cards</h5>
        <ul className="list-group mb-3">
          {userCard.map((card) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center mb-1"
              key={card.paymentid}
            >
              <div  onClick={() => speak("Bank Name: " + card.bankname + ", Card Number: " + formatCardNumber(card.cardnumber) + ", Expiry Date: " + (card.expirydate).substring(0, 10))}>
                <strong>{card.bankname}</strong>
                <br />
                Card Number: {formatCardNumber(card.cardnumber)}
                <br />
                Expiry: {(card.expirydate).substring(0, 10)}
              </div>
              <div className="col text-end">
                <button className="btn btn-danger btn-sm me-2"
                        onClick={() => {handleDeleteCard(card.paymentid); speak("Card deleted successfully")}}
                >✕
                </button>
                  <button
                  className="btn btn-sm btn-warning "
                  onClick={() => {setEditPayment({ type: "card", data: card }); speak("Editing Card")}}
                  data-bs-toggle="modal"
                  data-bs-target="#editPaymentModal"
                >
                  ✎
                </button>
                
              </div>
               
            </li>
          ))}
        </ul>
        <button
          className="btn btn-success btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#addCardModal"
           onClick={() => speak("Adding Debit/Credit Card")}
        >
          Add Card
        </button>
      </div>

      {/* Add eWallet Modal */}
      <div
        className="modal fade"
        id="addEwalletModal"
        tabIndex="-1"
        aria-labelledby="addEwalletModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleAddEwallet}>
            <div className="modal-header">
              <h5 className="modal-title" id="addEwalletModalLabel">
                Add eWallet
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">eWallet Type</label>
                <select
                  className="form-select"
                  value={newEwallet.epaymenttype}
                  onChange={(e) =>
                    setNewEwallet({ ...newEwallet, epaymenttype: parseInt(e.target.value) })
                  }
                  required
                >
                  <option value="">Select eWallet Type</option>
                  <option value="1">GCash</option>
                  <option value="2">Maya</option>
                  <option value="3">Others</option>
                </select>
              </div>
              <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={newEwallet.epaymentphone}
                    onChange={(e) =>
                      setNewEwallet({ ...newEwallet, epaymentphone: e.target.value.trim() })
                    }
                    pattern="^9[0-9]{9}$"
                    maxLength="10"
                    title="Please enter exactly 10 digits starting with 9."
                    required
                  />
                </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-warning" onClick={() => speak("Added eWallet Succesfully")}>
                Add Wallet
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Add Card Modal */}
      <div
        className="modal fade"
        id="addCardModal"
        tabIndex="-1"
        aria-labelledby="addCardModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleAddCard}>
            <div className="modal-header">
              <h5 className="modal-title" id="addCardModalLabel" >
                Add Debit/Credit Card
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Bank Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={newCard.bankname}
                  onChange={(e) =>
                    setNewCard({ ...newCard, bankname: e.target.value })
                  }
                  required
                />
              </div>
             
                <div className="mb-3">
                  <label className="form-label">Card Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newCard.cardnumber}
                    onChange={(e) =>
                      setNewCard({ ...newCard, cardnumber: e.target.value })
                    }
                    pattern="\d{16}"
                    maxLength="16"
                    title="Please enter exactly 16 digits."
                    required
                  />
                </div>
              <div className="mb-3">
                <label className="form-label">Expiry Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={newCard.expirydate}
                  onChange={(e) =>
                    setNewCard({ ...newCard, expirydate: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">CVV</label>
                <input
                  type="password"
                  className="form-control"
                  value={newCard.cvv}
                  onChange={(e) =>
                    setNewCard({ ...newCard, cvv: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Name on Card</label>
                <input
                  type="text"
                  className="form-control"
                  value={newCard.nameoncard}
                  onChange={(e) =>
                    setNewCard({ ...newCard, nameoncard: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-warning">
                Add Card
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      {editPayment && (
        <EditPaymentSection
          payment={editPayment}
          setEditPayment={setEditPayment}
          userEpayment={userEpayment}
          setUserEpayment={setUserEpayment}
          userCard={userCard}
          setUserCard={setUserCard}
        />
      )}
    </section>
  );
};

const EditPaymentSection = ({
  payment,
  setEditPayment,
  userEpayment,
  setUserEpayment,
  userCard,
  setUserCard,
}) => {
  const [editedPayment, setEditedPayment] = useState({ ...payment.data });

  const handleUpdatePayment = async (e) => {
    e.preventDefault();

    try {
      if (payment.type === "ewallet") {
        const response = await axios.put(
          `http://localhost:3000/api/ewallet/${editedPayment.epaymentid}`,
          editedPayment
        );
        if (response.status === 200) {
          const updatedEpayments = userEpayment.map((ewallet) =>
            ewallet.epaymentid === editedPayment.epaymentid ? response.data : ewallet
          );
          setUserEpayment(updatedEpayments);
        }
      } else if (payment.type === "card") {
        const response = await axios.put(
          `http://localhost:3000/api/cards/${editedPayment.paymentid}`,
          editedPayment
        );
        if (response.status === 200) {
          const updatedCards = userCard.map((card) =>
            card.paymentid === editedPayment.paymentid ? response.data : card
          );
          setUserCard(updatedCards);
        }
      }

      // Close the modal programmatically
      const modalElement = document.getElementById("editPaymentModal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();

      setEditPayment(null); // Clear the edit state
      alert("Payment method updated successfully!");
    } catch (err) {
      console.error("Error updating payment method:", err);
      alert("Failed to update payment method. Please try again.");
    }
  };

  return (
    <div
      className="modal fade"
      id="editPaymentModal"
      tabIndex="-1"
      aria-labelledby="editPaymentModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <form className="modal-content" onSubmit={handleUpdatePayment}>
          <div className="modal-header">
            <h5 className="modal-title" id="editPaymentModalLabel">
              Edit {payment.type === "ewallet" ? "eWallet" : "Card"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setEditPayment(null)}
            ></button>
          </div>
          <div className="modal-body">
            {payment.type === "ewallet" ? (
              <>
                <div className="mb-3">
                  <label className="form-label">eWallet Type</label>
                  <select
                    className="form-select"
                    value={editedPayment.epaymenttype}
                    onChange={(e) =>
                      setEditedPayment({ ...editedPayment, epaymenttype: parseInt(e.target.value) })
                    }
                    required
                  >
                    <option value="">Select eWallet Type</option>
                    <option value="1">GCash</option>
                    <option value="2">Maya</option>
                    <option value="3">Others</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={editedPayment.epaymentphone}
                    onChange={(e) =>
                      setEditedPayment({
                        ...editedPayment,
                        epaymentphone: e.target.value.trim(),
                      })
                    }
                    pattern="^9[0-9]{9}$"
                    maxLength="10"
                    title="Please enter exactly 10 digits starting with 9."
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  <label className="form-label">Bank Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editedPayment.bankname}
                    onChange={(e) =>
                      setEditedPayment({ ...editedPayment, bankname: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Card Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editedPayment.cardnumber}
                    onChange={(e) =>
                      setEditedPayment({ ...editedPayment, cardnumber: e.target.value })
                    }
                    pattern="^\d{16}$"
                    maxLength="16"
                    title="Please enter exactly 16 digits."
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Expiry Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={editedPayment.expirydate}
                    onChange={(e) =>
                      setEditedPayment({ ...editedPayment, expirydate: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">CVV</label>
                  <input
                    type="password"
                    className="form-control"
                    value={editedPayment.cvv}
                    onChange={(e) =>
                      setEditedPayment({ ...editedPayment, cvv: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Name on Card</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editedPayment.nameoncard}
                    onChange={(e) =>
                      setEditedPayment({ ...editedPayment, nameoncard: e.target.value })
                    }
                    required
                  />
                </div>
              </>
            )}
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-warning">
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setEditPayment(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PurchaseSection = ({ userKey, status, productStatus }) => {
  const purchasekey = userKey;
  const [userPurchase, setUserPurchase] = useState([]);
  const [productData, setProductData] = useState([]);
  const [variationData, setVariationData] = useState([]); 
  const navigate = useNavigate();
  
  const isTTSEnabled = JSON.parse(localStorage.getItem("isTTSEnabled")) || false;
    const speak = (text) => {
      if (!isTTSEnabled) return;
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    };

  
  useEffect(() => {
    const fetchUserPurchase = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/pstatus');
        setUserPurchase(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchUserPurchase();
  }, []);
  
  useEffect(() => {
    const fetchVariationData = async () => { 
      try {
        const response = await axios.get('http://localhost:3000/api/variation');
        setVariationData(response.data);
      } catch (err) {
        console.error(err.message); 
      }
    }; fetchVariationData();
  }, []);  

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/product');
        setProductData(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchProductData();
  }, []);

  const handleCancelOrder = async (purchaseId) => {
  try {
    const response = await axios.put(`http://localhost:3000/api/pstatus/cancel/${purchaseId}`, {
      pstatus: 5, // Set pstatus to 5 (Cancelled)
    });

    if (response.status === 200) {
      // Update the local state to reflect the change
      setUserPurchase((prevPurchases) =>
        prevPurchases.map((purchase) =>
          purchase.id === purchaseId ? { ...purchase, pstatus: 5 } : purchase
        )
      );
      alert("Order cancelled successfully!");
       window.location.reload();
    }
  } catch (err) {
    console.error("Error cancelling order:", err.message);
    alert("Failed to cancel order. Please try again.");
  }
};

const handlePaynow = async (purchaseId) => {
  try {
    const response = await axios.put(`http://localhost:3000/api/pstatus/pay/${purchaseId}`, {
      pstatus: 2, // Set pstatus to 2 (To Ship)
    });

    if (response.status === 200) {
      // Update the local state to reflect the change
      setUserPurchase((prevPurchases) =>
        prevPurchases.map((purchase) =>
          purchase.id === purchaseId ? { ...purchase, pstatus: 2 } : purchase
        )
      );
      alert("Order paid successfully!");
      window.location.reload(); // Refresh the page to reflect changes
    }
  } catch (err) {
    console.error("Error paying order:", err.message);
    alert("Failed to pay order. Please try again.");
  }
};

const handlebuyagain = async (productID) => {
  
  navigate(`/products/${productID}`);
};


  

  // Filter purchases by userKey and pstatus, then enrich with product details
  const enrichedPurchases = userPurchase
  .filter(
    (purchase) =>
      purchase.userkey.toString() === purchasekey.toString() &&
      purchase.pstatus === status
  )
  .map((purchase) => {
    const product = productData.find((p) => p.pid === purchase.productkey);
    const variation = variationData.find((v) => v.pvid === purchase.variation);
    return {
      purchase,
      productName: product?.pname || "Unknown Product",
      productID: product?.pid,
      productPrice: purchase.parcelcost || 0, 
      shippinglocation: purchase.shipaddress,
      contactinfo: purchase.contactinfo,
      productImage: product?.pimageurl || "https://via.placeholder.com/150",
      itemQuantity: purchase.itemquantity || 1,
      variation: variation?.pvname || "No Variation",
    };
  });
  return (
    <section>
      <h2>{productStatus}</h2>
      {enrichedPurchases.length > 0 ? (
        enrichedPurchases.map((purchase) => (
          <div className="card mb-3 p-3" key={purchase.id} onClick={() => speak(`Product Name: ${purchase.productName}, Price: ₱${purchase.productPrice}, Quantity: ${purchase.itemQuantity}, Variation: ${purchase.variation}, Contact: ${purchase.contactinfo}, Shipping Address: ${purchase.shippinglocation}`)}>
            <div className="row g-3 align-items-center">
              <div className="col-md-2">
                <img
                  style={{ minHeight: "5rem", maxHeight: "5rem" }}
                  src={purchase.productImage}
                  className="img-fluid rounded"
                  alt={purchase.productName}
                />
              </div>
              <div className="col-md-7">
                <h6 className="mb-1" style={{fontSize:"20px"}}>{purchase.productName}</h6>
                <p className="mb-0 text-muted" style={{fontSize: "12px"}}>
                  Variation: {purchase.variation }
                </p>
                <p className="mb-0 text-muted" style={{fontSize: "12px"}}>
                  Quantity: {purchase.itemQuantity || 1}x

                </p>
                <p className="mb-0 text-muted" style={{fontSize: "12px"}}>
                  Contact: {purchase.contactinfo } <br/>
                  Shipping Address: {purchase.shippinglocation }
                </p>
              </div>
              <div className="col-md-3 text-end">
                <p className="mb-2 fw-bold fs-5">
                  ₱{purchase.productPrice}
                </p>
                <div className="col">

                  
                  {(status === 2) && (
                  <button className="btn btn-outline-secondary btn-sm px-2 mb-1">
                    Track Order
                  </button>
                )} <br/>

                
                
                 {(status === 1 || status === 2) && (
                  <button className="btn btn-outline-danger btn-sm px-1 mb-1"
                          onClick={() => {handleCancelOrder(purchase.purchase.pstatusid); speak("Order cancelled successfully")}}
                          >
                    Cancel Order
                  </button>
                )}
                
                {(status === 4 || status === 5) && (
                  <button className="btn btn-outline-primary btn-sm"
                          onClick={() => {handlebuyagain(purchase.productID); speak("Buying again")}}>
                    Buy Again
                  </button>
                )}
                  <br/>
                {(status === 1) && (
                  <button className="btn btn-outline-success btn-sm px-2 mb-1"
                  onClick={() => {handlePaynow(purchase.purchase.pstatusid); speak("Order paid successfully")}}>
                    Pay product
                  </button>
                )}
                </div>
                
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="card p-4">
          <p>No items in this section yet.</p>
        </div>
      )}
    </section>
  );
};

const ProfilePage = (profilekey) => {
  const [active, setActive] = useState("profile");
  let userkey = profilekey.userkey;
 
  
  
  return (
    <div className="container-fluid bg-light " >
      <div className="row min-vh-100 " style={{backgroundColor: "#eaecfe"}}>
        <nav className="col-md-3 col-lg-2 d-md-block border-end pt-4 "style={{backgroundColor: "#eaecfe"}} >
          <div className="px-3 "  >
            <h5 className="fw-bold" >Account</h5>
            <ul className="nav flex-column mb-4">
              <li className="nav-item ">
                <button
                  className="nav-link btn btn-link text-start"
                  onClick={() => setActive("profile")}
                >
                  Profile
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-start"
                  onClick={() => setActive("address")}
                >
                  Address
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-start"
                  onClick={() => setActive("payment")}
                >
                  Payment
                </button>
              </li>
            </ul>
            <h5 className="fw-bold">Purchases</h5>
            <ul className="nav flex-column">
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-start"
                  onClick={() => setActive("toPay")}
                >
                  To Pay
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-start"
                  onClick={() => setActive("toShip")}
                >
                  To Ship
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-start"
                  onClick={() => setActive("toReceive")}
                >
                  To Receive
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-start"
                  onClick={() => setActive("completed")}
                >
                  Completed
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-start"
                  onClick={() => setActive("cancelled")}
                >
                  Cancelled
                </button>
              </li>
            </ul>
            
          </div>
        </nav>

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
          {active === "profile" && (
            <ProfileSection
              onEdit={() => setActive("editProfile")}
              userKey={userkey}
            />
          )}
          {active === "editProfile" && <EditProfileSection userKey={userkey} />}
          {active === "address" && <AddressSection userKey={userkey} />}
          {active === "payment" && <PaymentSection userKey={userkey} />}
          {active === "toPay" && <PurchaseSection userKey={userkey} status={1} productStatus={"To Pay"} />}
          {active === "toShip" && <PurchaseSection userKey={userkey} status={2} productStatus={"To Ship"} />}
          {active === "toReceive" && <PurchaseSection userKey={userkey} status={3} productStatus={"To Receive"} />}
          {active === "completed" && <PurchaseSection userKey={userkey} status={4} productStatus={"Completed"} />}
          {active === "cancelled" && <PurchaseSection userKey={userkey} status={5} productStatus={"Cancelled"} />}
        </main>
      </div>
    </div>
  );
};