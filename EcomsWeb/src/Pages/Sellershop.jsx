import Sidebar from "../Components/Sidebar";
import Header from "../Components/Sellerheader";
import React, { useEffect, useState } from 'react';
import axios from "axios";


export function Sellershop(){
  const [currentSlide, setCurrentSlide] = useState(0);
  const [shopData, setShopData] = useState([]);
  const [product, setProduct] = useState([]);
  const [consumerData, setConsumerData] = useState([]);
  const shopKey = localStorage.getItem("shopkey");
  const userkey = localStorage.getItem("userkey");
  const [isSeller, setIsSeller] = useState(false);


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

  
  useEffect(() => {
      const fetchshopData = async () => {
        try {
        const response = await axios.get(`http://localhost:3000/api/shop/shopdata/${shopKey}`);
        setShopData(response.data);

        const productresponse = await axios.get(`http://localhost:3000/api/product/shop/${shopKey}`);
        setProduct(productresponse.data);

        const consumerResponse = await axios.get(`http://localhost:3000/api/user/phone/${userkey}`);
        setConsumerData([consumerResponse.data]);
    } catch (error) {
      console.error('Error fetching shop data:', error);
    }
  };
  fetchshopData();
  }, [shopKey]);

    const handleEditShopClick = (shopId) => {
  const shop = shopData.find((s) => s.shopid === shopId); // Find the shop by ID
  if (shop) {
    setUpdateShop({
      shopname: shop.shopname,
      shopdesc: shop.shopdesc,
      shopbanner: shop.shopbanner,
      shoplogo: shop.shoplogo,
      shippinglocation: shop.shippinglocation,
      sellername: shop.sellername,
      shopid: shop.shopid,
    });
  }
};


    const [updateShop, setUpdateShop] = useState({
      shopname : "", 
      shopdesc : "", 
      shopbanner : "", 
      shoplogo : "", 
      shippinglocation : "", 
      sellername : "",
      shopid : shopKey
      });

    const handleEditShop = async (e) => {
      e.preventDefault();
      try {
        const productResponse = await axios.put(`http://localhost:3000/api/shop/${shopKey}`, updateShop);
        if (productResponse.status === 200) {
          alert("Product is updated successfully!");

        }
      } catch (err) {
        console.error("Error updating Product:", err);
        alert("Failed to updating Product. Please try again.");
      }
    };


  // Calculate the average product rating
  const shopReviewScore = product
        .map((item) => Number(item.pratings)) // Convert to number
        .filter((score) => typeof score === "number" && !isNaN(score)); // Ensure valid numeric scores

    const shopAverageReviewScore =
        shopReviewScore.length > 0
            ? shopReviewScore.reduce((sum, score) => sum + score, 0) / shopReviewScore.length
            : 0;

    // Round the average score to one decimal place
    const roundedAverageScore = Math.round(shopAverageReviewScore * 10) / 10;
  
  // Update shop rating whenever roundedAverageScore (and shopkey) changes
      useEffect(() => {
          if (shopKey) {
              const updateShopRatings = async () => {
                  try {
                      await axios.put(`http://localhost:3000/api/shop/shopratings/${shopKey}`, {
                          shopratings: roundedAverageScore,
                      });
                  } catch (err) {
                      console.error("Error updating shop rating:", err);
                  }
              };
              updateShopRatings();
          }
      }, [roundedAverageScore, shopKey]);
  
  const profileData = {
    avatar: '',
    name: 'TechTop PH',
    verified: true,
    rating: 4.9,
    responseRate: '100% Response',
    products: 21,
    followers: '2.2K',
    joinedDate: '2 Years Ago'
  };

  const highlights = [
    {
      id: 1,
      image: '',
      rating: 4.9,
      reviews: 234
    },
    {
      id: 2,
      image: '',
      rating: 4.9,
      reviews: 187
    },
    {
      id: 3,
      image: '',
      rating: 4.8,
      reviews: 156
    }
  ];

  const banners = [
    {
      id: 1,
      title: '4.4',
      subtitle: 'UP TO 80% OFF',
      bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      image: ''
    },
    {
      id: 2,
      title: '4.4',
      subtitle: 'UP TO 80% OFF',
      bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      image: ''
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % highlights.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + highlights.length) % highlights.length);
  };



  const buttonStyle = {
    background: 'none',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
    padding: '4px 8px',
    cursor: 'pointer',
    fontSize: '14px'
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    padding: '24px',
    marginBottom: '16px'
  };
    return(
        <>
        {(isSeller)?(
          <>
        <Header />
        
        <div style={{ 
        backgroundColor: "#EFEEEA",
        minHeight: '100vh',
        display: 'flex'
    }}>
        <Sidebar/>
      <div style={{ 
        flex: 1, 
        padding: '20px',
        overflow: 'auto'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>

          <div style={{ flex: '1 1 60%', minWidth: '300px' }}>

          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <h5 style={{ margin: '0', fontSize: '18px', fontWeight: '600' }}>Banner</h5>
             {shopData.map((shop) => (
              <button
                key={shop.shopid}
                data-bs-toggle="modal"
                data-bs-target="#editShopModal"
                style={buttonStyle}
                onClick={() => handleEditShopClick(shop.shopid)} // Pass the shop ID
              >
                ✏️
              </button>
            ))}
            </div>
            
            {/* Banner */}
             {shopData.map((shop) => (
              <>
            <div style={{ 
              width: '100%', 
              height: '200px', 
              backgroundColor: '#e9ecef',
              borderRadius: '8px',
              marginBottom: '24px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img 
                src={shop.shopbanner}
                alt="Profile Banner"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>
           
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ position: 'relative', marginRight: '16px' }}>
                <img 
                  src={shop.shoplogo} 
                  alt="Profile" 
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <span 
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    right: '0',
                    backgroundColor: '#28a745',
                    borderRadius: '50%',
                    width: '16px',
                    height: '16px',
                    border: '2px solid white'
                  }}
                ></span>
              </div>
              <div>
                
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                  <h5 style={{ margin: '0 8px 0 0', fontSize: '20px', fontWeight: '600' }}>{shop.shopname}</h5>
                  {profileData.verified && (
                    <span style={{
                      backgroundColor: '#007bff',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>Seller</span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', color: '#6c757d' }}>
                  <div style={{ marginRight: '8px' }}>
                    {roundedAverageScore + " "}
                    <span style={{ color: "#FE7743" }}>
                        {"★".repeat(roundedAverageScore)}{/* Solid stars */}
                      </span>
                  </div>
                  <span style={{ fontSize: '14px' }}>{profileData.responseRate}</span>
                </div>
              </div>
            </div>
           </>
          ))} 
            <div style={{ display: 'flex', textAlign: 'center' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ marginRight: '8px', fontSize: '18px' }}>📦</span>
                
                <div>
                  <div style={{ fontWeight: '600', fontSize: '16px' }}> {product.length}</div>
                  <div style={{ fontSize: '12px', color: '#6c757d' }}>Products</div>
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ marginRight: '8px', fontSize: '18px' }}>👥</span>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '16px' }}>{profileData.followers}</div>
                  <div style={{ fontSize: '12px', color: '#6c757d' }}>Followers</div>
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ marginRight: '8px', fontSize: '18px' }}>👤</span>
                {shopData.map((shop) => (
                <div>
                  <div style={{ fontWeight: '600', fontSize: '16px' }}>Joined</div>
                  <div style={{ fontSize: '12px', color: '#6c757d' }}>{"Since "+(shop.create_timestamp).substring(0, 4)}</div>
                </div>
                ))}
              </div>
            </div>
            
          </div>

          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h5 style={{ margin: '0', fontSize: '18px', fontWeight: '600' }}>Highlight</h5>
            </div>
            
            <div  style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', transition: 'transform 0.3s ease', transform: `translateX(-${currentSlide * 33.333}%)` }}>
                {product.map((products) => (
                  <div className="card p-3 shadow" style={{ flex: '0 0 200px', marginRight: '16px' }}>
                    <div style={{ 
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}>
                      <img 
                        src={products.pimageurl} 
                        style={{ 
                          width: '100%',
                          height: '120px', 
                          objectFit: 'cover'
                        }}
                      />
                      {products.pname}
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <strong className="pe-1">{products.pratings}</strong>
                           <span style={{ color: "#FE7743" }}>
                            {"★".repeat(products.pratings)}{/* Solid stars */}
                          </span>
                          </div>
                          <small style={{ color: '#6c757d' }}></small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '-15px',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'white',
                  border: '1px solid #dee2e6',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  zIndex: 10
                }}
                onClick={prevSlide}
              >
                ‹
              </button>
              <button 
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '-15px',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'white',
                  border: '1px solid #dee2e6',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  zIndex: 10
                }}
                onClick={nextSlide}
              >
                ›
              </button>
            </div>
          </div>


          </div>
          <div style={{ flex: '1 1 35%', minWidth: '280px' }}>

            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h5 style={{ margin: '0', fontSize: '18px', fontWeight: '600' }}>Seller Info</h5>
              </div>
             
              <div style={{ marginBottom: '24px' }}>
                 {shopData.map((shop) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '8px', fontSize:"20px"}}><i class="bi bi-person-fill"></i></span>
                  <span style={{ color: '#6c757d', fontSize:"16px" }}>{shop.sellername} </span>
                </div>
                ))}
                {consumerData.map((consumer) => (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '8px',  fontSize:"20px"}}><i class="bi bi-telephone-fill"></i></span>
                      <span style={{ color: '#6c757d', fontSize:"16px" }}>{"+63 "+consumer.consumerphone}</span><br/>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '8px',  fontSize:"20px"}}><i class="bi bi-envelope-fill"></i></span>
                      <span style={{ color: '#6c757d', fontSize:"16px" }}>{consumer.consumeremail}</span><br/>
                    </div>
                  </>
                
                ))}
              </div>

              <div style={{ color: '#6c757d', lineHeight: '1.5' }}>
                <p></p>
              </div>
            </div>
             {shopData.map((shop) => (
              <>
            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h5 style={{ margin: '0', fontSize: '18px', fontWeight: '600' }}>Description</h5>
               
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ marginRight: '8px', fontSize: '16px' }}>📍</span>
                  <span style={{ color: '#6c757d' }}>Shipping Location: {shop.shippinglocation}</span>
                </div>
              </div>

              <div style={{ color: '#6c757d', lineHeight: '1.5' }}>
                <p>{shop.shopdesc}</p>
              </div>
            </div>
            </>
              ))}
          </div>
        
        </div>
      </div>
    </div>
    

    {/* Edit Shop Modal */}
              <div
  className="modal fade"
  id="editShopModal"
  tabIndex="-1"
  aria-labelledby="editShopModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog">
    <form className="modal-content" onSubmit={handleEditShop}>
      <div className="modal-header">
        <h5 className="modal-title" id="editShopModalLabel">
          Edit Shop
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
        {/* Shop Name */}
        <div className="mb-3">
          <label className="form-label">Shop Name</label>
          <input
            type="text"
            className="form-control"
            value={updateShop.shopname}
            onChange={(e) =>
              setUpdateShop({ ...updateShop, shopname: e.target.value })
            }
            required
          />
        </div>

        {/* Shop Description */}
        <div className="mb-3">
          <label className="form-label">Shop Description</label>
          <textarea
            className="form-control"
            rows="3"
            value={updateShop.shopdesc}
            onChange={(e) =>
              setUpdateShop({ ...updateShop, shopdesc: e.target.value })
            }
            required
          ></textarea>
        </div>

        {/* Shop Banner */}
        <div className="mb-3">
          <label className="form-label">Shop Banner URL</label>
          <input
            type="text"
            className="form-control"
            value={updateShop.shopbanner}
            onChange={(e) =>
              setUpdateShop({ ...updateShop, shopbanner: e.target.value })
            }
            required
          />
        </div>

        {/* Shop Logo */}
        <div className="mb-3">
          <label className="form-label">Shop Logo URL</label>
          <input
            type="text"
            className="form-control"
            value={updateShop.shoplogo}
            onChange={(e) =>
              setUpdateShop({ ...updateShop, shoplogo: e.target.value })
            }
            required
          />
        </div>

        {/* Shipping Location */}
        <div className="mb-3">
          <label className="form-label">Shipping Location</label>
          <input
            type="text"
            className="form-control"
            value={updateShop.shippinglocation}
            onChange={(e) =>
              setUpdateShop({
                ...updateShop,
                shippinglocation: e.target.value,
              })
            }
            required
          />
        </div>

        {/* Seller Name */}
        <div className="mb-3">
          <label className="form-label">Seller Name</label>
          <input
            type="text"
            className="form-control"
            value={updateShop.sellername}
            onChange={(e) =>
              setUpdateShop({ ...updateShop, sellername: e.target.value })
            }
            required
          />
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
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </div>
    </form>
  </div>
</div>
</>
):(<h1 className="text-center mt-5">
           Please Login
      </h1>)}

    
    </>
  );
};
