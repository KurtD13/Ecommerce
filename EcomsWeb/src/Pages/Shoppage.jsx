import React, { useEffect, useState } from 'react';
import { Footer } from "../Components/Footer";
import { Navbar } from "../Components/Navbar"; 
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';



export function Shoppage() {
  const { shopid } = useParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [shopData, setShopData] = useState([]);
  const [product, setProduct] = useState([]);
  const shopKey = shopid;
  
const isTTSEnabled = JSON.parse(localStorage.getItem("isTTSEnabled")) || false;
    const speak = (text) => {
      if (!isTTSEnabled) return;
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    };


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

  return (
    <>
      <Navbar />
      <div className="d-flex flex-column pt-4">
        <div className="container">
          <div className="row">
            {/* Left Column: Banner */}
            <div className="col-md-6">
              <div className="card mb-4 shadow-sm shadow-lg" >
      
                  <h5 className="card-title mb-0 m-3">Banner</h5>
              
                <div className="card-body">
                  {shopData.map((shop) => (
                    <div key={shop.shopid} onClick={() => speak("Welcome to "+ shop.shopname)}>
                      <div className="mb-3">
                        <img
                          src={shop.shopbanner || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMa-rZMEw5mFIOl2Is7nTQsQUQ5fS8qAAVsQ&s"}
                          alt="Profile Banner"
                          className="img-fluid rounded"
                          style={{ minheight: "300px", maxheight: "300px", width: "100%" }}
                        />
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <img
                          src={shop.shoplogo}
                          alt="Profile"
                          className="rounded-circle me-3"
                          style={{ width: "60px", height: "60px" }}
                        />
                        <div>
                          <h5 className="mb-0">{shop.shopname}</h5>
                          <small className="text-muted">
                            {roundedAverageScore}{" "}
                            <span className="text-warning">
                              {"★".repeat(Math.floor(roundedAverageScore))}
                            </span>
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Description and Highlight */}
            <div className="col-md-6 mb-4">
              {/* Description */}
              <div className="card mb-4 shadow-lg">
        
                  <h5 className="card-title mb-0 m-3">Description</h5>
           
                <div className="card-body">
                  {shopData.map((shop) => (
                    <div key={shop.shopid} onClick={() => speak("Ship from "+ shop.shippinglocation + "Description: " + shop.shopdesc)}>
                      <p className="mb-2">
                        <span className="fw-bold">📍 Shipping Location:</span>{" "}
                        {shop.shippinglocation}
                      </p>
                      <p className="text-muted">{shop.shopdesc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlight */}
              <div className="card shadow-lg">
      
                  <h5 className="card-title m-3 mb-0">Highlight</h5>
     
                <div className="card-body">
                  <div className="d-flex overflow-hidden">
                    <div
                      className="d-flex"
                      style={{
                        transform: `translateX(-${currentSlide * 33.333}%)`,
                        transition: "transform 0.3s ease",
                      }}
                    >
                      {product.map((products) => (
                        <Link
                          to={`/products/${products.pid}`}
                          key={products.pid}
                          onClick={() => speak("Opening " + products.pname)}
                          className="card me-3 shadow-sm"
                          style={{ flex: "0 0 200px", textDecoration: "none", color: "inherit" }}
                        >
                          <img
                            src={products.pimageurl}
                            alt={products.pname}
                            className="card-img-top"
                            style={{ height: "180px", objectFit: "cover" }}
                          />
                          <div className="card-body">
                            <h6 className="card-title">{products.pname}</h6>
                            <div className="d-flex align-items-center">
                              <strong className="me-1">{(products.pratings == 0) ? (<span className="fw-normal">No Ratings Yet</span>):(products.pratings)}</strong>
                              <span className="text-warning">
                                {"★".repeat(products.pratings)}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <button
                    className="btn btn-outline-secondary border-0 position-absolute top-50 start-0 translate-middle-y"
                    onClick={prevSlide}
                  >
                  <i class="bi bi-arrow-left-circle"></i>
                  </button>
                  <button
                    className="btn btn-outline-secondary border-0 position-absolute top-50 end-0 translate-middle-y"
                    onClick={nextSlide}
                  >
                   <i class="bi bi-arrow-right-circle"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}