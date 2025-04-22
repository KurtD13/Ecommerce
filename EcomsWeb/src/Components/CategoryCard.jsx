
export function Categorycard({text, bgcolor, textcolor, photo, altname}){
    return(
        <div className="col-md-2 p-2 mt-2">
        <div className="card btn btn-outline-secondary text-center fw-bold" style={{ color:textcolor, boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}} >
           <img className="mx-auto d-block" src={photo} alt={altname} style={{width:"50px"}} />
            <div className="card-body">
                {text}
            </div>
        </div>
        </div>
        
    );
}