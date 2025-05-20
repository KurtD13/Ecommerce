import { useState, useEffect } from "react";
import { Navbar } from "../Components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import axios from "axios";

export function Cartpage() {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartItems, setCartItems] = useState([
    {
      seller: "Seller A",
      products: [
        { id: 1, name: "Product A1", price: 100, quantity: 1 },
      ],
    },
    {
      seller: "Seller B",
      products: [
        { id: 2, name: "Product B1", price: 150, quantity: 1 },
      ],
    },
  ]);
  useEffect(() => {
          const fetchProduct = async () => {
              try {
                  const response = await axios.get(`http://localhost:3000/api/cart`);
                  setCartProducts(response.data); // 
                 
              } catch (err) {
                  setError(err.message);
              }
          };
          fetchProduct();
      }, []);

  

  const handleQuantityChange = (sellerIndex, productIndex, delta) => {
    const newCartItems = [...cartItems];
    const product = newCartItems[sellerIndex].products[productIndex];
    product.quantity = Math.max(1, product.quantity + delta);
    setCartItems(newCartItems);
  };

  const handleDelete = (sellerIndex, productIndex) => {
    const newCartItems = [...cartItems];
    newCartItems[sellerIndex].products.splice(productIndex, 1);

    if (newCartItems[sellerIndex].products.length === 0) {
      newCartItems.splice(sellerIndex, 1);
    }

    setCartItems(newCartItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, seller) => {
      return total + seller.products.reduce((subTotal, product) => {
        return subTotal + product.price * product.quantity;
      }, 0);
    }, 0);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4 p-3 border rounded bg-light">
        <div className="row fw-bold border-bottom pb-2 mb-3">
          <div className="col-6">
            <input type="checkbox" className="me-2" /> Product
          </div>
          <div className="col-2 text-center">Unit Price</div>
          <div className="col-2 text-center">Quantity</div>
          <div className="col-1 text-center">Total</div>
          <div className="col-1 text-center">Actions</div>
        </div>

        {cartItems.map((group, index) => (
          <div key={index} className="mb-3 p-2 border bg-white rounded">
            <div className="fw-bold mb-2">{group.seller}</div>
            {group.products.map((item, idx) => (
              <div key={item.id} className="row align-items-center border-top py-2">
                <div className="col-6 d-flex align-items-start">
                  <input type="checkbox" className="me-2 mt-1" />
                  <div>
                    <div>{item.name}</div>
                    <small className="text-muted">Other Descriptions</small>
                    <div>
                      <select className="form-select form-select-sm w-auto mt-1">
                        <option>Variations</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-2 text-center">₱ {item.price.toFixed(2)}</div>
                <div className="col-2 text-center">
                  <div className="input-group input-group-sm justify-content-center">
                    <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(index, idx, -1)}>-</button>
                    <input type="text" value={item.quantity} className="form-control text-center" readOnly />
                    <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(index, idx, 1)}>+</button>
                  </div>
                </div>
                <div className="col-1 text-center">₱ {(item.price * item.quantity).toFixed(2)}</div>
                <div className="col-1 text-center">
                  <button className="btn btn-outline-danger btn-sm me-1" onClick={() => handleDelete(index, idx)}>Delete</button>
                  <button className="btn btn-outline-secondary btn-sm">Similar</button>
                </div>
              </div>
            ))}
          </div>
        ))}

        <div className="row border-top pt-3 mt-4 align-items-center">
          <div className="col-6">
            <input type="checkbox" className="me-2" /> Select All
          </div>
          <div className="col-6 text-end">
            <span className="me-3">Total Items: ₱ {calculateTotal().toFixed(2)}</span>
            <Link
              to="/checkout"
              className="btn btn-primary"
              style={{ backgroundColor: '#FE7743', borderColor: '#FE7743' }}
            >
              Check Out
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
