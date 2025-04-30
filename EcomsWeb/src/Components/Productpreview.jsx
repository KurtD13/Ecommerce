import { Link } from "react-router-dom";   
import Iph from "../assets/Iphonephoto.png";
import '../index.css';



export function Productpreview({}){
    const productInfo = [
        {pId:"1", pName:"Iphone 16 Pro Max", pPrice:100000, pSold:1, imagepreview:Iph},
        {pId:"2", pName:"Iphone 16 Pro Max", pPrice:100000, pSold:1, imagepreview:Iph },
        {pId:"3", pName:"Iphone 16 Pro Max", pPrice:100000, pSold:1, imagepreview:Iph }
    ]
    return(
        <>
        {productInfo.map((productInfo) => (
        <div className="col-sm-2 px-1 py-1 ">
        <Link to='/products' className="card btn btn-outline-secondary me-2" style={{boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                <img src={productInfo.imagepreview} />
                <div className="card-body">
                    <div className="row">
                        <div className="card-title text-start px-0 ellipsis" style={{fontSize:"20px"}}>{productInfo.pName}</div>    
                            </div>
                            <div className="row">
                                <div className="col px-0">
                                    <div className="card-text text-start" style={{fontSize:"15px"}}>{productInfo.pPrice}</div>

                                </div>
                                <div className="col px-0">
                                    <div className="card-text text-end" style={{fontSize:"15px"}}>Sold: {productInfo.pSold}</div>
                                </div>
                                
                            </div>
                        </div>
                    </Link>
        </div>

        ))}
            
        
        
        
        </>
        
    );
}