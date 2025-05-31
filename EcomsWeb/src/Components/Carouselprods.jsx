import { useEffect, useState } from "react";
import axios from "axios";


export function Carouselprods(){
    const[shopbanners, setshopbanners] = useState([]);
    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/shop/banners');
        setshopbanners(response.data); // Set the data from the local host
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, []);
  console.log("shopbanner:", shopbanners);
    return(
        <>
        <div id="carouselExampleCaptions" className="carousel slide h-50" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner" >
                <div className="carousel-item active">
                <img src="https://cf.shopee.ph/file/ph-11134258-7rase-m81cw67d8dy639_xxhdpi" style={{maxHeight:'400px', objectFit:"cover"}} className="d-block w-100" alt="..."></img>
                <div className="carousel-caption d-none d-md-block"></div>
                </div>
                
                {shopbanners.map((banner)=>(
                <div className="carousel-item">
                <img src={banner.shopbanner}   style={{maxHeight:'400px', objectFit:"cover"}} className="d-block w-100" alt="..."></img>
                <div className="carousel-caption d-none d-md-block">
                   
                </div>
                </div>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
            </div>
        </>
    );
}