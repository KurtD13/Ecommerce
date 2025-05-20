import { useState, useEffect } from 'react';
import axios from 'axios';

export function Categorycard({ textcolor }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/category');
        setCategories(response.data); // Set the data from the local host
      } catch (err) {
        console.error("Error fetching categories:", err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {categories.slice(0, 6).map((categorydata, index) => ( // Limit to 6 categories
        <div className="col-md-2 p-2 mt-2" key={index}>
          <div
            className="card shadow btn btn-outline-secondary text-center fw-bold"
            style={{ color: textcolor }}
          >
            <div className="card-body">
              {categorydata.category}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}