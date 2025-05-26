import Sidebar from "../Components/Sidebar";
import Header from "../Components/Sellerheader";
import { Navbar } from "../Components/Navbar";
import { useState, useEffect } from 'react';
import { FaBox, FaTruck, FaPlane } from 'react-icons/fa';
import sales from "../assets/sales.png";
import axios from "axios";

export function SellerDashboard(){
  const [reviews, setReviews] = useState([]);
  const [productkey, setProductkey] = useState([]);
  const [ongoingDeliveries, setOngoingDeliveries] = useState([]);
  const shopKey = localStorage.getItem("shopkey");
  const shopkey = shopKey;
  useEffect(() => {
      const fetchData = async () => {
        try {
          const productkeyResponse = await axios.get(`http://localhost:3000/api/product/shop/${shopkey}`);
          setProductkey(productkeyResponse.data);

          const reviewsResponse = await axios.get("http://localhost:3000/api/reviews");
          setReviews(reviewsResponse.data);
          

  
        } catch (err) {
          console.error(err.message);
        }
      };
      fetchData();
    }, []);

    const filteredreviews = reviews.filter((p) =>
  productkey.some((product) => product.pid?.toString() === p.productkey?.toString())
);

    console.log("Response is ", filteredreviews);

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


    setOngoingDeliveries([
      { id: 1, icon: <FaBox />, status: 'To be Delivered', consumer: 'Consumer Name', date: '01.01.25' },
      { id: 2, icon: <FaTruck />, status: 'In Transit', consumer: 'Consumer Name', date: '01.01.25' },
      { id: 3, icon: <FaPlane />, status: 'Shipped', consumer: 'Consumer Name', date: '01.01.25' },
    ]);
  }, []);


    return(
        <>
       
        <Header/>
        <div
      style={{
        flexGrow: 1,
        padding: '1rem',
        display: 'flex',
        gap: '1rem',
        overflowY: 'auto',
        backgroundColor: '#EFEEEA',
      }}
    >
                          <Sidebar/>

      <div style={{ flex: 3, display: 'flex', flexDirection: 'column', gap: '1rem' }}>

        <section className="p-3 rounded" style={{ backgroundColor: 'white' }}>
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

        <section className="p-3 rounded" style={{ backgroundColor: 'white' }}>
          <h5>Business Analytics</h5>
          <div className="d-flex justify-content-between text-center mt-3" style={{ fontSize: '1.2rem' }}>
            <div>
              <strong>₱{businessAnalytics.totalSales}</strong>
              <br />
              Total Sales
            </div>
            <div>
              <strong>{businessAnalytics.shopVisitors}</strong>
              <br />
              Shop Visitors
            </div>
            <div>
              <strong>
                <img src={sales} alt="Sales Icon" style={{ width: 25, height: 25 }} />
                {businessAnalytics.salesStatus}%
                </strong>
              <br />
              Sales Status (Weekly)
            </div>
            <div>
              <strong>{businessAnalytics.totalOrders}</strong>
              <br />
              Total Orders
            </div>
          </div>
        </section>

        <section className="p-3 rounded" style={{ backgroundColor: 'white' }}>
          <h5>Reviews</h5>
          <div className="d-flex justify-content-between mt-3">
            {filteredreviews.map((review) => (
              <div
                key={review.previewsid}
                className="p-2 border rounded"
                style={{ width: '30%', backgroundColor: '#EFEEEA' }}
              >
                <div className="d-flex align-items-center mb-2">
                  <img
                    className="rounded-circle bg-secondary"
                    style={{ width: 30, height: 30 }}
                  ></img>
                  <div className="ms-2 rounded bg-secondary" style={{ height: 10, width: '70%' }}></div>
                </div>
                <div className="card p-1 small" style={{ height: 60, marginBottom: 10 }}>{review.reviewdesc}</div>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    {review.reviewscore} <span style={{ color: '#FE7743' }}>★★★★☆</span>
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
            padding: '1rem',
            backgroundColor: '#EFEEEA',
            borderRadius: '8px',
          }}
        >
          <h6>Ongoing Deliveries</h6>
          {ongoingDeliveries.map((d) => (
            <div
              key={d.id}
              className="d-flex align-items-center justify-content-between my-2 p-2 bg-white rounded"
            >
              <div>{d.icon}</div>
              <div className="ms-2 flex-grow-1" style={{ fontSize: '0.8rem' }}>
                <div>
                  <strong>{d.status}</strong>
                </div>
                <div>{d.consumer}</div>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'gray' }}>{d.date}</div>
            </div>
          ))}
        </div>
      </aside>
    </div>

        </>
        
    );
}