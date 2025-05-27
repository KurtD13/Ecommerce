import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Sellerheader";

export function Sellerorders() {
  const ordersSummaryData = {
    shipWithin24: 25,
    autoCancel24: 5,
    shippingOverdue: 4,
    cancellationRequest: 3,
    abnormalPackages: 2,
    returnRefundRequests: 1,
  };

  const productsMock = [
    {
      id: 1,
      name: "Product A",
      variation: "Red, Large",
      quantity: 10,
      totalPrice: "₱1,000.00",
      status: "To Ship",
      shippingChannel: "Standard Local",
    },
    {
      id: 2,
      name: "Product B",
      variation: "Blue, Medium",
      quantity: 5,
      totalPrice: "₱500.00",
      status: "Shipped",
      shippingChannel: "Express",
    },
    {
      id: 3,
      name: "Product C",
      variation: "Green, Small",
      quantity: 2,
      totalPrice: "₱200.00",
      status: "Completed",
      shippingChannel: "Standard Local",
    },
    {
      id: 4,
      name: "Product D",
      variation: "Black, XL",
      quantity: 7,
      totalPrice: "₱700.00",
      status: "To Ship",
      shippingChannel: "Standard Local",
    },
    {
      id: 5,
      name: "Product E",
      variation: "Yellow, Medium",
      quantity: 1,
      totalPrice: "₱100.00",
      status: "Canceled",
      shippingChannel: "Standard Local",
    },
  ];

  const tabs = ["All", "To Ship", "Shipped", "Completed", "Pending", "Canceled"];

  const [activeTab, setActiveTab] = useState("All");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const selectAllRef = useRef(null);

  const filteredProducts =
    activeTab === "All"
      ? productsMock
      : productsMock.filter(
          (p) => p.status.toLowerCase() === activeTab.toLowerCase()
        );

  useEffect(() => {
    if (!selectAllRef.current) return;
    const isIndeterminate =
      selectedProducts.length > 0 &&
      selectedProducts.length < filteredProducts.length;
    selectAllRef.current.indeterminate = isIndeterminate;
  }, [selectedProducts, filteredProducts]);

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelectProduct = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((pid) => pid !== id));
      setSelectAll(false);
    } else {
      const newSelected = [...selectedProducts, id];
      setSelectedProducts(newSelected);
      if (newSelected.length === filteredProducts.length) setSelectAll(true);
    }
  };

  return (
    <div className="d-flex flex-column vh-100">
      <Header />

      <div className="d-flex flex-grow-1" style={{ overflow: "hidden" }}>
        <Sidebar />

        <main
          className="flex-grow-1 p-4"
          style={{
            backgroundColor: "#f5f5f5",
            overflowY: "auto",
            minHeight: 0,
            borderRadius: "8px",
          }}
        >

          <section
            className="bg-light p-4 rounded mb-4"
            style={{ marginBottom: "30px" }}
          >
            <h6
              className="mb-4"
              style={{
                fontSize: "1.3rem",
                fontWeight: "700",
                letterSpacing: "0.02em",
              }}
            >
              Orders Summary
            </h6>
            <div
              className="d-flex justify-content-between text-center flex-wrap"
              style={{ fontSize: "1rem", gap: "20px" }}
            >
              {Object.entries(ordersSummaryData).map(([key, value]) => {
                const label = {
                  shipWithin24: "Ship within 24 hours",
                  autoCancel24: "Auto Cancel within 24 hours",
                  shippingOverdue: "Shipping Overdue",
                  cancellationRequest: "Cancellation Request",
                  abnormalPackages: "Abnormal Packages",
                  returnRefundRequests: "Return/Refund Requests",
                }[key];
                return (
                  <div
                    key={key}
                    style={{ minWidth: "140px", flexGrow: 1, flexBasis: "140px" }}
                  >
                    <strong
                      style={{
                        fontSize: "1.5rem",
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      {value}
                    </strong>
                    <div style={{ fontSize: "1rem", color: "#444" }}>{label}</div>
                  </div>
                );
              })}
            </div>
          </section>

          <nav
            className="nav nav-tabs mb-4"
            style={{
              backgroundColor: "#ddd",
              borderRadius: "8px",
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
                }}
                className={`nav-link ${activeTab === tab ? "active" : ""}`}
                style={{ fontSize: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}
              >
                {tab}
              </a>
            ))}
          </nav>

          <div
            className="d-flex align-items-center bg-light rounded-top px-4 py-3"
            style={{
              fontSize: "0.95rem",
              fontWeight: "700",
              letterSpacing: "0.02em",
              borderBottom: "2px solid #ccc",
            }}
          >
            <div style={{ width: "4%" }}>
              <input
                type="checkbox"
                ref={selectAllRef}
                checked={selectAll}
                onChange={toggleSelectAll}
                style={{ width: "18px", height: "18px" }}
                aria-label="Select all products"
              />
            </div>
            <div style={{ flexGrow: 1, minWidth: "250px" }}>Product/s</div>
            <div style={{ width: "10%" }}>Quantity</div>
            <div style={{ width: "15%" }}>Total Price</div>
            <div style={{ width: "12%" }}>Status</div>
            <div style={{ width: "20%" }}>Shipping Channel</div>
            <div style={{ width: "14%" }} className="text-center">
              Actions
            </div>
          </div>

          <div className="bg-light rounded-bottom px-4 py-3">
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
              >
                <div style={{ width: "4%" }}>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleSelectProduct(product.id)}
                    style={{ width: "18px", height: "18px" }}
                    aria-label={`Select product ${product.name}`}
                  />
                </div>
                <div
                  style={{ flexGrow: 1, minWidth: "250px" }}
                  className="d-flex align-items-center gap-3"
                >
                  <div
                    style={{
                      width: 50,
                      height: 50,
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
                  <div style={{ fontSize: "1rem" }}>
                    <div>{product.name}</div>
                    <small className="text-muted">{product.variation}</small>
                  </div>
                </div>
                <div style={{ width: "10%", fontSize: "0.9rem" }}>
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
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    style={{ fontSize: "0.85rem", padding: "0.3rem 0.75rem" }}
                    aria-label={`Arrange pickup for ${product.name}`}
                  >
                    Arrange Pickup
                  </button>
                </div>
              </div>
            ))}

            {filteredProducts.length === 0 && (
              <div className="text-center py-4 text-muted" style={{ fontSize: "1rem" }}>
                No orders found.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
