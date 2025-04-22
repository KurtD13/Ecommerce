import { useState } from "react";
import { Navbar } from "../Components/Navbar";
import { Link } from "react-router-dom";   
import { Carouselprods } from "../Components/Carouselprods";
import { Categorycard } from "../Components/CategoryCard"; 
import { Productpreview } from "../Components/Productpreview";
import { Footer } from "../Components/Footer";
import Iph from "../assets/Iphonephoto.png";
import GPU from "../assets/GPU.png";
import '../index.css';

export function Landingpage(){
    
    return(
        <>
        <Navbar/>
        <div className="container">
            <div className="row mt-1" >
                <Carouselprods/>
            </div>
            <div className="row">
                
                <Categorycard  
                text={"Category1"} 
                bgcolor={"#FE7743"} 
                textcolor={"dark"} 
                photo={GPU} 
                altname={"GPU"}>
                </Categorycard>

                <Categorycard  
                text={"Category1"} 
                bgcolor={"#FE7743"} 
                textcolor={"dark"} 
                photo={GPU} 
                altname={"GPU"}>
                </Categorycard>

                <Categorycard  
                text={"Category1"} 
                bgcolor={"#FE7743"} 
                textcolor={"dark"} 
                photo={GPU} 
                altname={"GPU"}>
                </Categorycard>

                <Categorycard  
                text={"Category1"} 
                bgcolor={"#FE7743"} 
                textcolor={"dark"} 
                photo={GPU} 
                altname={"GPU"}>
                </Categorycard>

                <Categorycard  
                text={"Category1"} 
                bgcolor={"#FE7743"} 
                textcolor={"dark"} 
                photo={GPU} 
                altname={"GPU"}>
                </Categorycard>

                <Categorycard  
                text={"Category1"} 
                bgcolor={"#FE7743"} 
                textcolor={"dark"} 
                photo={GPU} 
                altname={"GPU"}>
                </Categorycard>
                
                
            </div>
            <div className="row ">
                <h3 className="col text-center bg-secondary rounded-1 p-4 m-2 mb-3 shadow-lg">
                    R a n d o m P r o d u c t s
                </h3>
            </div>
            <div className="row">
                <Productpreview 
                imagepreview={Iph} 
                productname={"Iphone 16 Pro Max"} 
                price={"₱ " + 100000}
                sold={2.5 + "k sold"}
                ></Productpreview>

<Productpreview 
                imagepreview={Iph} 
                productname={"Iphone 16 Pro Max"} 
                price={"₱ " + 100000}
                sold={2.5 + "k sold"}
                ></Productpreview>
                                <Productpreview 
                imagepreview={Iph} 
                productname={"Iphone 16 Pro Max"} 
                price={"₱ " + 100000}
                sold={2.5 + "k sold"}
                ></Productpreview>
                                <Productpreview 
                imagepreview={Iph} 
                productname={"Iphone 16 Pro Max"} 
                price={"₱ " + 100000}
                sold={2.5 + "k sold"}
                ></Productpreview>
                                <Productpreview 
                imagepreview={Iph} 
                productname={"Iphone 16 Pro Max"} 
                price={"₱ " + 100000}
                sold={2.5 + "k sold"}
                ></Productpreview>
                <Productpreview 
                imagepreview={Iph} 
                productname={"Iphone 16 Pro Max"} 
                price={"₱ " + 100000}
                sold={2.5 + "k sold"}
                ></Productpreview>
                
            </div>
        </div>
        <Footer/>
        </>
        
    );
}
