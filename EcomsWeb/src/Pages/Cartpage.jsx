import { useState, useEffect } from "react";
import { Navbar } from "../Components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function Cartpage() {
  const [cartProducts, setCartProducts] = useState([]);
  const [error, setError] = useState(null);
  const userkey = localStorage.getItem("userkey"); // Get user key from localStorage
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);

useEffect(() => {
  const fetchCartData = async () => {
    try {
      if (!userkey) {
        throw new Error("User key is missing. Please log in.");
      }

      // Fetch cart items for the current user
      const cartResponse = await axios.get(`http://localhost:3000/api/cart`);
      const cartItems = cartResponse.data.filter((item) => item.userkey.toString() === userkey);

      // Fetch all products and variations
      const [productResponse, variationResponse] = await Promise.all([
        axios.get(`http://localhost:3000/api/product`),
        axios.get(`http://localhost:3000/api/variation`),
      ]);

      const products = productResponse.data;
      const variations = variationResponse.data;

      // Map cart items to include product and variation details
      const enrichedCartItems = cartItems.map((cartItem) => {
        const product = products.find((p) => p.pid === cartItem.productkey);
        const availableVariations = variations.filter((v) => v.productkey === cartItem.productkey);

        return {
          ...cartItem,
          productkey: cartItem.productkey || product?.pid || null, // Ensure productkey is preserved
          variation: cartItem.variation || null, // Ensure variation is preserved
          productName: product?.pname || "Unknown Product",
          productDesc: product?.pdesc || "No description available",
          productPrice: product?.pprice || 0,
          productImage: product?.pimageurl || "", // Add product image URL
          ptotal: cartItem.ptotal || cartItem.pquantity * (product?.pprice || 0), // Recalculate ptotal if missing
          availableVariations,
        };
      });

      setCartProducts(enrichedCartItems);
    } catch (err) {
      console.error("Error fetching cart data:", err);
      setError(err.message);
    }
  };

  fetchCartData();
}, [userkey]);

const handleQuantityChange = async (cartId, delta) => {
  const updatedCartProducts = cartProducts.map((product) => {
    if (product.cartid === cartId) {
      const updatedQuantity = Math.max(1, product.pquantity + delta);
      product.pquantity = updatedQuantity;
      product.ptotal = updatedQuantity * Number(product.productPrice); // Ensure productPrice is a number

      // Update the database immediately
      axios.put(`http://localhost:3000/api/cart/${cartId}`, {
        userkey: product.userkey,
        pquantity: updatedQuantity,
        ptotal: product.ptotal, // Ensure ptotal is included
        variation: product.variation || null, // Ensure variation is included
      }).catch((err) => {
        console.error("Error updating quantity in database:", err);
        alert("Failed to update quantity. Please try again.");
      });
    }
    return product;
  });

  setCartProducts(updatedCartProducts);
};

