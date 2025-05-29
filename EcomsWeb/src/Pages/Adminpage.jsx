import axios from "axios";
import { Navbar } from "../Components/Navbar";
import React, { use } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 


export function Adminpage() {
  const [userReports, setUserReports] = useState([]);
  const userkey = localStorage.getItem("userkey");
  const [reportedShops, setReportedShops] = useState([]);
  const [reportedProducts, setReportedProducts] = useState([]); 
  const [user, setUser] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const navigate = useNavigate(); // Initialize navigate
  const [selectedShop, setSelectedShop] = useState(null);
  const [shopReport, setShopReport] = useState({
    reportname: "",
    reportdesc: "",
    shopkey: "",
  });

  const handleReportShop = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/shopreport", shopReport);    
            alert("Report submitted successfully.");
            // Reset the report fields
            const modalEl = document.getElementById("shopModal");
            const modal = bootstrap.Modal.getInstance(modalEl);
            modal.hide();
        } catch (err) {
            console.error("Error submitting report:", err);
            alert("Error submitting report.");
        }
    };

    const handleShopStatusChange = async (shopId, status) => {
      try {
        await axios.put(`http://localhost:3000/api/shop/shopstatus/${shopId}`, { shopstatus: status });
        alert(`Shop has been ${status ? "enabled" : "disabled"} successfully.`);
        // Refresh the shop data after the status change
        const shopsResponse = await axios.get(`http://localhost:3000/api/shop`);
        setReportedShops(shopsResponse.data);
      } catch (err) {
        console.error(`Error updating shop status:`, err);
        alert(`Failed to ${status ? "enable" : "disable"} the shop. Please try again.`);
      }
      };

   useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/report`);
                setUserReports(response.data); // Set the report data
                const shopsResponse = await axios.get(`http://localhost:3000/api/shop`);
                setReportedShops(shopsResponse.data); // Set the shop data
                const productsResponse = await axios.get(`http://localhost:3000/api/product`); 
                setReportedProducts(productsResponse.data); // Set the product data
                const userReportResponse = await axios.get(`http://localhost:3000/api/user`);
                setUser(userReportResponse.data); // Set the user report data
            } catch (err) {
                setError(err.message);
            }
        };
        fetchProduct();
    }, []);

    const enrichedReports = userReports.map((report) => {
      const shop = reportedShops.find((shop) => shop.shopid === report.shopkey);
      const product = reportedProducts.find((product) => product.pid === report.productkey);
      const consumer = user.find((user) => user.consumerid === report.userkey);

      return {
        reportId: report.reportid,
        reportTitle: report.reporttitle,
        consumerId: consumer?.consumerid || null,
        consumerFirstName: consumer?.consumerfirstname || "Unknown",
        shopName: shop?.shopname || "Unknown Shop",
        productName: product?.pname || "Unknown Product",
        reportdescription: report.reportdescription,
        reportImsg: report.reportimage,    
        shopkey: report.shopkey    ,
        userimage: consumer?.consumerimage,
        productimage: product?.pimageurl,
        shopImage: shop?.shoplogo
      };
    });

    const handleShopClick = (shopKey) => {
      return () => {
        const modalElement = document.querySelector('.modal.show');
        if (modalElement) {
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          modalInstance.hide();
        }
        navigate(`/shoppage/${shopKey}`); // Navigate to the shop details page
      };
    }

    
    

    return (
      <>
      
        <Navbar />
        
    <div className="bg-light min-vh-100">
      <div className="container py-4">
         <h1>Admin Shop Management</h1>
        <div className="row">
          {/* Upcoming Reports */}
          <div className="col-md-6 mb-4">
           
            <div className="card">
              <div className="card-header fw-bold">Upcoming Reports</div>
              <ul className="list-group list-group-flush">
                {enrichedReports.map((reports) => (
                  <li
                    key={reports.reportId}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >Reported by: {reports.consumerFirstName} ID: {reports.consumerId}
                    <span className="fw-bold">"{""+reports.reportTitle}"</span>
                    <button
                      className="btn btn-sm btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#reportModal"
                      onClick={() => {setSelectedReport(reports.reportId)}}
                    >
                      View Details
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Report Modal */}
      <div
        className="modal fade"
        id="reportModal"
        tabIndex="-1"
        aria-labelledby="reportModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="reportModalLabel">
                Report Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {enrichedReports.map((report) => (
              <>
              {(report.reportId === selectedReport) && 
              <>
                  <div className="modal-body">
                  <div className="row">
                    <div className="col-1 ">
                      <img
                          src={report.userimage}
                          alt="Consumer"
                          style={{ width: '50px', height: '50px', borderRadius: '50%' }}  
                          className=""
                        />
                    </div>
                    <div className="col-11 ps-5 mb-3">
                      <strong>{report.consumerFirstName}</strong><br/> <span className="text-secondary small">Id: 00000{report.consumerId}</span>
                    </div>
                  </div>
                  <div className="fw-bold mb-1">"{report.reportTitle}"</div>
                  <div className="ps-3 card p-2 pb-5">
                    <div className="text-secondary" style={{fontSize:"10px"}}>Report Description:</div>
                    {report.reportdescription}</div>
                  <div className="ps-3 card p-2 text-secondary mt-2">
                    <div className="row">
                      <div className="col">
                        <div className="" style={{fontSize:"10px"}}>Product Reported:</div>
                        <div className="text-primary">{report.productName}</div>
                        <div className="text-primary"style={{fontSize:"12px"}}>by {report.shopName}</div>
                      </div>
                      <div className="col text-end">
                        <img
                          src={report.productimage}
                          alt="Product"
                          style={{ width: '50px', height: '50px', borderRadius: '50%' }}  
                          className="ms-2"
                        />
                      </div>
                    </div>
                    
                    
                  </div>
                  </div>
                  <div className="ps-3 card p-2 text-secondary mx-3 mb-2">
                    <div className="" style={{fontSize:"10px"}}>Report Image:</div>
                    {report.reportImsg != null?
                   <img
                    src={report.reportImsg}
                  ></img>
                  : "No Image Provided"
                    }
                  

                  </div>
                 
                  <div className="modal-footer d-flex justify-content-between"
                  onClick={handleShopClick(report.shopkey)}
                  >
                    <div>
                      <img
                        src={report.shopImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6AgT5iH1yzqRI0zQnln2KSFF5iBdytal_UA&s"}
                        alt="Shop"
                        style={{ width: '50px', height: '50px', borderRadius: '50%' }}  
                        className="me-2"
                      />
                      {report.shopName}</div>
                    <button className="btn" style={{background: "#273F4F", color:"white"}}>View Shop</button>
                  </div>
                 
               </>
              }
              </>
           
            ))}
          </div>

        </div>
      </div>

          {/* Shops */}
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <span className="fw-bold">Shops</span>
               
              </div>
              <ul className="list-group list-group-flush">
                {reportedShops.map((shop) => (
                  <li
                    key={shop.shopid}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                    <img
                        src={shop.shoplogo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6AgT5iH1yzqRI0zQnln2KSFF5iBdytal_UA&s"}
                        alt="Shop"
                        style={{ width: '50px', height: '50px', borderRadius: '50%' }}  
                        className="me-2"
                      />{shop.shopname}
                    </div>

                     
                    <button
                       className={`btn btn-sm ${
                        shop.shopstatus ? "btn-success" : "btn-danger"
                      }`}
                      data-bs-toggle="modal"
                      data-bs-target="#shopModal"
                      onClick={() => {
                        setShopReport({ ...shopReport, shopkey: shop.shopid });
                      }}
                    >
                      Shop Status
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      

      {/* Shop Modal */}
      <div
        className="modal fade"
        id="shopModal"
        tabIndex="-1"
        aria-labelledby="shopModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleReportShop}>
            <div className="modal-header">
              <h5 className="modal-title" id="shopModalLabel">
                Edit Shop Details
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
                <label htmlFor="shopName" className="form-label">
                  Shop Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={shopReport.reportname}
                  id="reportname"
                  onChange={(e) =>
                    setShopReport({ ...shopReport, reportname: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="shopDescription" className="form-label">
                  Shop Details
                </label>
                <textarea
                  className="form-control"
                  id="shopDescription"
                  value={shopReport.reportdesc}
                  onChange={(e) =>
                    setShopReport({ ...shopReport, reportdesc: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
            <div className="modal-footer d-flex">
              <div>
                <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    onClick={() => handleShopStatusChange(shopReport.shopkey, false)} // Disable shop
                  >
                    Disable
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-success me-2"
                    onClick={() => handleShopStatusChange(shopReport.shopkey, true)} // Enable shop
                  >
                    Enable
                  </button>
                 <button type="submit" className="btn btn-outline-primary" data-bs-dismiss="modal">
                  Contact
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  

export default AdminPage;

      </>
    );
}