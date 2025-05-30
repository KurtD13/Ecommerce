import { useState } from "react";
import { Navbar } from "../Components/Navbar";
import { Link } from "react-router-dom"
import { Footer } from "../Components/Footer";
import { useLocation } from 'react-router-dom';
import { Productpreview } from "../Components/Productpreview";
import Iph from "../assets/Iphonephoto.png"
import { Pricerange } from "../Components/Pricerange";
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

export function Resultpage(){
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    
    return(
        <>
            <Navbar/>
            <div className="container">
                <div className="row my-3">

                    <div className="">
                         <div className="card p-2">
                            <div className="container">
                                <p className="py-3">Search Results for:  {query}</p>
                            </div>
                        </div>
                        <div className="card mt-2 p-2 d-flex" style={{minHeight: "410px"}}>
                            <div className="row ms-1">
                                <Productpreview filterTerm={query}/>
                                
                            </div>
                           
                            
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer/>
        </>
        
    );
}
