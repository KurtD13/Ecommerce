import React, { useState } from "react";
import Header from "../Components/Sellerheader";
import Sidebar from "../Components/Sidebar";

export function Sellercancel(){
    const [refundReturns, setRefundReturns] = useState([
    {
      id: 1,
      issue: "Package wasn’t received.",
      productName: "Product Name",
      variation: "Item Variation",
      quantity: "Quantity",
      totalCost: "Total Cost",
      statusTitle: "Awaiting Refund",
      orderStatus: "Delivered",
      returnStatus: "Refund Request",
    },
    {
      id: 2,
      issue: "Items doesn’t match description",
      productName: "Product Name",
      variation: "Item Variation",
      quantity: "Quantity",
      totalCost: "Total Cost",
      statusTitle: "Awaiting Return Approval",
      orderStatus: "Awaiting Collection",
      returnStatus: "Return Request",
    },
    {
      id: 3,
      issue: "Package wasn’t received.",
      productName: "Product Name",
      variation: "Item Variation",
      quantity: "Quantity",
      totalCost: "Total Cost",
      statusTitle: "Awaiting Refund",
      orderStatus: "Delivered",
      returnStatus: "Refund Request",
    },
    {
      id: 4,
      issue: "Package wasn’t received.",
      productName: "Product Name",
      variation: "Item Variation",
      quantity: "Quantity",
      totalCost: "Total Cost",
      statusTitle: "Awaiting Refund",
      orderStatus: "Delivered",
      returnStatus: "Refund Request",
    },
  ]);

  const attentionRequiredCounts = {
    respondWithin24: 5,
    awaitingReturnRequestApproval: 5,
    awaitingReturnParcelReceipt: 5,
    awaitingRefundOnlyApproval: 5,
  };

  const [activeTab, setActiveTab] = useState("Awaiting Action");
    return(
        <>
        <Header />
        <div className="d-flex flex-column vh-100">

      <div className="d-flex flex-grow-1">
        <Sidebar />

        <main className="flex-grow-1 p-4 bg-light rounded" style={{ marginLeft: "1rem" }}>
          <section
            className="p-3 rounded mb-4"
            style={{ backgroundColor: "#c0c0c0" }}
          >
            <div className="d-flex justify-content-between text-center">
              <div>
                <div className="fs-2 fw-bold">
                  {attentionRequiredCounts.respondWithin24}
                </div>
                <div style={{ fontSize: "12px" }}>Respond within 24 hours</div>
              </div>
              <div>
                <div className="fs-2 fw-bold">
                  {attentionRequiredCounts.awaitingReturnRequestApproval}
                </div>
                <div style={{ fontSize: "12px" }}>
                  Awaiting return request approval
                </div>
              </div>
              <div>
                <div className="fs-2 fw-bold">
                  {attentionRequiredCounts.awaitingReturnParcelReceipt}
                </div>
                <div style={{ fontSize: "12px" }}>
                  Awaiting return parcel receipt
                </div>
              </div>
              <div>
                <div className="fs-2 fw-bold">
                  {attentionRequiredCounts.awaitingRefundOnlyApproval}
                </div>
                <div style={{ fontSize: "12px" }}>
                  Awaiting refund-only approval
                </div>
              </div>
            </div>
          </section>

          <section>
            <ul
              className="nav nav-tabs mb-3"
              role="tablist"
              style={{ userSelect: "none" }}
            >
              {["All", "Awaiting Action", "Completed", "Disputed"].map((tab) => (
                <li className="nav-item" key={tab}>
                  <button
                    className={`nav-link ${
                      activeTab === tab ? "active" : ""
                    }`}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>

            <div className="d-flex justify-content-end mb-2 gap-3">
              <div className="d-flex align-items-center gap-1">
                <span>Filter</span>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  aria-label="Filter"
                >
                  <i className="bi bi-funnel"></i>
                </button>
              </div>
              <div className="d-flex align-items-center gap-1">
                <span>Sort by</span>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  aria-label="Sort"
                >
                  <i className="bi bi-arrow-down-up"></i>
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th scope="col">
                      <input type="checkbox" aria-label="Select All" />
                      <span className="ms-2 fw-semibold">Issue</span>
                    </th>
                    <th scope="col">Product/s</th>
                    <th scope="col">Status</th>
                    <th scope="col" style={{ width: "150px" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {refundReturns.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <input type="checkbox" aria-label={item.issue} />{" "}
                        <span>{item.issue}</span>
                      </td>
                      <td>
                        <div>{item.productName}</div>
                        <div style={{ fontSize: "12px", color: "#555" }}>
                          {item.variation}
                        </div>
                        <div style={{ fontSize: "12px", color: "#555" }}>
                          {item.quantity}
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#555",
                            fontWeight: "600",
                          }}
                        >
                          {item.totalCost}
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: "600" }}>{item.statusTitle}</div>
                        <div style={{ fontSize: "12px", color: "#555" }}>
                          Order Status: {item.orderStatus}
                        </div>
                        <div style={{ fontSize: "12px", color: "#555" }}>
                          Return Status: {item.returnStatus}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column gap-2">
                          <button className="btn btn-outline-secondary btn-sm">
                            View refund records
                          </button>
                          <div className="d-flex gap-2">
                            <button className="btn btn-outline-primary btn-sm flex-grow-1">
                              Refund
                            </button>
                            <button className="btn btn-outline-danger btn-sm flex-grow-1">
                              Reject
                            </button>
                            <button className="btn btn-outline-secondary btn-sm">
                              More Actions
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>

        </>
        
    );
}