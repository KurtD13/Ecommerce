import React, { useEffect, useState } from 'react';
import { Footer } from "../Components/Footer";
import { Navbar } from "../Components/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";

export function Shoppage() {
  const { shopid } = useParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [shopData, setShopData] = useState([]);
  const [product, setProduct] = useState([]);
  const shopKey = shopid;

  useEffect(() => {
    const fetchshopData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/shop/shopdata/${shopKey}`);
        setShopData(response.data);

        const productresponse = await axios.get(`http://localhost:3000/api/product/shop/${shopKey}`);
        setProduct(productresponse.data);
      } catch (error) {
        console.error('Error fetching shop data:', error);
      }
    };
    fetchshopData();
  }, [shopKey]);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % product.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + product.length) % product.length);
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    padding: '24px',
    marginBottom: '16px'
  };

  return (
    <>
    <Navbar />
    <div style={{
      backgroundColor: "#EFEEEA",
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      overflow: 'auto'
    }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ flex: '1 1 60%', minWidth: '300px' }}>
          <div style={cardStyle}>
            <h5 style={{ margin: '0', fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Banner</h5>
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
                  </div>
                  <div>
                    <h5 style={{ margin: '0', fontSize: '20px', fontWeight: '600' }}>{shop.shopname}</h5>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#6c757d' }}>
                      <div style={{ marginRight: '8px' }}>
                        {roundedAverageScore + " "}
                        <span style={{ color: "#FE7743" }}>
                          {"★".repeat(Math.floor(roundedAverageScore))} {/* Solid stars */}
                        </span>
                      </div>
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
            </div>
          </div>

          <div style={cardStyle}>
            <h5 style={{ margin: '0', fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Highlight</h5>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
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
                              {"★".repeat(products.pratings)} {/* Solid stars */}
                            </span>
                          </div>
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
          <div style={{ flex: '1 1 35%', minWidth: '280px' }}>
          <div style={cardStyle}>
            <h5 style={{ margin: '0', fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Description</h5>
            {shopData.map((shop) => (
              <>
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ marginRight: '8px', fontSize: '16px' }}>📍</span>
                    <span style={{ color: '#6c757d' }}>Shipping Location: {shop.shippinglocation}</span>
                  </div>
                </div>
                <div style={{ color: '#6c757d', lineHeight: '1.5' }}>
                  <p>{shop.shopdesc}</p>
                </div>
              </>
            ))}
          </div>
        </div>
        </div>

        
      </div>
    </div>
     </>
  );
  
}