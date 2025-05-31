import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Sellerheader";
import axios from "axios";

export function Sellerorders() {
  const [productStatus, setProductStatus] = useState([]);
  const [productkey, setProductkey] = useState([]);
  const [variations, setVariations] = useState([]);
  const [products, setProducts] = useState([]);
  const shopKey = localStorage.getItem("shopkey");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const userkey = localStorage.getItem("userke  y");
  const isTTSEnabled = JSON.parse(localStorage.getItem("isTTSEnabled")) || false;
    const speak = (text) => {
      if (!isTTSEnabled) return;
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/seller/${userkey}`);
        setIsSeller(response.data.consumersellerstatus); 
      } catch (err) {
        console.error("Error fetching seller status:", err.message);
      }
    };


      if (userkey) {
      fetchData(); // Call the function
    }
    
  }, [userkey]);


const handleArrangeStatus = async () => {
  console.log("Selected Product ID:", selectedProductId); // Debugging log
  console.log("Selected Status:", selectedStatus); // Debugging log

  if (!selectedProductId || !selectedStatus) {
    alert("Please select a status to update.");
    return;
  }

  try {
    const response = await axios.put(
      `http://localhost:3000/api/pstatus/seller/${selectedProductId}`,
      { pstatus: parseInt(selectedStatus) }
    );

    if (response.status === 200) {
      alert("Status updated successfully!");
      // Update the local state to reflect the change
      const updatedProductStatus = productStatus.map((status) =>
        status.productstatusid === selectedProductId
          ? { ...status, pstatus: parseInt(selectedStatus) }
          : status
      );
      setProductStatus(updatedProductStatus);
      fetchData();
    }
  } catch (err) {
    console.error("Error updating status:", err);
    alert("Failed to update status. Please try again.");
  }
};
  
    const fetchData = async () => {
      try {
        // Fetch products under the shop
        const productResponse = await axios.get(
          `http://localhost:3000/api/product/shop/${shopKey}`
        );
        setProducts(productResponse.data);

        const productStatusPromises = productResponse.data.map(async (product) => {
          const response = await axios.get(
            `http://localhost:3000/api/pstatus/product/${product.pid}`
          );
          return response.data;
        });

        const productStatuses = await Promise.all(productStatusPromises);
        setProductStatus(productStatuses.flat());

        const variationResponse = await axios.get(
          `http://localhost:3000/api/variation`
        );
        setVariations(variationResponse.data);

      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };
    fetchData();
  

  const ordersSummaryData = {
    shipWithin24: 25,
    autoCancel24: 5,
    shippingOverdue: 4,
    cancellationRequest: 3,
    abnormalPackages: 2,
    returnRefundRequests: 1,
  };

  const productsData = productStatus.map((status) => {
    const product = products.find((p) => p.pid === status.productkey);
    const variation = variations.find((v) => v.productkey === status.productkey);

    return {
      id: status.pstatusid,
      name: product ? product.pname : "Unknown Product",
      variation: variation ? variation.pvname : "No Variation",
      quantity: status.itemquantity,
      totalPrice: status.parcelcost,
      status: (() => {
        switch (status.pstatus) {
          case 1:
            return "Pending";
          case 2:
            return "To Ship";
          case 3:
            return "Shipped";
          case 4:
            return "Completed";
          case 5:
            return "Canceled";
          default:
            return "Unknown";
        }
      })(),
      shippingChannel: status.shipaddress,
    };
  });

  const tabs = ["All", "To Ship", "Shipped", "Completed", "Pending", "Canceled"];

  const [activeTab, setActiveTab] = useState("All");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const selectAllRef = useRef(null);

  const filteredProducts =
    activeTab === "All"
      ? productsData
      : productsData.filter(
          (p) => p.status.toLowerCase() === activeTab.toLowerCase()
        );

  useEffect(() => {
    if (!selectAllRef.current) return;
    const isIndeterminate =
      selectedProducts.length > 0 &&
      selectedProducts.length < filteredProducts.length;
    selectAllRef.current.indeterminate = isIndeterminate;
  }, [selectedProducts, filteredProducts]);

  

 

  return (
    <>
    {(isSeller) ? (
    <div className="d-flex flex-column vh-100">
      <Header />

      <div className="d-flex flex-grow-1" style={{ overflow: "hidden" }}>
        <Sidebar />

        <main
          className="flex-grow-1 p-4"
          style={{
            backgroundColor: "#EFEEEA",
            overflowY: "auto",
            minHeight: 0,
            borderRadius: "8px",
          }}
        >
          <section
            className="bg-light p-4 shadow"
           
          >
           <h2>Manage Orders</h2> 
          </section>

          <nav
            className="nav nav-tabs mb-4 shadow"
            style={{
              backgroundColor: "#EFEEEA",
              fontSize: "1rem",
              padding: "0.5rem 1rem",
              userSelect: "none",
            }}
          >
            {tabs.map((tab) => (
              <a
                key={tab}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(tab);
                  setSelectAll(false);
                  setSelectedProducts([]);
                  speak(`Switched to ${tab} tab`); // Speak the tab name
                }}
                className={`nav-link ${activeTab === tab ? "active" : ""}`}
                style={{ fontSize: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}
              >
                {tab}
              </a>
            ))}
          </nav>

          <div
            className="d-flex align-items-center bg-light rounded-top px-4 py-3 shadow"
            style={{
              fontSize: "0.95rem",
              fontWeight: "700",
              letterSpacing: "0.02em",
              borderBottom: "2px solid #ccc",
            }}
          >
            
            <div style={{ flexGrow: 1, minWidth: "250px" }}>Product/s</div>
            <div style={{ width: "10%" }}>Quantity</div>
            <div style={{ width: "15%" }}>Total Price</div>
            <div style={{ width: "12%" }}>Status</div>
            <div style={{ width: "20%" }}>Shipping Location</div>
            <div style={{ width: "14%" }} className="text-center">
              Actions
            </div>
          </div>

          <div className="bg-light rounded-bottom px-4 py-3 shadow">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="d-flex align-items-center rounded mb-3 shadow-sm"
                style={{
                  backgroundColor: "#f8f9fa",
                  padding: "15px",
                  gap: "15px",
                  borderRadius: "8px",
                }}
                onClick={() => {speak(`Selected order for ${product.name } with status ${product.status} `);}}
              >
              
                <div
                  style={{ flexGrow: 1, minWidth: "250px" }}
                  className="d-flex align-items-center gap-3 text-start"
                >
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: "#b2b2b2",
                      borderRadius: 8,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 24,
                      color: "#555",
                      userSelect: "none",
                    }}
                    aria-label="product icon"
                  >
                    📦
                  </div>
                  <div style={{ fontSize: "1rem", maxWidth:"250px", minWidth: "250px" }}>
                    <div>{product.name}</div>
                    <small className="text-muted">{product.variation}</small>
                  </div>
                </div>
                <div className="text-center" style={{ width: "10%", fontSize: "0.9rem" }}>
                  {product.quantity}
                </div>
                <div style={{ width: "15%", fontSize: "0.9rem" }}>
                  {product.totalPrice}
                </div>
                <div style={{ width: "12%", fontSize: "0.9rem" }}>{product.status}</div>
                <div style={{ width: "20%", fontSize: "0.9rem" }}>
                  {product.shippingChannel}
                </div>
                <div style={{ width: "14%", fontSize: "0.9rem" }} className="text-center">
                {(product.status === "To Ship" ||
                  product.status === "Pending" ||
                  product.status === "Shipped") && (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    style={{ fontSize: "0.85rem", padding: "0.3rem 0.75rem" }}
                    data-bs-toggle="modal"
                    data-bs-target="#arrangeStatusModal"
                    onClick={() => {
                      console.log("Setting Selected Product ID:", product.id); // Debugging log
                      setSelectedProductId(product.id); // Use product.pid instead of product.id
                      speak(`Arranging status for order of ${product.name}`);
                    }}
                  >
                    Arrange Status
                  </button>
                )}
              </div>
              </div>
            ))}

            {filteredProducts.length === 0 && (
              <div className="text-center py-4 text-muted" style={{ fontSize: "1rem" }}>
                No orders found.
              </div>
            )}

            <div
  className="modal fade"
  id="arrangeStatusModal"
  tabIndex="-1"
  aria-labelledby="arrangeStatusModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="arrangeStatusModalLabel">
          Arrange Status
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
        <p>Select the new status for this order:</p>
        <div className="form-check">
  <input
    className="form-check-input"
    type="radio"
    name="status"
    id="toShip"
    value="2"
    onChange={(e) => {
      console.log("Selected Status:", e.target.value); // Debugging log
      setSelectedStatus(e.target.value);
    }}
  />
  <label className="form-check-label" htmlFor="toShip">
    To Ship
  </label>
</div>
<div className="form-check">
  <input
    className="form-check-input"
    type="radio"
    name="status"
    id="shipped"
    value="3"
    onChange={(e) => {
      console.log("Selected Status:", e.target.value); // Debugging log
      setSelectedStatus(e.target.value);
    }}
  />
  <label className="form-check-label" htmlFor="shipped">
    Shipped
  </label>
</div>
<div className="form-check">
  <input
    className="form-check-input"
    type="radio"
    name="status"
    id="completed"
    value="4"
    onChange={(e) => {
      console.log("Selected Status:", e.target.value); // Debugging log
      setSelectedStatus(e.target.value);
    }}
  />
  <label className="form-check-label" htmlFor="completed">
    Completed
  </label>
</div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {handleArrangeStatus(); speak("Status updated successfully!");} }
        >
          Update Status
        </button>
      </div>
    </div>
  </div>
</div>
            
          </div>
        </main>
      </div>
    </div>
    ):(<h1 className="text-center mt-5">
           Please Login
      </h1>)}
    </>
  );
}