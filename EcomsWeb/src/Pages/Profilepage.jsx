import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { use } from "react";

export function Profilepage(){
   const userkey = localStorage.getItem("userkey");
   let profilekey = userkey;
    return(
        <>
        
        <Navbar/>
        <div className="container">
            <ProfilePage userkey={profilekey}/>
        </div>

        <Footer/>
        </>
    );
}


const ProfileSection = ({ onEdit, userKey }) => {
  const [userData, setUserdata] = useState([]);
  let userkey = userKey;

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
          <div className="card p-4">
            <div className="d-flex justify-content-between mb-4">
              <div className="profile-info">
                <div className="d-flex align-items-center mb-4">
                  <img
                    src={userInfo.consumerimage || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}
                    className="rounded-circle me-3"
                    width="100"
                    height="100"
                    alt="Profile"
                  />
                  <div>
                    <h5 className="mb-0 fw-bold">{userInfo.consumerfirstname}</h5>
                  </div>
                </div>
                <p><strong>Username:</strong> {userInfo.consumerusername}</p>
                <p><strong>Email:</strong> {userInfo.consumeremail}</p>
                <p><strong>Birthdate:</strong> {userInfo.consumerbirthdate.substring(0, 10)}</p>
                <p><strong>Phone Number:</strong> {userInfo.consumerphone}</p>
              </div>
              <div>
                <button onClick={onEdit} className="btn btn-warning"><i class="bi bi-pencil-square"></i></button>
                <button
                    className="btn btn-danger text-start ms-2"
                   
                    onClick={() => {
                      localStorage.setItem("userkey", "0");
                      window.location.href = "/";
                    }}
                    >
                    Logout
                </button>
              </div>
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
            onChange={(e) => setUserData({ ...userData, consumerphone: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Change Password</label>
          <input
            className="form-control"
            type="password"
            value={userData.consumerpassword}
            onChange={(e) => setUserData({ ...userData, consumerpassword: e.target.value })}
          />
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
  const [newAddress, setNewAddress] = useState({
    country: "",
    region: "",
    province: "",
    city: "",
    barangay: "",
    postalcode: "",
    streetname: "",
    building: "",
    housenumber: "",
    userkey: userKey, // Associate the address with the logged-in user
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/address");
        setUserAddress(response.data);
      } catch (err) {
        console.error("Error fetching addresses:", err);
      }
    };
    fetchAddresses();
  }, []);

  const handleAddAddress = async (e) => {
    e.preventDefault();

    if (!newAddress.country && !newAddress.province) {
      alert("Either Country or Province must be provided.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/address", newAddress);
      if (response.status === 200) {
        setUserAddress([...userAddress, response.data]); // Update the address list
        setNewAddress({
          country: "",
          region: "",
          province: "",
          city: "",
          barangay: "",
          postalcode: "",
          streetname: "",
          building: "",
          housenumber: "",
          userkey: userKey,
        }); // Reset the form
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
      setUserAddress(userAddress.filter((address) => address.addressid !== addressId)); // Use addressid instead of id
      alert("Address deleted successfully!");
    }
  } catch (err) {
    console.error("Error deleting address:", err);
    alert("Failed to delete address. Please try again.");
  }
};

  const filtered = userAddress.filter((u) =>
    u.userkey.toString().includes(userKey?.toString())
  );

  return (
    <section>
      <div className="row d-flex mb-3">
        <div className="col">
          <h2>My Addresses</h2>
        </div>
        <div className="col text-end">
          <button
            className="btn btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#addAddressModal"
          >
            Add Address
          </button>
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className="card p-4">
          <p>No addresses registered yet.</p>
        </div>
      ) : (
        filtered.map((address) => (
          <div className="card p-4 mb-3" key={address.id}>
            <div className="d-flex justify-content-between align-items-center p-2 mb-2">
              <span>
                {address.housenumber} {address.building}, {address.streetname}, {address.barangay}, {address.city}, {address.province}, {address.region}, {address.postalcode}, {address.country}
              </span>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDeleteAddress(address.addressid)}
              >
                ✕
              </button>
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
                <div className="col-md-4 mb-3">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newAddress.country}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, country: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Region</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newAddress.region}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, region: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Province</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newAddress.province}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, province: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Barangay</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newAddress.barangay}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, barangay: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Postal Code</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newAddress.postalcode}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, postalcode: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Street Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newAddress.streetname}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, streetname: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4 mb-3">
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
                <div className="col-md-4 mb-3">
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
              <button type="submit" className="btn btn-warning">
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
    </section>
  );
};

const PaymentSection = ({ userKey }) => {
  const [userEpayment, setUserEpayment] = useState([]);
  const [userCard, setUserCard] = useState([]);
  const [newEwallet, setNewEwallet] = useState({
    epaymenttype: "",
    epaymentphone: "",
    epaymentstatus: true, // Ensure boolean value
    userkey: userKey,
  });

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
      <div className="card p-4 mb-4">
        <h5 className="mb-3">eWallets</h5>
        <ul className="list-group mb-3">
          {userEpayment.map((ewallet) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={ewallet.epaymentid}
            >
              <div>
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
              <button className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDeleteEwallet(ewallet.epaymentid)}
                      >✕</button>
            </li>
          ))}
        </ul>
        <button
          className="btn btn-outline-primary btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#addEwalletModal"
        >
          Add Wallet
        </button>
      </div>

      <div className="card p-4">
        <h5 className="mb-3">Credit / Debit Cards</h5>
        <ul className="list-group mb-3">
          {userCard.map((card) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={card.paymentid}
            >
              <div>
                <strong>{card.bankname}</strong>
                <br />
                Card Number: {card.cardnumber}
                <br />
                Expiry: {(card.expirydate).substring(0, 10)}
              </div>
              <button className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDeleteCard(card.paymentid)}
              >✕</button>
            </li>
          ))}
        </ul>
        <button
          className="btn btn-outline-primary btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#addCardModal"
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
                  type="text"
                  className="form-control"
                  value={newEwallet.epaymentphone}
                  onChange={(e) =>
                    setNewEwallet({ ...newEwallet, epaymentphone: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-warning">
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
              <h5 className="modal-title" id="addCardModalLabel">
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
    </section>
  );
};


const PurchaseSection = ({ userKey, status, productStatus }) => {
  const purchasekey = userKey;
  const [userPurchase, setUserPurchase] = useState([]);
  const [productData, setProductData] = useState([]);
  const [variationData, setVariationData] = useState([]); 

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
        productPrice: (product?.pprice * purchase.itemquantity) || 0,
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
          <div className="card mb-3 p-3" key={purchase.id}>
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
                <h6 className="mb-1">{purchase.productName}</h6>
                <p className="mb-0 text-muted">
                  Variation: {purchase.variation }
                </p>
                <p className="mb-0 text-muted">
                  Quantity: {purchase.itemQuantity || 1}
                </p>
              </div>
              <div className="col-md-3 text-end">
                <p className="mb-2 fw-bold fs-5">
                  ₱{purchase.productPrice.toFixed(2)}
                </p>
                {status === 1 && (
                  <button className="btn btn-outline-secondary btn-sm">
                    Track Order
                  </button>
                )}
                {(status === 4 || status === 5) && (
                  <button className="btn btn-outline-primary btn-sm">
                    Buy Again
                  </button>
                )}
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
    <div className="container-fluid bg-light">
      <div className="row min-vh-100">
        <nav className="col-md-3 col-lg-2 d-md-block bg-white border-end pt-4">
          <div className="px-3">
            <h5 className="fw-bold">Account</h5>
            <ul className="nav flex-column mb-4">
              <li className="nav-item">
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