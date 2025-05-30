import Sidebar from "../Components/Sidebar";
import Header from "../Components/Sellerheader";
import { useState, useEffect, use } from "react";
import { FaBox, FaTruck, FaPlane } from "react-icons/fa";
import { SiCashapp } from "react-icons/si";
import { FaPesoSign } from "react-icons/fa6";
import sales from "../assets/sales.png";
import axios from "axios";

export function SellerDashboard() {
  const [reviews, setReviews] = useState([]);
  const [productkey, setProductkey] = useState([]);
  const [ongoingDeliveries, setOngoingDeliveries] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [productStatus, setProductStatus] = useState([]);
  const shopKey = localStorage.getItem("shopkey");
  const shopID = shopKey;
  const [userReports, setUserReports] = useState([]);
  const [adminReports, setAdminReports] = useState([]);
  const [reportedShops, setReportedShops] = useState([]);
  const [reportedProducts, setReportedProducts] = useState([]);
  const [user, setUser] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const userkey = localStorage.getItem("userkey");

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


  const shopkey = shopKey;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products under the shop
        const productkeyResponse = await axios.get(`http://localhost:3000/api/product/shop/${shopkey}`);
        setProductkey(productkeyResponse.data);

        // Fetch all reviews
        const reviewsResponse = await axios.get("http://localhost:3000/api/reviews");
        setReviews(reviewsResponse.data);


      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [shopkey]);

  useEffect(() => {
  const calculateShopStatus = () => {
    const completedOrders = productStatus.filter((status) => status.pstatus === 4).length;
    const ongoingDeliveries = productStatus.filter((status) => status.pstatus === 2 || status.pstatus === 3).length;
    const refundedOrders = productStatus.filter((status) => status.pstatus === 5).length;
    const totalReviews = userInfo.length; // Use userInfo to count reviews for this shop

    setShopStatus({
      completedOrders,
      ongoingDeliveries,
      refundedOrders,
      reviews: totalReviews,
    });
  };

  if (productStatus.length > 0 || userInfo.length > 0) {
    calculateShopStatus();
  }
}, [productStatus, userInfo]);
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const adminReportsResponse = await axios.get(`http://localhost:3000/api/shopreport`);
        setAdminReports(adminReportsResponse.data);
       
      } catch (err) {
        console.error("Error fetching reports:", err.message);

      }
    };
    fetchReports();
  }, []);

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

   

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Filter reviews for products under the shop
        const filteredreviews = reviews.filter((p) =>
          productkey.some((product) => product.pid?.toString() === p.productkey?.toString())
        );

        // Fetch user info for each review's userkey
        const userInfoPromises = filteredreviews.map(async (review) => {
          const userResponse = await axios.get(`http://localhost:3000/api/user/review/${review.userkey}`);
          return {
            ...review, // Include review data
            consumerfirstname: userResponse.data.consumerfirstname,
            consumerimage: userResponse.data.consumerimage,
          };
        });

        // Resolve all promises and set the combined data
        const combinedData = await Promise.all(userInfoPromises);
        setUserInfo(combinedData);
      } catch (err) {
        console.error("Error fetching user info:", err.message);
      }
    };

    if (reviews.length > 0 && productkey.length > 0) {
      fetchUserInfo();
    }
  }, [reviews, productkey]);

 useEffect(() => {
  const fetchProductstatus = async () => {
    try {
      // Map over productkey to fetch product status for each product
      const productStatusPromises = productkey.map(async (product) => {
        const response = await axios.get(`http://localhost:3000/api/pstatus/product/${product.pid}`);
       // Debugging log

        if (Array.isArray(response.data)) {
          // Map over the array of product statuses and include product data
          const productStatusesWithUserInfo = await Promise.all(
            response.data.map(async (status) => {
              // Fetch user info for each userkey in the product status
              const userResponse = await axios.get(`http://localhost:3000/api/user/review/${status.userkey}`);
              return {
                ...product, // Include product data
                ...status, // Include product status data
                consumerfirstname: userResponse.data.consumerfirstname || null,
                consumerimage: userResponse.data.consumerimage || null,
                
              };
            })
          );

          return productStatusesWithUserInfo;
        } else {
          console.warn(`Unexpected response format for product with pid: ${product.pid}`);
          return [];
        }
      });

      // Resolve all promises and flatten the resulting arrays
      const combinedData = (await Promise.all(productStatusPromises)).flat();
      console.log("Combined Product Status Data with User Info:", combinedData); // Debugging log
      setProductStatus(combinedData); // Update the state with the combined data
    } catch (err) {
      console.error("Error fetching product status:", err.message);
    }
  };

  if (productkey.length > 0) {
    fetchProductstatus();
  }
}, [productkey]);


  const [shopStatus, setShopStatus] = useState({
    completedOrders: 0,
    ongoingDeliveries: 0,
    refundedOrders: 0,
    reviews: 0,
  });

  const [businessAnalytics, setBusinessAnalytics] = useState({
    totalSales: 0,
    shopVisitors: 0,
    salesStatus: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    setShopStatus({
      completedOrders: 35,
      ongoingDeliveries: 5,
      refundedOrders: 6,
      reviews: 12,
    });

    setBusinessAnalytics({
      totalSales: 690,
      shopVisitors: 39,
      salesStatus: 69,
      totalOrders: 250,
    });

  }, []);

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    padding: '24px',
    marginBottom: '16px'
  };

  const formatPrice = (price) => {
  return `₱ ${Number(price).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};
    
  return (
    <>
      <Header />
      {(isSeller)?(
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          gap: "1rem",
          overflowY: "auto",
          backgroundColor: "#EFEEEA",
        }}
      >
        <Sidebar />
        <div style={{ flex: 3, display: "flex", flexDirection: "column", gap: "1rem" }}>
          <section className="p-3 rounded mt-4" style={cardStyle}>
          <h5>Shop Status</h5>
          <div className="d-flex justify-content-between text-center mt-3">
            <div>
              <strong>{shopStatus.completedOrders}</strong>
              <br />
              Completed Orders
            </div>
            <div>
              <strong>{shopStatus.ongoingDeliveries}</strong>
              <br />
              Ongoing Deliveries
            </div>
            <div>
              <strong>{shopStatus.refundedOrders}</strong>
              <br />
              Refunded Orders
            </div>
            <div>
              <strong>{shopStatus.reviews}</strong>
              <br />
              Reviews
            </div>
          </div>
        </section>
     
          <section className="p-3 rounded" style={cardStyle}>
            <h5>Reports</h5>
            <div className="row">
              <div className="col-6">
                <span className="text-secondary">User Reports</span>
                 <div className="row">
                  {enrichedReports.map((report) => (
                    (report.shopkey == shopKey) && (
                     
                        <div className="col-6">
                            <div className="card p-2 my-1 rounded shadow">
                              <div className="d-flex align-items-center mb-2 pt-1 ps-1">
                                <div className="fw-bold" style={{fontSize:"10px"}}>
                                  <img
                                    src={report.userimage}
                                    alt="User"
                                    style={{ width: 30, height: 30, borderRadius: "50%" }}
                                    className="me-2 mb-1"
                                    />
                                  {report.consumerFirstName} <br/>
                                  {report.productName} "{report.reportTitle}"
                               </div>
                              </div>
                            
                              <div className="card p-1" style={{ height: 60, fontSize: "0.8rem" }}>
                                <span className="text-secondary" style={{fontSize:"0.5rem"}}>Description</span>{report.reportdescription  }
                              </div>
                              {report.reportImsg && (
                              <img
                              src={report.reportImsg}
                              alt="Report"  
                              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                              />
                              )}
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                </div>
                              </div>
                            </div>
                        </div>
                      
                      
                  )))}
                  </div>
              </div>
              <div className="col-6 ">
                <span className="text-secondary">Admin Notification</span>
                {adminReports.map((report) => (
                    (report.shopkey == shopKey) && (
                      <div className="card p-2 m-1 rounded shadow">
                        <div className="d-flex align-items-center mb-2 pt-1 ps-1">
                          <div className="fw-bold">{report.reportname}</div>
                        </div>
                        <div className="card p-1" style={{ height: 60, marginBottom: 10, fontSize: "0.8rem" }}>
                          <span className="text-secondary" style={{fontSize:"0.5rem"}}>Description</span>{report.reportdesc}
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                          </div>
                        </div>
                      </div>
                  )))}
              </div>
            </div>
            
          </section>

          <section className="p-3 rounded" style={cardStyle}>
            <h5>Reviews</h5>
            <div className="d-flex mt-1">
              {userInfo.map((review) => (
                <div
                  key={review.previewsid}
                  className="card p-2 m-1 rounded shadow"
                  style={{ width: "30%", backgroundColor: "#EFEEEA" }}
                >
                  <div className="d-flex align-items-center mb-2 pt-1 ps-1">
                    <img
                      src={review.consumerimage}
                      alt="User"
                      className="rounded-circle"
                      style={{ width: 30, height: 30 }}
                    />
                    <div className="ms-2 fw-bold">{review.consumerfirstname}</div>
                  </div>
                  <div className="ms-1 small fw-bold">{review.reviewtitle}</div>
                  <div className="card p-1" style={{ height: 60, marginBottom: 10, fontSize: "0.8rem" }}>
                    <span className="text-secondary" style={{fontSize:"0.5rem"}}>Description</span>{review.reviewdesc}
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      {review.reviewscore} <span style={{ color: "#FE7743" }}>
                        {"★".repeat(review.reviewscore)}{/* Solid stars */}
                      </span>
                    </div>
                    <div>↻</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside style={{ flex: 1 }}>
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#EFEEEA",
              borderRadius: "8px",
            }}
          >
            <h6 className="card p-2 bg-white border-2 border-black mt-2 text-center" style={{boxShadow:""}}>Ongoing Deliveries</h6>
            {productStatus.map((d) => (
              
              (d.pstatus !== 5 && d.pstatus !== 4) && 

              <div
                className="align-items-center justify-content-between my-2 p-2 bg-white rounded"
                style={cardStyle}
              >
                <div className="row m-1">
                  <div className="col-10">
                    <strong>{
                   (d.pstatus === 1) && "To Pay by " + d.consumerfirstname  || 
                  (d.pstatus === 2) &&  "Shipped to " + d.consumerfirstname|| 
                  (d.pstatus === 3) &&  "To be Receive by " + d.consumerfirstname
                  }</strong>
                  </div>
                  <div className="col-2 text-end">
                    <div className="mx-2">{
                      (d.pstatus === 1) &&  <FaPesoSign/> || 
                      (d.pstatus === 2) &&  <FaPlane /> || 
                      (d.pstatus === 3) &&  <FaTruck />
                  
                      }</div>
                  </div>
                </div>
                
                <div className="row m-1 flex-grow-1" style={{ fontSize: "1rem" }}>
                   
                  <div>
                    <strong>{d.pname}</strong>
                  </div>
                  
                  <div style={{ fontSize: "0.7rem", color: "gray" }}>{d.shipaddress +" 0"+d.contactinfo}</div>
                  <div className="text-end fw-bold" style={{ fontSize: "1rem" }}>
                    {formatPrice(d.parcelcost)}
                  </div>


                </div>
                
              </div>
              
            
            ))}
            
            
          </div>
        </aside>
      </div>
      ):(
        <h1 className="text-center mt-5">
           Please Login
      </h1>

      )}
    </>
  );
}