
export function Categorycard({text, bgcolor, textcolor, photo, altname}){
    return(
        <div className="col-md-2 p-2 mt-2">
        <div className="card shadow btn btn-outline-secondary text-center fw-bold" style={{ color:textcolor}} >
           <img className="mx-auto d-block" src={photo} alt={altname} style={{width:"50px"}} />
            <div className="card-body">
                {text}
            </div>
        </div>
        </div>
        
    );
}