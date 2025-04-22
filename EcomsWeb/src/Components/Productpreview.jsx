import { Link } from "react-router-dom";   
import '../index.css';

export function Productpreview({imagepreview, altname, productname, price, sold}){
    return(
        <>
        <div className="col-md-2 px-1 py-1 ">
        <div className="card btn btn-outline-secondary me-2" style={{boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                <img src={imagepreview} alt={altname} />
                <div className="card-body">
                    <div className="row">
                            <div className="card-title text-start px-0 ellipsis" style={{fontSize:"20px"}}>{productname}</div>    
                    </div>
                    <div className="row">
                        <div className="col px-0">
                            <div className="card-text text-start" style={{fontSize:"15px"}}>{price}</div>
                          
                        </div>
                        <div className="col px-0">
                            <div className="card-text text-end" style={{fontSize:"15px"}}>{sold}</div>
                        </div>
                        
                    </div>
                </div>
        </div>
        </div>
        
        
        </>
        
    );
}