

export function Carouselprods(){
    return(
        <>
        <div id="carouselExampleCaptions" className="carousel slide h-50">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner" >
                <div className="carousel-item active">
                <img src="https://cf.shopee.ph/file/ph-11134258-7rase-m81cw67d8dy639_xxhdpi" style={{maxHeight:'400px', objectFit:"cover"}} className="d-block w-100" alt="..."></img>
                <div className="carousel-caption d-none d-md-block">
                    <h5>First slide label</h5>
                    <p>Some representative placeholder content for the first slide.</p>
                </div>
                </div>
                <div className="carousel-item">
                <img src="https://img.lazcdn.com/g/tps/imgextra/i3/O1CN01mNRsAq1TQiVT5IuIH_!!6000000002377-0-tps-1976-688.jpg_2200x2200q80.jpg_.avif" style={{maxHeight:'400px', objectFit:"cover"}} className="d-block w-100" alt="..."></img>
                <div className="carousel-caption d-none d-md-block">
                    <h5>Second slide label</h5>
                    <p>Some representative placeholder content for the second slide.</p>
                </div>
                </div>
                <div className="carousel-item">
                <img src="https://pulsephotography.com.au/wp-content/uploads/2017/10/16x9-placeholder.jpg" style={{maxHeight:'400px',  objectFit:"cover"}} className="d-block w-100" alt="..."></img>
                <div className="carousel-caption d-none d-md-block">
                    <h5>Third slide label</h5>
                    <p>Some representative placeholder content for the third slide.</p>
                </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
            </div>
        </>
    );
}