const handleVariationChange = async (cartId, newVariationKey) => {
  const updatedCartProducts = cartProducts.map((product) => {
    if (product.cartid === cartId) {
      const selectedVariation = product.availableVariations.find(
        (variation) => variation.pvid === newVariationKey
      );

      product.variation = newVariationKey; // Update the variation ID (pvid)
      product.variationName = selectedVariation?.pvname || "Standard"; // Update the variation name

      // Update the database immediately
      axios
        .put(`http://localhost:3000/api/cart/${cartId}`, {
          userkey: product.userkey,
          pquantity: product.pquantity,
          ptotal: product.ptotal, // Ensure ptotal is included
          variation: newVariationKey, // Ensure variation is included
        })
        .catch((err) => {
          console.error("Error updating variation in database:", err);
          alert("Failed to update variation. Please try again.");
        });
    }
    return product;
  });

  setCartProducts(updatedCartProducts); // Update the state with the new variation
};



  const handleDelete = async (cartId) => {
    try {
      // Delete the product from the database
      await axios.delete(`http://localhost:3000/api/cart/${cartId}`);

      // Update the frontend state to remove the deleted item
      const updatedCartProducts = cartProducts.filter((product) => product.cartid !== cartId);
      setCartProducts(updatedCartProducts);
    } catch (err) {
      console.error("Error deleting cart item:", err);
      alert("Failed to delete cart item. Please try again.");
    }
  };



  const handleProductSelection = (cartId) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(cartId)) {
        // If already selected, remove it
        return prevSelected.filter((id) => id !== cartId);
      } else {
        // Otherwise, add it
        return [...prevSelected, cartId];
      }
    });
  };

  const calculateSelectedTotal = () => {
    return cartProducts
      .filter((product) => selectedProducts.includes(product.cartid))
      .reduce((total, product) => total + Number(product.ptotal), 0);
  };

  const handleCheckout = () => {
    const checkoutData = cartProducts
      .filter((product) => selectedProducts.includes(product.cartid))
      .map((product) => ({
        productid: product.productkey,
        quantity: product.pquantity,
        variation: product.variation, // Pass the variation ID (pvid)
      }));

    navigate("/checkout", { state: { checkoutData } });
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4 p-3 border rounded bg-light">
        <div className="row fw-bold border-bottom pb-2 mb-3">
          <div className="col-6">
            <h4 className="me-2 fw-bold"> Product Cart </h4>
          </div>
          <div className="col-2 text-center">Unit Price</div>
          <div className="col-2 text-center">Quantity</div>
          <div className="col-1 text-center">Total</div>
          <div className="col-1 text-center">Actions</div>
        </div>

      {cartProducts.map((product) => (
        <div key={product.cartid} className="mb-3 p-2 border bg-white rounded">
          <div className="row align-items-center py-2">
            <div className="col-6 d-flex align-items-start">
              <input
                type="checkbox"
                className="me-2 mt-1"
                checked={selectedProducts.includes(product.cartid)}
                onChange={() => handleProductSelection(product.cartid)}
              />
              <img
                src={product.productImage}
                alt={product.productName}
                className="img-thumbnail me-3"
                style={{
                  minWidth: "100px",
                  maxWidth: "100px",
                  minHeight: "100px",
                  maxHeight: "100px",
                  objectFit: "fill",
                }}
              />
              <div>
                <div>{product.productName}</div>
                <small className="text-muted">{product.productDesc}</small>
                <div>
                  <select
                    className="form-select form-select-sm w-auto mt-1"
                    value={product.variation || ""}
                    onChange={(e) =>
                      handleVariationChange(product.cartid, e.target.value)
                    }
                  >
                    {product.availableVariations.length > 0 ? (
                      product.availableVariations.map((variation) => (
                        <option key={variation.pvid} value={variation.pvid}>
                          {variation.pvname}
                        </option>
                      ))
                    ) : (
                      <option>No Variations</option>
                    )}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-2 text-center">₱ {product.productPrice.toFixed(2)}</div>
            <div className="col-2 text-center">
              <div className="input-group input-group-sm justify-content-center">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => handleQuantityChange(product.cartid, -1)}
                >
                  -
                </button>
                <input
                  type="text"
                  value={product.pquantity}
                  className="form-control text-center"
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => handleQuantityChange(product.cartid, 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="col-1 text-center">₱ {Number(product.ptotal).toFixed(2)}</div>
            <div className="col-1 text-center">
              <button
                className="btn btn-outline-danger btn-sm me-1"
                onClick={() => handleDelete(product.cartid)}
              >
                Delete
              </button>
              <button className="btn btn-outline-secondary btn-sm">Similar</button>
            </div>
          </div>
        </div>
      ))}

        <div className="row border-top pt-3 mt-4 align-items-center">
          <div className="col-6">
            <input
                type="checkbox"
                className="me-2"
                onChange={(e) => {
                  if (e.target.checked) {
                    // Select all products
                    setSelectedProducts(cartProducts.map((product) => product.cartid));
                  } else {
                    // Deselect all products
                    setSelectedProducts([]);
                  }
                }}
                checked={selectedProducts.length === cartProducts.length && cartProducts.length > 0}
              />
            Select All
          </div>
          <div className="col-6 text-end">
            <span className="me-3">
              Total Items: ₱ {calculateSelectedTotal().toFixed(2)}
            </span>
            <button
              className="btn btn-primary"
              style={{ backgroundColor: "#FE7743", borderColor: "#FE7743" }}
              onClick={handleCheckout}
              disabled={selectedProducts.length === 0}
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}