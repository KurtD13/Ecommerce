import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export function Productpreview({ filterTerm = "" }) {
  const [productData, setProductData] = useState([]);
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

  const filtered = productData.filter(
    (p) =>
      p.pname.toLowerCase().includes(filterTerm.toLowerCase()) ||
      p.pdesc?.toLowerCase().includes(filterTerm.toLowerCase())
  );

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <>
      {filtered.map((productInfo) => (
        productInfo.is_available && (
          <div className="col-sm-2 px-1 py-1" key={productInfo.pid}>
          <Link
            to={`/products/${productInfo.pid}`} // Link to the product page with the product ID
            className="card btn btn-outline-secondary me-2"
            style={{
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <img
              src={productInfo.pimageurl}
              style={{ minHeight: "10rem", maxHeight: "10rem" }}
              alt={productInfo.pname}
            />
            <div className="card-body">
              <div className="row">
                <div
                  className="card-title text-start px-0 ellipsis"
                  style={{ fontSize: "20px" }}
                >
                  {productInfo.pname}
                </div>
              </div>
              <div className="row">
                <div className="col px-0">
                  <div
                    className="card-text text-start"
                    style={{ fontSize: "15px" }}
                  >
                    ₱{productInfo.pprice}
                  </div>
                </div>
                <div className="col px-0">
                  <div
                    className="card-text text-end"
                    style={{ fontSize: "15px" }}
                  >
                    Sold: {productInfo.ptotalsales}
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