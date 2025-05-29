import { useState } from "react";
import { Navbar } from "../Components/Navbar";
import { Link } from "react-router-dom";   
import { Carouselprods } from "../Components/Carouselprods";
import { Categorycard } from "../Components/CategoryCard"; 
import { Productpreview } from "../Components/Productpreview";
import { Footer } from "../Components/Footer";
import '../index.css';

export function Landingpage(){
    return(
        <>
        <Navbar/>
        <div className="container">
            <div className="row mt-1" >
                <Carouselprods/>
            </div>
            <div className="row ">
                <h3 className="col text-center rounded-1 p-4 m-2 mb-3 shadow-lg"
                style={{ 
                    fontSize: "2rem", 
                    background: "linear-gradient(to right, lightblue, #FE7743)", 
                    color: "white" 
                }}>
                    A  L  L  P  R  O  D  U  C  T  S
                </h3>
            </div>
            <div className="row">
                <Productpreview/>
                
            </div>
        </div>
        <Footer/>
        </>
        
    );
}
