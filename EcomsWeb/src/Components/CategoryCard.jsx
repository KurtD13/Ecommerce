import GPU from "../assets/GPU.png";
import { useState, useEffect } from 'react';
import axios from 'axios';


export function Categorycard({text, bgcolor, textcolor, photo, altname}){
    const [categories, setCategories] = useState([]);
    useEffect (() =>{
        const fetchData = async () => {
            try {
                 const response = await axios.get('http://localhost:3000/api/category');
                 setCategories(response.data); //set the data from the local host
            } catch (err){
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    return(
        <>
            {categories.map((categorydata)=> (
                <div className="col-md-2 p-2 mt-2">
                <div className="card shadow btn btn-outline-secondary text-center fw-bold" style={{ color:textcolor}} >
                    {/* <img className="mx-auto d-block" src={categories} style={{width:"50px"}} /> */}
                <div className="card-body">
                    {categorydata.category}
                </div>
            </div>
            </div>
        ))}


        </>
        
        
    );
}