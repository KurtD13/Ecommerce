import Sidebar from "../Components/Sidebar";
import Header from "../Components/Sellerheader";
import React, { useEffect, useState } from 'react';


export function Sellershop(){
  const [currentSlide, setCurrentSlide] = useState(0);
  
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

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} style={{ color: '#ffc107' }}>★</span>);
      } else {
        stars.push(<span key={i} style={{ color: '#dee2e6' }}>☆</span>);
      }
    }
    return stars;
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
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '24px',
    marginBottom: '16px'
  };
    return(
        <>
        <Header />
        <div style={{ 
      backgroundColor: '#f8f9fa',
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
              <button style={buttonStyle}>✏️</button>
            </div>
            
            {/* Banner */}
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
                src="" 
                alt="Profile Banner"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: '4px',
                padding: '8px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                📷 Change Banner
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ position: 'relative', marginRight: '16px' }}>
                <img 
                  src={profileData.avatar} 
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
                  <h5 style={{ margin: '0 8px 0 0', fontSize: '20px', fontWeight: '600' }}>{profileData.name}</h5>
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
                    {renderStars(profileData.rating)}
                  </div>
                  <span style={{ fontSize: '14px' }}>{profileData.responseRate}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', textAlign: 'center' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ marginRight: '8px', fontSize: '18px' }}>📦</span>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '16px' }}>{profileData.products}</div>
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
                <div>
                  <div style={{ fontWeight: '600', fontSize: '16px' }}>Joined</div>
                  <div style={{ fontSize: '12px', color: '#6c757d' }}>{profileData.joinedDate}</div>
                </div>
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h5 style={{ margin: '0', fontSize: '18px', fontWeight: '600' }}>Highlight</h5>
              <button style={buttonStyle}>✏️</button>
            </div>
            
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', transition: 'transform 0.3s ease', transform: `translateX(-${currentSlide * 33.333}%)` }}>
                {highlights.map((item, index) => (
                  <div key={item.id} style={{ flex: '0 0 200px', marginRight: '16px' }}>
                    <div style={{ 
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      overflow: 'hidden'
                    }}>
                      <img 
                        src={item.image} 
                        alt={`Highlight ${index + 1}`}
                        style={{ 
                          width: '100%',
                          height: '120px', 
                          objectFit: 'cover'
                        }}
                      />
                      <div style={{ padding: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <strong style={{ marginRight: '4px' }}>{item.rating}</strong>
                            {renderStars(item.rating)}
                          </div>
                          <small style={{ color: '#6c757d' }}>({item.reviews})</small>
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

          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h6 style={{ margin: '0', fontSize: '16px', fontWeight: '600' }}>Promotions</h6>
              <button style={buttonStyle}>✏️</button>
            </div>
            
            {banners.map((banner, index) => (
              <div key={banner.id} style={{ marginBottom: '16px' }}>
                <div 
                  style={{ 
                    background: banner.bgColor,
                    borderRadius: '8px',
                    padding: '24px',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: '120px'
                  }}
                >
                  <div 
                    style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      width: '60px',
                      height: '60px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '50%'
                    }}
                  ></div>
                  
                  <div 
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '20px',
                      width: '40px',
                      height: '40px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '50%'
                    }}
                  ></div>

                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <h1 style={{ 
                      fontSize: '48px', 
                      fontWeight: 'bold', 
                      margin: '0 0 8px 0',
                      lineHeight: '1'
                    }}>{banner.title}</h1>
                    <h4 style={{ 
                      fontSize: '24px', 
                      fontWeight: 'bold',
                      margin: '0'
                    }}>{banner.subtitle}</h4>
                    
                    <div 
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '20px',
                        backgroundColor: '#28a745',
                        borderRadius: '20px',
                        padding: '6px 16px'
                      }}
                    >
                      <small style={{ fontWeight: 'bold', fontSize: '12px' }}>SALE</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>

          <div style={{ flex: '1 1 35%', minWidth: '280px' }}>
            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h5 style={{ margin: '0', fontSize: '18px', fontWeight: '600' }}>Description</h5>
                <button style={buttonStyle}>✏️</button>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ marginRight: '8px', fontSize: '16px' }}>📍</span>
                  <span style={{ color: '#6c757d' }}>Location</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '8px', fontSize: '16px' }}>✉️</span>
                  <span style={{ color: '#6c757d' }}>Contact</span>
                </div>
              </div>

              <div style={{ color: '#6c757d', lineHeight: '1.5' }}>
                <p>Store description and additional information would be displayed here...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
