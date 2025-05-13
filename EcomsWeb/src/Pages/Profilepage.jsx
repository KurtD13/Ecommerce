import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import React, { useState } from 'react';

export function Profilepage(){
    return(
        <>
        
        <Navbar/>
        <div className="container">
            <ProfilePage />
        </div>
        
        <Footer/>
        </>
    );
}


const ProfileSection = ({ onEdit }) => (
  <section>
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
              <h5 className="mb-0 fw-bold">user123</h5>
            </div>
          </div>
          <p><strong>Username:</strong> user123</p>
          <p><strong>Email:</strong> user@example.com</p>
          <p><strong>Birthdate:</strong> 2000-01-01</p>
          <p><strong>Phone Number:</strong> 09123456789</p>
          <p><strong>Gender:</strong> Other</p>
        </div>

        <div>
          <button onClick={onEdit} className="btn btn-warning">Edit Profile</button>
        </div>
      </div>
    </div>
  </section>
);

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

const AddressSection = () => (
  <section>
    <h2>My Addresses</h2>
    <div className="d-flex justify-content-end mb-3">
      <button className="btn btn-warning">New Address</button>
    </div>
    {["123 Main St.", "132 Barangay"].map((addr, idx) => (
      <div className="card p-4 mb-3" key={idx}>
        <div className="d-flex justify-content-between align-items-center bg-light p-2 mb-2">
          <span>{addr}</span>
          <button className="btn btn-sm btn-danger">✕</button>
        </div>
      </div>
    ))}
  </section>
);

const PaymentSection = () => (
  <section>
    <h2>Payment Methods</h2>
    <div className="card p-4 mb-4 d-flex flex-column">
      <h5 className="mb-3">eWallets</h5>
      <ul className="list-group mb-3">
        {["GCash", "Maya"].map((wallet, idx) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={idx}>
            {wallet} <button className="btn btn-outline-danger">✕</button>
          </li>
        ))}
      </ul>
      <button className="btn btn-outline-primary btn-sm">Add eWallet</button>
    </div>

    <div className="card p-4 d-flex flex-column">
      <h5 className="mb-3">Credit / Debit Cards</h5>
      <ul className="list-group mb-3">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>Name</strong><br />**** **** **** 3456<br />Exp: 2026-05
          </div>
          <button className="btn btn-outline-danger">✕</button>
        </li>
      </ul>
      <button className="btn btn-outline-primary btn-sm">Add Card</button>
    </div>
  </section>
);

const PurchaseSection = () => (
  <section>
    <h2>To Pay</h2>
    <div className="card mb-3 p-3">
      <div className="row g-3 align-items-center">
        <div className="col-md-2">
          <img
            src="https://cdn.shopify.com/s/files/1/2695/9506/files/Banner_Image_02_bb51cd51-1dfd-4a10-a91e-1b86e08820f7.png?v=1745484105"
            className="img-fluid rounded"
            alt="Product"
          />
        </div>
        <div className="col-md-7">
          <h6 className="mb-1">Redragon wireless mouse</h6>
          <p className="mb-0 text-muted">Variation: Black</p>
          <p className="mb-0 text-muted">Quantity: 1</p>
        </div>
        <div className="col-md-3 text-end">
          <p className="mb-2 fw-bold fs-5">₱1,299.00</p>
          <button className="btn btn-outline-secondary btn-sm">Track Order</button>
          <button className="btn btn-outline-primary btn-sm">Buy Again</button>
        </div>
      </div>
    </div>
  </section>
);

const EmptySection = ({ title }) => (
  <section>
    <h2>{title}</h2>
    <div className="card p-4"><p>No {title.toLowerCase()} yet.</p></div>
  </section>
);

const ProfilePage = () => {
  const [active, setActive] = useState('profile');

  return (
    <div className="container-fluid bg-light">
      <div className="row min-vh-100">
        <nav className="col-md-3 col-lg-2 d-md-block bg-white border-end pt-4">
          <div className="px-3">
            <h5 className="fw-bold">Account</h5>
            <ul className="nav flex-column mb-4">
              <li className="nav-item"><button className="nav-link btn btn-link text-start" onClick={() => setActive('profile')}>Profile</button></li>
              <li className="nav-item"><button className="nav-link btn btn-link text-start" onClick={() => setActive('address')}>Address</button></li>
              <li className="nav-item"><button className="nav-link btn btn-link text-start" onClick={() => setActive('payment')}>Payment</button></li>
            </ul>
            <h5 className="fw-bold">Purchases</h5>
            <ul className="nav flex-column">
              <li className="nav-item"><button className="nav-link btn btn-link text-start" onClick={() => setActive('purchases')}>To Pay</button></li>
              <li className="nav-item"><button className="nav-link btn btn-link text-start" onClick={() => setActive('toShip')}>To Ship</button></li>
              <li className="nav-item"><button className="nav-link btn btn-link text-start" onClick={() => setActive('toReceive')}>To Receive</button></li>
              <li className="nav-item"><button className="nav-link btn btn-link text-start" onClick={() => setActive('completed')}>Completed</button></li>
              <li className="nav-item"><button className="nav-link btn btn-link text-start" onClick={() => setActive('cancelled')}>Cancelled</button></li>
            </ul>
          </div>
        </nav>

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
          {active === 'profile' && <ProfileSection onEdit={() => setActive('editProfile')} />}
          {active === 'editProfile' && <EditProfileSection />}
          {active === 'address' && <AddressSection />}
          {active === 'payment' && <PaymentSection />}
          {active === 'purchases' && <PurchaseSection />}
          {['toShip', 'toReceive', 'completed', 'cancelled'].includes(active) && (
            <EmptySection title={
              active === 'toShip' ? 'To Ship' :
              active === 'toReceive' ? 'To Receive' :
              active === 'completed' ? 'Completed Orders' :
              'Cancelled Orders'
            } />
          )}
        </main>
      </div>
    </div>
  );
};