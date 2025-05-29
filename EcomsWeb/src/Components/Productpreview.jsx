import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export function Productpreview({ filterTerm = "" }) {
  const [productData, setProductData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/product");
        setProductData(response.data); // Set the product data
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchshopData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/shop");
        setShopData(response.data); // Set the shop data
      } catch (err) {
        setError(err.message);
      }
    };
    fetchshopData();
  }, []);

  // Filter products based on shop availability and search term
  const filtered = productData.filter((product) => {
    const shop = shopData.find((shop) => shop.shopid === product.shopkey);
    return (
      shop?.is_available !== false && // Exclude products from unavailable shops
      (product.pname.toLowerCase().includes(filterTerm.toLowerCase()) ||
        product.pdesc?.toLowerCase().includes(filterTerm.toLowerCase()))
    );
  });

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  const formatPrice = (price) => {
  return `₱ ${Number(price).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};


  return (
    <>
      {filtered.map((productInfo) => (
        productInfo.is_available && (
          <div className="col-sm-2 px-1 py-1" key={productInfo.pid}>
            <Link
              to={`/products/${productInfo.pid}`} // Link to the product page with the product ID
              className="card btn btn-outline-dark me-2"
              style={{
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                minHeight:
                  "18rem"
              }}
              
            >
              <img
                src={productInfo.pimageurl}
                style={{ minHeight: "10rem", maxHeight: "10rem" }}
                className="rounded-2"
                alt={productInfo.pname}
              />
              <div className="card-body">
                <div className="row">
                  <div
                    className="card-title text-start px-0 ellipsis fw-bold"
                    style={{ fontSize: "20px" }}
                  >
                    {productInfo.pname}
                  </div>
                </div>
                <div className="row">
                    <div className="col-8 px-0">
                    <div
                      className="card-text text-start"
                      style={{ fontSize: "15px" }}
                    >
                      {(productInfo.pratings > 0) ?
                     ( productInfo.pratings + " " +
                       "★".repeat(productInfo.pratings))
                      : "No ratings yet"}
                    </div>
                     </div>
                </div>
                <div className="row">
                  
                    <div className="col px-0">
                    <div
                      className="card-text text-start"
                      style={{ fontSize: "17px" }}
                    >
                      {formatPrice(productInfo.pprice)}
                    </div>
                 
                  </div>
                  <div className="col-4 px-0">
                    <div
                      className="card-text text-end"
                      style={{ fontSize: "15px" }}
                    >
                      {productInfo.ptotalsales} sold
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )
      ))}
    </>
  );
}