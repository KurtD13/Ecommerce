import axios from "axios";
import { Navbar } from "../Components/Navbar";
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import { Link, useLocation } from "react-router-dom";


export function Checkoutpage(){
  
  const userkey = localStorage.getItem("userkey");
  const userKey = userkey;
  const [userAddress, setUserAddress] = useState([]);
  const location = useLocation();
  const { checkoutData } = location.state || { checkoutData: [] };
  const [productData, setProductData] = useState([]);
  const [productVariation, setProductVariation] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkoutDetails, setCheckoutDetails] = useState([]);
  const [userContact, setUserContact] = useState([]);
  const [epayment, setePayment] = useState([]);
  const [cardpayment, setCardPayment] = useState([]);


const handlePlaceOrder = async () => {
  try {
    // Validate the delivery address
    if (
      !address.streetname ||
      !address.housenumber ||
      !address.city ||
      !address.province ||
      !address.region ||
      !address.postalcode ||
      !address.country
    ) {
      alert("Please provide a valid delivery address before placing the order.");
      return; // Stop the checkout process
    }

    const userkey = localStorage.getItem("userkey");

    // Determine payment type and payment ID
    let paymenttype = 1; // Default to Cash on Delivery
    let paymentid = null;

    if (paymentMethod.includes("Gcash") || paymentMethod.includes("Paymaya")) {
      paymenttype = 2; // E-wallet
      const selectedWallet = epayment.find((wallet) =>
        paymentMethod.includes(wallet.epaymentphone.slice(-4))
      );
      paymentid = selectedWallet?.epaymentid || null;
    } else if (cardpayment.some((card) => paymentMethod.includes(card.cardnumber.slice(-4)))) {
      paymenttype = 3; // Card
      const selectedCard = cardpayment.find((card) =>
        paymentMethod.includes(card.cardnumber.slice(-4))
      );
      paymentid = selectedCard?.paymentid || null;
    }

    // Prepare data for each product in checkoutDetails
    const orderData = checkoutDetails.map((item) => {
      const product = productData.find((p) => p.pname === item.productName);
      const variation = productVariation.find(
        (v) => v.pvname === item.variationName
      );

      // Calculate parcel cost
      let parcelcost = item.productPrice * item.quantity + shippingTotal; // Include shipping cost by default

      // Apply voucher if applicable
      if (vouchers.length > 0) {
        const voucher = vouchers[0]; // Use the first voucher
        if (voucher.code === "DISCOUNT10") {
          parcelcost -= item.productPrice * item.quantity * 0.1; // Apply 10% discount
        } else if (voucher.code === "FREESHIP") {
          parcelcost -= shippingTotal; // Apply free shipping
        }
      }

      // Combine the shipping address into a single string
      const shipaddress = `${address.housenumber} ${address.building}, ${address.streetname}, ${address.barangay}, ${address.city}, ${address.province}, ${address.region}, ${address.postalcode}, ${address.country}`;

      // Get contact info
      const contactinfo = userContact.length > 0 && userContact[0]?.consumerphone
        ? userContact[0].consumerphone
        : "No contact info";

      console.log("Contact Info Sent to Backend:", contactinfo); // Debugging

      return {
        pstatus: paymenttype === 1 ? 2 : 1, // 1 for e-wallet/card, 2 for COD
        userkey,
        productkey: product?.pid,
        itemquantity: item.quantity,
        variation: variation?.pvid,
        parcelcost,
        paymenttype,
        paymentid,
        shipaddress, // Include the shipping address
        contactinfo, // Include the contact info
      };
    });

    // Send data to the backend
    await axios.post("http://localhost:3000/api/pstatus", orderData);

    // Update the total sales for each product
    for (const item of checkoutDetails) {
      const product = productData.find((p) => p.pname === item.productName);
      if (product) {
        const pid = product.pid;

        // Fetch the current total sales
        const response = await axios.get(`http://localhost:3000/api/product/getsales/${pid}`);
        const currentSales = response.data.ptotalsales || 0;

        // Calculate the new total sales
        const updatedSales = currentSales + item.quantity;

        // Upload the updated total sales
        await axios.put(`http://localhost:3000/api/product/sales/${pid}`, {
          ptotalsales: updatedSales,
        });

        console.log(`Updated total sales for product ${pid}: ${updatedSales}`);
      }
    }

    alert("Order placed successfully!");
  } catch (err) {
    console.error("Error placing order:", err.message);
    alert("Failed to place order. Please try again.");
  }
};


 
  const handleRemoveProduct = (index) => {
    setCheckoutDetails((prevDetails) => {
      const updatedDetails = prevDetails.filter((_, i) => i !== index);
      
      const updatedTotal = updatedDetails.reduce((acc, item) => acc + item.subtotal, 0);
      setTotalPrice(updatedTotal);
      return updatedDetails;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get('http://localhost:3000/api/address');
        setUserAddress(response.data);
      }catch(err){
          console.error(err.message);
      }
    };
    fetchData();
  },[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get("http://localhost:3000/api/product");
        setProductData(productResponse.data);

        const variationResponse = await axios.get("http://localhost:3000/api/variation");
        setProductVariation(variationResponse.data);
        
        const phoneResponse = await axios.get(`http://localhost:3000/api/user/phone/${userKey}`);
        setUserContact([phoneResponse.data]); // Wrap the object in an array

        const ewalletResponse = await axios.get(`http://localhost:3000/api/ewallet/user/${userKey}`);
        setePayment(ewalletResponse.data);

        const cardResponse = await axios.get(`http://localhost:3000/api/cards/user/${userKey}`);
        setCardPayment(cardResponse.data);


      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, []);


