
export function Pricerange(){

    return(
        <>
                <div className="container mt-3">
                    <div className="row">
                        <div className="px-3">Price Range</div>
                    </div>
                    <div className="row mx-1 my-1">
                        <div className="col-5 my-0 p-0 ">
                            <input className="form-control" 
                                type="text"
                                placeholder="₱ MIN"
                                ></input>
                        </div>
                        <div className="col-2 px-1">
                        <i className="bi bi-arrow-right " style={{fontSize:"23px"}}></i>
                        </div>
                        <div className="col-5 my-0 p-0 ">
                            <input className="form-control " 
                            type="text"
                            placeholder="₱ MAX"
                            ></input>
                        </div>
                    </div>
                    <div className="row mx-1 my-2">
                        <button className="btn text-light fw-bold" style={{backgroundColor:"#FE7743"}}>Apply</button>
                    </div>
                </div> 
        </>
    );

}