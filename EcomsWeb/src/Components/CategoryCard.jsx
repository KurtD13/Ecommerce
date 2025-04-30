import GPU from "../assets/GPU.png";

export function Categorycard({text, bgcolor, textcolor, photo, altname}){
    const categories =[
        {cName:"CPU", cImage:GPU}
    ] // To be replaced with 
    return(
        <>
            {categories.map((categories)=> (
                <div className="col-md-2 p-2 mt-2">
                <div className="card shadow btn btn-outline-secondary text-center fw-bold" style={{ color:textcolor}} >
                    <img className="mx-auto d-block" src={categories.cImage} style={{width:"50px"}} />
                <div className="card-body">
                    {categories.cName}
                </div>
            </div>
            </div>
        ))}


        </>
        
        
    );
}