useEffect(() => {
  if (checkoutData.length > 0 && productData.length > 0 && productVariation.length > 0) {
    let total = 0;
    const details = checkoutData.map((item) => {
      // Find product details
      const product = productData.find((p) => p.pid === item.productid);
      const productName = product?.pname || "Unknown Product";
      const productPrice = product?.pprice || 0;
      const productImage = product?.pimageurl;

      // Find variation details IF NULL IT DEFAULTS TO EMPTY STRING
      const variation = productVariation.find(
        (v) => v.pvid.toString() === (item.variation ? item.variation.toString() : "")
      );
      const variationName = variation?.pvname || "Standard";

      // Calculate subtotal
      const subtotal = productPrice * item.quantity;
      total += subtotal;

      return {
        productName,
        productPrice,
        quantity: item.quantity,
        variationName, // Use the correct variation name
        subtotal,
        productImage,
      };
    });

    setCheckoutDetails(details);
    setTotalPrice(total);
  }
}, [checkoutData, productData, productVariation]);


  const filteredAddress = userAddress.filter((a) => 
    a.userkey.toString().includes(userkey?.toString())
  );
// This sets a default address which shows the first one on the database
  useEffect(() => {
  if (filteredAddress.length > 0 && !address.streetname) {
    setAddress(filteredAddress[0]);
    setTempAddress(filteredAddress[0]);
  }
}, [filteredAddress]);

  const [address, setAddress] = useState({
  streetname: "",
  housenumber: "",
  building: "",
  barangay: "",
  city: "",
  province: "",
  region: "",
  postalcode: "",
  country: "",

});
  const [tempAddress, setTempAddress] = useState(address);


   const openAddressModal = () => {
    setTempAddress(address);
    setShowAddressModal(true);
  };

  const saveAddress = () => {
    setAddress(tempAddress);
    setShowAddressModal(false);
  };


  const [message, setMessage] = useState('');
  const [vouchers, setVouchers] = useState([]);
  const [shippingOption, setShippingOption] = useState({
    label: 'Standard Local',
    cost: 30.0,
  });
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const discountAmount = 0;

  const shippingTotal = shippingOption.cost;
  const total = totalPrice + shippingTotal - discountAmount;

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showVoucherModal, setShowVoucherModal] = useState(false);



  const shippingOptions = [
    { label: 'Standard Local', cost: 30.0 },
    { label: 'Express Delivery', cost: 100.0 },
  ];

  const paymentMethods = [
    'Cash on Delivery',
    'Credit Card',
    'Gcash',
    'Maya',
  ];

  const availableVouchers = [
    { id: 1, code: 'DISCOUNT10', description: '10% off', discount: 10 },
    { id: 2, code: 'FREESHIP', description: 'Free Shipping', discount: shippingTotal },
  ];

 

  const selectShippingOption = (option) => {
    setShippingOption(option);
    setShowShippingModal(false);
  };
  
  const selectPaymentMethod = (method) => {
    setPaymentMethod(method);
    setShowPaymentModal(false);
  };

  const toggleVoucher = (voucher) => {
    if (vouchers.some(v => v.id === voucher.id)) {
      setVouchers(vouchers.filter(v => v.id !== voucher.id));
    } else {
      setVouchers([...vouchers, voucher]);
    }
  };

  const closeVoucherModal = () => setShowVoucherModal(false);


  let dynamicDiscount = 0;
  vouchers.forEach(v => {
    if (v.code === 'DISCOUNT10') {
      dynamicDiscount += totalPrice * 0.1;
    } else if (v.code === 'FREESHIP') {
      dynamicDiscount += shippingTotal;
    }
  });

  const discount = dynamicDiscount > 0 ? dynamicDiscount : discountAmount;
  const finalTotal = totalPrice + shippingTotal - discount;
  console.log("Checkout Data:", checkoutData); // Debugging
  console.log("Product Variations:", productVariation); // Debugging
  return (
    <>
    <Navbar/>
    
    <div className="container p-3" style={{ maxWidth: 700, fontSize: '0.85rem', fontFamily: 'Arial, sans-serif' }}>

      <div className="border rounded p-3 mb-3" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ fontWeight: '600' }}>
            <span role="img" aria-label="location">📍</span> Delivery Address
          </div>
          <div
            style={{ fontWeight: '600', cursor: 'pointer' }}
            onClick={openAddressModal}
          >
            Change <span className="dropdown-toggle" />
          </div>
        </div>
        <div className="d-flex mt-2" style={{ fontSize: '0.8rem', color: '#555' }}>
          <div style={{ minWidth: 90 }}>
          {userContact.length > 0 ? (
            userContact.map((contact, index) => (
              <div key={index}>
                <strong>Contact Info:</strong> {contact.consumerphone}
              </div>
            ))
          ) : (
            <div>
              <strong>Contact Info:</strong> No contact information available
            </div>
          )}
        </div>
          <div className="border-start ps-3 flex-grow-1" style={{ color: '#212529' }}>
                {address.housenumber} {address.building}, {address.streetname}, {address.barangay},
                {address.city}, {address.province}, {address.region}, {address.postalcode},
                {address.country}<br />
          </div>
        </div>
      </div>


      <div className="border rounded p-3 mb-3">
        <div className="d-flex align-items-center mb-3">
          <div><strong>Product Orders</strong></div>
          <div className="ms-auto d-flex gap-3 pe-3" style={{ fontSize: '0.75rem', color: '#555' }}>
            <div style={{ minWidth: 70, textAlign: 'right' }}>Unit Price</div>
            <div style={{ minWidth: 55, textAlign: 'center' }}>Quantity</div>
            <div style={{ minWidth: 80, textAlign: 'right' }}>Item Subtotal</div>
          </div>
          <div  style={{ minWidth: 70, fontSize: '0.75rem', color: '#555' }}>Delete Item</div>
      </div>
        {checkoutDetails.map((detail, index) => (
  <div className="card mb-1 p-1" key={index}>
    <div className="d-flex align-items-center rounded p-2 mb-2">
      <img
        src={detail.productImage}
        style={{ maxWidth: "3rem", maxHeight: "2rem", minWidth: "3rem", minHeight: "3rem" }}
        alt={detail.productName}
      />
      <div className="flex-grow-1 ms-3" style={{ fontWeight: 600 }}>
        {detail.productName} ({detail.variationName})
      </div>
      <div style={{ minWidth: 70, textAlign: "right" }}>
        ₱ {detail.productPrice.toFixed(2)}
      </div>
      <div style={{ minWidth: 55, textAlign: "center" }}>
        {detail.quantity}
      </div>
      <div className="me-4" style={{ minWidth: 80, textAlign: "right" }}>
        ₱ {detail.subtotal.toFixed(2)}
      </div>
      <button
        className="btn btn-outline-danger btn-sm ms-3"
        onClick={() => handleRemoveProduct(index)}
        disabled={checkoutDetails.length <= 1} // Disable if only one product remains
      >
        <i className="bi bi-trash-fill"></i>
      </button>
    </div>
  </div>
))}
      </div>


      <div className="rounded p-3 mb-3" style={{ backgroundColor: '#f8f9fa', fontSize: '0.85rem' }}>
        <div className="d-flex">
          <div style={{ minWidth: 170, paddingRight: 10, borderRight: '1px solid #ced4da' }}>
            <div className="mb-2">
              <div><strong>E-invoice</strong></div>
              <button
                type="button"
                className="btn btn-link p-0"
                style={{ fontSize: '0.85rem', textDecoration: 'underline' }}
                onClick={() => alert('Request invoice clicked')}
              >
                Request now
              </button>
            </div>
            <div className="mb-2">
              <div><strong>Message Sellers</strong></div>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Type message"
                style={{ maxWidth: '100%' }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div>
              <div><strong>Vouchers</strong></div>
              <button
                type="button"
                className="btn btn-link p-0"
                style={{ fontSize: '0.85rem', textDecoration: 'underline' }}
                onClick={() => setShowVoucherModal(true)}
              >
                Select Vouchers
              </button>

              <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#333' }}>
                {vouchers.length > 0 ? (
                <div>
                    <strong>Selected Voucher{vouchers.length > 1 ? 's' : ''}:</strong>{' '}
                    {vouchers.map(v => v.code).join(', ')}
                </div>
                ) : (
                <em>No vouchers selected</em>
                )}
            </div>
            </div>
          </div>

          <div className="flex-grow-1 ps-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <div><strong>Shipping Options</strong></div>
                <div style={{ fontSize: '0.85rem', color: '#555' }}>
                  {shippingOption.label}{' '}
                  <button
                    type="button"
                    className="btn btn-link p-0"
                    style={{ fontSize: '0.85rem', textDecoration: 'underline' }}
                    onClick={() => setShowShippingModal(true)}
                  >
                    Change
                  </button>
                </div>
              </div>
              <div>₱ {shippingOption.cost.toFixed(2)}</div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div><strong>Payment Methods</strong></div>
                <div style={{ fontSize: '0.85rem', color: '#555' }}>
                  {paymentMethod}{' '}
                  <button
                    type="button"
                    className="btn btn-link p-0"
                    style={{ fontSize: '0.85rem', textDecoration: 'underline' }}
                    onClick={() => setShowPaymentModal(true)}
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded p-3 d-flex justify-content-between align-items-center">
        <div style={{ fontSize: '0.85rem', color: '#555' }}>
          <div>
            Merchandise Total: <strong>₱ {totalPrice.toFixed(2)}</strong>
          </div>
          <div>
            Shipping Total: <strong>₱ {shippingTotal.toFixed(2)}</strong>
          </div>
          <div>
            Discounts: <strong>₱ {discount.toFixed(2)}</strong><br></br>
            _______________________________
          </div>
          <div style={{fontSize:"20px"}}>
            Total: <strong>₱ {finalTotal.toFixed(2)}</strong>
          </div>
        </div>
        <div className="row text-end ">
        <Link 
        className="btn btn-danger mb-2"
        to={"/cartpage"}>
          Cancel
        </Link>
        <button
          type="button"
          className="btn btn-light py-4"
          style={{ fontWeight: "600", backgroundColor: "#FE7743", borderColor: "#FE7743", color: "white" }}
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
        </div>
        
      </div>

     

      <Modal show={showAddressModal} onHide={() => setShowAddressModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Delivery Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {filteredAddress.map((addr) => (
              <ListGroup.Item
                key={addr.addressid}
                action
                active={tempAddress.addressid === addr.addressid}
                onClick={() => setTempAddress(addr)}
              >
                {addr.housenumber} {addr.building}, {addr.streetname}, {addr.barangay},{" "}
                {addr.city}, {addr.province}, {addr.region}, {addr.postalcode}, {addr.country}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddressModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveAddress}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showShippingModal} onHide={() => setShowShippingModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Shipping Option</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {shippingOptions.map((option, idx) => (
              <ListGroup.Item
                key={idx}
                action
                onClick={() => selectShippingOption(option)}
                style={option.label === shippingOption.label ? { backgroundColor: '#FE7743', borderColor: '#FE7743', color: 'white' } : {}}
              >
                {option.label} - ₱ {option.cost.toFixed(2)}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowShippingModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Payment Method</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {/* Cash on Delivery */}
            <ListGroup.Item
              action
              onClick={() => selectPaymentMethod("Cash on Delivery")}
              style={paymentMethod === "Cash on Delivery" ? { backgroundColor: '#FE7743', borderColor: '#FE7743', color: 'white' } : {}}
            >
              Cash on Delivery
            </ListGroup.Item>

            {/* E-wallets */}
            {epayment.map((wallet, idx) => (
              <ListGroup.Item
                key={idx}
                action
                onClick={() => selectPaymentMethod((wallet.epaymenttype === 1 && "Gcash " || wallet.epaymenttype === 2 && "Paymaya ") + wallet.epaymentphone.slice(-4) )}
                style={paymentMethod === wallet.epaymenttype ? { backgroundColor: '#FE7743', borderColor: '#FE7743', color: 'white' } : {}}
              >
                <div className="fw-bold">{wallet.epaymenttype === 1 && "Gcash " || wallet.epaymenttype === 2 && "Paymaya "}</div>
                {"Phone: 0" + wallet.epaymentphone}
              </ListGroup.Item>
            ))}

            {/* Cards */}
            {cardpayment.map((card, idx) => (
              <ListGroup.Item
                key={idx}
                action
                onClick={() => selectPaymentMethod(card.bankname + " " +card.cardnumber.slice(-4))}
                style={paymentMethod === `Card ending in ${card.cardnumber}` ? { backgroundColor: '#FE7743', borderColor: '#FE7743', color: 'white' } : {}}
              >
                <div className="fw-bold">{card.bankname}</div>{"Card Number: ***** **** ****" + card.cardnumber.slice(-4)}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPaymentModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showVoucherModal} onHide={closeVoucherModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Vouchers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {availableVouchers.map((voucher) => (
              <ListGroup.Item
                key={voucher.id}
                action
                onClick={() => toggleVoucher(voucher)}
                style={vouchers.some(v => v.id === voucher.id) ? { backgroundColor: '#FE7743', borderColor: '#FE7743', color: 'white' } : {}}
              >
                <div><strong>{voucher.code}</strong> - {voucher.description}</div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeVoucherModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>

    </>
  );
}