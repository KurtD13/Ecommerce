import { Navbar } from "../Components/Navbar";
import React, { useState } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';

export function Checkoutpage(){
  const [address, setAddress] = useState({
    name: 'Blk 00 Lot 00 Somewhere City',
    phone: '0917-000-0000',
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Product A',
      unitPrice: 0.0,
      quantity: 1,
      selected: false,
      imageUrl: '',
    },
  ]);

  const [message, setMessage] = useState('');
  const [vouchers, setVouchers] = useState([]);
  const [shippingOption, setShippingOption] = useState({
    label: 'Standard Local',
    cost: 30.0,
  });
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const discountAmount = 30.0;

  const merchandiseTotal = products
    .filter((p) => p.selected)
    .reduce((acc, p) => acc + p.unitPrice * p.quantity, 0);
  const shippingTotal = shippingOption.cost;
  const total = merchandiseTotal + shippingTotal - discountAmount;

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showVoucherModal, setShowVoucherModal] = useState(false);

  const [tempAddress, setTempAddress] = useState(address);

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

  const openAddressModal = () => {
    setTempAddress(address);
    setShowAddressModal(true);
  };

  const saveAddress = () => {
    setAddress(tempAddress);
    setShowAddressModal(false);
  };

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
      dynamicDiscount += merchandiseTotal * 0.1;
    } else if (v.code === 'FREESHIP') {
      dynamicDiscount += shippingTotal;
    }
  });

  const discount = dynamicDiscount > 0 ? dynamicDiscount : discountAmount;
  const finalTotal = merchandiseTotal + shippingTotal - discount;

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
            <div><strong>Name</strong></div>
            {address.phone }
          </div>
          <div className="border-start ps-3 flex-grow-1" style={{ color: '#212529' }}>
            {address.name} <br />
          </div>
        </div>
      </div>


      <div className="border rounded p-3 mb-3">
        <div className="d-flex align-items-center mb-3">
          <div><strong>Product Orders</strong></div>
          <div className="ms-auto d-flex gap-3" style={{ fontSize: '0.75rem', color: '#555' }}>
            <div style={{ minWidth: 70, textAlign: 'right' }}>Unit Price</div>
            <div style={{ minWidth: 55, textAlign: 'center' }}>Quantity</div>
            <div style={{ minWidth: 80, textAlign: 'right' }}>Item Subtotal</div>
          </div>
        </div>
        {products.map((product) => (
          <div key={product.id} className="d-flex align-items-center border rounded p-2 mb-2">
            <input
              type="checkbox"
              className="form-check-input me-3"
              checked={product.selected}
              onChange={() =>
                setProducts(prev => prev.map(p => p.id === product.id ? { ...p, selected: !p.selected } : p))
              }
            />
            <div
              style={{
                width: 50,
                height: 50,
                backgroundColor: product.imageUrl ? 'transparent' : '#6c757d',
                borderRadius: 5,
                backgroundImage: product.imageUrl ? `url(${product.imageUrl})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
            <div className="flex-grow-1 ms-3" style={{ fontWeight: 600 }}>
              {product.name}
            </div>
            <div style={{ minWidth: 70, textAlign: 'right' }}>
              ₱ {product.unitPrice.toFixed(2)}
            </div>
            <div style={{ minWidth: 55, textAlign: 'center' }}>
              <input
                type="number"
                min={1}
                value={product.quantity}
                onChange={(e) =>
                  setProducts(prev =>
                    prev.map(p =>
                      p.id === product.id ? { ...p, quantity: parseInt(e.target.value) || 1 } : p
                    )
                  )
                }
                style={{ width: 50, textAlign: 'center' }}
                disabled={!product.selected}
              />
            </div>
            <div style={{ minWidth: 80, textAlign: 'right' }}>
              ₱ {(product.unitPrice * product.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>


      <div className="border rounded p-3 mb-3" style={{ backgroundColor: '#f8f9fa', fontSize: '0.85rem' }}>
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
            Merchandise Total: <strong>₱ {merchandiseTotal.toFixed(2)}</strong>
          </div>
          <div>
            Shipping Total: <strong>₱ {shippingTotal.toFixed(2)}</strong>
          </div>
          <div>
            Discounts: <strong>₱ {discount.toFixed(2)}</strong>
          </div>
          <div>
            Total: <strong>₱ {finalTotal.toFixed(2)}</strong>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-light px-4"
          style={{ fontWeight: '600', backgroundColor: '#FE7743', borderColor: '#FE7743', color: 'white' }}
          onClick={() => alert('Place order clicked')}
        >
          Place Order
        </button>
      </div>

      <Modal show={showAddressModal} onHide={() => setShowAddressModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Delivery Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formAddressName">
              <Form.Label>Address Name</Form.Label>
              <Form.Control
                type="text"
                value={tempAddress.name}
                onChange={(e) => setTempAddress({ ...tempAddress, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAddressPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                value={tempAddress.phone}
                onChange={(e) => setTempAddress({ ...tempAddress, phone: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddressModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={saveAddress}>Save</Button>
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
            {paymentMethods.map((method, idx) => (
              <ListGroup.Item
                key={idx}
                action
                onClick={() => selectPaymentMethod(method)}
                style={method === paymentMethod ? { backgroundColor: '#FE7743', borderColor: '#FE7743', color: 'white' } : {}}
              >
                {method}
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