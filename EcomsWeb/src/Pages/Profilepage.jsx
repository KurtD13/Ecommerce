import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { use } from "react";

export function Profilepage(){
  let profilekey = 14;
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
                    src="https://i.redd.it/bcyq3rjk2w071.png"
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
                <button onClick={onEdit} className="btn btn-warning">Edit Profile</button>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

const EditProfileSection = () => (
  <section>
    <h2>Edit Profile</h2>
    <form className="card p-4">
      <input className="form-control mb-3" type="text" placeholder="Username" />
      <input className="form-control mb-3" type="email" placeholder="Email" />
      <input className="form-control mb-3" type="date" />
      <input className="form-control mb-3" type="text" placeholder="Phone Number" />
      <div className="mb-3">
        <label className="form-label me-3"><input type="radio" name="gender" /> Male</label>
        <label className="form-label me-3"><input type="radio" name="gender" /> Female</label>
        <label className="form-label"><input type="radio" name="gender" /> Other</label>
      </div>
      <button type="submit" className="btn btn-warning">Save</button>
    </form>
  </section>
);

const AddressSection = ({ userKey }) => {
  const [userAddress, setUseraddress] = useState([]);
  let addresskey = userKey;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/address');
        setUseraddress(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, []);

  const filtered = userAddress.filter((u) =>
    u.userkey.toString().includes(addresskey?.toString())
  );

  if (!addresskey || filtered.length === 0) {
    return (
      <section>
        <h2>My Addresses</h2>
        <div className="card p-4">
          <p>Please Login</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2>My Addresses</h2>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-warning">New Address</button>
      </div>
      {filtered.map((address) => (
        <div className="card p-4 mb-3" key={address.id}>
          <div className="d-flex justify-content-between align-items-center p-2 mb-2">
            <span>
              {address.housenumber} {address.building}. {address.street} {address.barangay}, {address.city}, {address.province}, {address.region} {address.postalcode}, {address.country}
            </span>
            <button className="btn btn-sm btn-danger">✕</button>
          </div>
        </div>
      ))}
    </section>
  );
};

const PaymentSection = ({ userKey }) => {
  let paymentkey = userKey;

  const [userEpayment, setUserEpayment] = useState([]);
  const [userCard, setUserCard] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/ewallet');
        setUserEpayment(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/cards');
        setUserCard(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, []);

  const filteredEpayment = userEpayment.filter((u) =>
    u.userkey.toString().includes(paymentkey?.toString())
  );

  const filteredCard = userCard.filter((u) =>
    u.userkey.toString().includes(paymentkey?.toString())
  );

  if (!paymentkey || (filteredEpayment.length === 0 && filteredCard.length === 0)) {
    return (
      <section>
        <h2>Payment Methods</h2>
        <div className="card p-4">
          <p>Please Login</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2>Payment Methods</h2>
      <div className="card p-4 mb-4 d-flex flex-column">
        <h5 className="mb-3">eWallets</h5>
        <ul className="list-group mb-3">
          {filteredEpayment.map((ewallet) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={ewallet.id}
            >
              <div>
                <strong>{ewallet.ewalletname}</strong>
                <br />
                Number: 0{ewallet.epaymentphone}
                <br />
              </div>
              <button className="btn btn-outline-danger">✕</button>
            </li>
          ))}
        </ul>
        <button
          className="btn btn-outline-primary btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#eWalletModal"
        >
          Add eWallet
        </button>
      </div>

      <div className="card p-4 d-flex flex-column">
        <h5 className="mb-3">Credit / Debit Cards</h5>
        <ul className="list-group mb-3">
          {filteredCard.map((card) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={card.id}
            >
              <div>
                <strong>{card.bankname} </strong>
                <br />
                Account Name: {card.nameoncard}
                <br />
                Card Number: {card.cardnumber}
                <br />
                Exp: {card.expirydate.substring(0, 10)}
                <br />
              </div>
              <button className="btn btn-outline-danger">✕</button>
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

      {/* eWallet Modal */}
      <div
        className="modal fade"
        id="eWalletModal"
        tabIndex="-1"
        aria-labelledby="eWalletModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Select an eWallet</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <button className="btn btn-outline-primary w-100 mb-2">
                GCash
              </button>
              <button className="btn btn-outline-primary w-100 mb-2">
                Maya
              </button>
              <button className="btn btn-outline-primary w-100">Others</button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
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
          <form className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Debit/Credit Card</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Card Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Name on Card</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Expiration Date</label>
                <input type="month" className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">CVV</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="123"
                  maxLength="4"
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