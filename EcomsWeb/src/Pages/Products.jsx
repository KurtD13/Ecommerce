import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "../Components/Navbar";
import { Productpreview } from "../Components/Productpreview";

export function Products() {
    const { productId } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [variationData, setVariationData] = useState([]);
    const [colorData, setColorData] = useState([]);
    const [shopData, setShopData] = useState([]);
    const [imageData, setImageData] = useState([]);
    const [reviewData, setReviewData] = useState([]);
    const [reviewerInfo, setReviewerInfo] = useState([]);
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/product/${productId}`);
                setProduct(response.data); // Set the product data
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/variation");
                setVariationData(response.data || []); // Set the product data
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/shop");
                setShopData(response.data || []);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/user");
                setReviewerInfo(response.data || []);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/reviews");
                setReviewData(response.data || []);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/color");
                setColorData(response.data || []);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/image");
                setImageData(response.data || []); // Set the product data
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    const filteredImages = imageData.filter(
        (p) => p.productkey?.toString() === productId?.toString()
    );

    const filteredReviews = reviewData.filter(
        (p) => p.productkey?.toString() === productId?.toString()
    );

    const filteredColor = colorData.filter(
        (p) => p.productkey?.toString() === productId?.toString()
    );

    const filteredVariation = variationData.filter(
        (p) => p.productkey?.toString() === productId?.toString()
    );

    const filteredShop = shopData.filter(
        (p) => p.shopid?.toString() === product?.shopkey?.toString()
    );
        // Calculate the average review score
        const validReviewScores = filteredReviews
        .map((review) => Number(review.reviewscore)) // Convert to number
        .filter((score) => typeof score === "number" && !isNaN(score)); // Ensure valid numeric scores

        const averageReviewScore =
        validReviewScores.length > 0
            ? validReviewScores.reduce((sum, score) => sum + score, 0) / validReviewScores.length
            : 0;

        // Round the average score to one decimal place
        const roundedAverageScore = Math.round(averageReviewScore * 10) / 10;

        // Generate stars based on the average score
        const filledStars = Math.floor(averageReviewScore); // Number of solid stars
        const emptyStars = 5 - filledStars; // Number of hollow stars
    if (loading) {
        return <p>Loading product details...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>Error: {error}</p>;
    }

    if (!product) {
        return <p>Product not found.</p>;
    }

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                {/* Product Display */}
                <div className="card mb-4 position-relative" id="product-display">
                    <div className="card-body row">
                        <div className="col-md-5">
                            <div className="img-wrapper mb-3">
                                <img
                                    src={product.pimageurl}
                                    className="img-fluid"
                                    alt={product.pname}
                                    style={{ cursor: "pointer" }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#imageModal"
                                />
                            </div>
                            <div className="d-flex gap-2">
                                {product.thumbnails?.map((thumbnail, index) => (
                                    <div className="thumbnail" key={index}>
                                        <img src={thumbnail} alt={`Thumbnail ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="row">
                                <div className="col">
                                    <h4>{product.pname}</h4>
                                </div>
                                <div className="col text-end">
                                    <button className="btn btn-sm btn-outline-danger report-icon" title="Report">
                                        Report
                                    </button>
                                </div>
                            </div>

                            {/* Updated Ratings Section */}
                            <p>
                            <span className="text-warning star">
                                {"★".repeat(filledStars)}{/* Solid stars */}
                                {"☆".repeat(emptyStars)}{/* Hollow stars */}
                            </span>
                            <span className="text-muted ms-2">
                                {roundedAverageScore} / 5 ({filteredReviews.length} reviews)
                            </span>
                            </p>
                            <h3 className="text-danger mb-3">₱{product.pprice}</h3>
                            <div className="mb-3">
                                <div className="d-flex align-items-center mb-1">
                                    <div style={{ width: "100px", fontWeight: 500 }}>Ship From</div>
                                    {filteredShop.map((shop) => (
                                        <div className="text-muted ps-2">
                                            {"Philippines, " + shop.shippinglocation || "Philippines"}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-3" style={{ gap: "10px" }}>
                                <div style={{ minWidth: "100px", fontWeight: 500 }}>Color:</div>
                                <div>
                                    {filteredColor.length > 0 ? (
                                        filteredColor.map((color) => (
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary btn-sm me-1"
                                                key={color.colorid}
                                            >
                                                {color.colorname}
                                            </button>
                                        ))
                                    ) : (
                                        <p className="text-muted">No colors available</p>
                                    )}
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-3" style={{ gap: "10px" }}>
                                <div style={{ minWidth: "100px", fontWeight: 500 }}>Capacity:</div>
                                <div>
                                    {filteredVariation.length > 0 ? (
                                        filteredVariation.map((variation, index) => (
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary btn-sm me-1"
                                                key={index}
                                            >
                                                {variation.pvname}
                                            </button>
                                        ))
                                    ) : (
                                        <p className="text-muted">No variations available</p>
                                    )}
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-3" style={{ gap: "10px" }}>
                                <div style={{ minWidth: "100px", fontWeight: 500 }}>Quantity:</div>
                                <div>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        defaultValue="1"
                                        min="1"
                                        max={product.stock}
                                        style={{ width: "80px" }}
                                    />
                                </div>
                            </div>
                            <button className="btn btn-outline-secondary me-2">Add to Cart</button>
                            <button className="btn btn-success">Buy Now</button>
                        </div>
                    </div>
                </div>

                
                {/* Seller Info */}
                <div className="card mb-4" id="seller-info">
                    {filteredShop.map((shop) => (
                        <div className="card-body d-flex align-items-center">
                            <img
                                src={shop.shoplogo || "https://cdn-icons-png.flaticon.com/512/2474/2474161.png"}
                                className="pfp me-3 rounded-circle"
                                alt="Seller"
                                style={{ width: "50px", height: "50px" }}
                            />
                            <div>
                                <strong>{shop.shopname}</strong>
                                <br />
                                <span className="text-muted">{product.sellerType}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Product Information */}
                <div className="card mb-4" id="product-information">
                    <div className="card-body">
                        <div className="row d-flex">
                            <div className="col">
                                <h5>Product Information</h5>
                            </div>
                            <div className="col text-end">
                                <button
                                    className="btn btn-outline-secondary btn-sm"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#productInfoCollapse"
                                    aria-expanded="false"
                                    aria-controls="productInfoCollapse"
                                >
                                    View more...
                                </button>
                            </div>
                        </div>
                        <p className="text-muted">{product.pdesc}</p>
                        <div className="collapse" id="productInfoCollapse">
                            {filteredImages.map((image) => (
                                <img
                                    src={image.pimage}
                                    className="img-fluid mb-2"
                                    alt="Product Detail"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Ratings & Reviews */}
                <div className="card mb-4" id="ratings-reviews">
                    <div className="card-body">
                        <h5>Ratings & Reviews</h5>
                        <div className="row">
                            {filteredReviews.map((review, index) => {
                                const reviewId = review.reviewid || `fallback-${index}`;
                                const reviewer = reviewerInfo.find(
                                    (r) => r.consumerid?.toString() === review.userkey?.toString()
                                );
                                const reviewImages = [
                                    review.reviewimage1,
                                    review.reviewimage2,
                                    review.reviewimage3,
                                    review.reviewimage4,
                                ].filter((img) => img);

                                return (
                                    <div className="col-md-2" key={reviewId}>
                                        <div
                                            className="card p-2"
                                            style={{ minHeight: "200px", maxHeight: "200px", overflowY: "auto" }}
                                        >
                                            <div className="d-flex align-items-center mb-2">
                                                {reviewer ? (
                                                    <>
                                                        <img
                                                            src={reviewer.consumerimage}
                                                            className="rounded-circle me-2"
                                                            style={{ width: "40px", height: "40px" }}
                                                            alt="Reviewer"
                                                        />
                                                        {reviewer.consumerfirstname || "Unknown"}
                                                    </>
                                                ) : (
                                                    <p className="text-muted">Unknown Reviewer</p>
                                                )}
                                            </div>
                                            <p className="small">{review.reviewdesc}</p>
                                            <div className="text-warning">
                                                <small className="text-muted">{review.reviewscore} </small>
                                                {"★".repeat(review.reviewscore)}
                                                {"☆".repeat(5 - review.reviewscore)}
                                            </div>
                                            {reviewImages.length > 0 && (
                                                <button
                                                    className="btn btn-outline-secondary btn-sm mt-2"
                                                    data-bs-toggle="modal"
                                                    data-bs-target={`#reviewImagesModal-${reviewId}`}
                                                >
                                                    View Images
                                                </button>
                                            )}

                                            {/* Modal for Review Images */}
                                            <div
                                                className="modal fade"
                                                id={`reviewImagesModal-${reviewId}`}
                                                tabIndex="-1"
                                                aria-hidden="true"
                                            >
                                                <div className="modal-dialog modal-dialog-centered modal-lg">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title">Review Images</h5>
                                                            <button
                                                                type="button"
                                                                className="btn-close"
                                                                data-bs-dismiss="modal"
                                                                aria-label="Close"
                                                            ></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div className="row">
                                                                {reviewImages.map((image, imgIndex) => (
                                                                    <div className="col-md-6 mb-3" key={imgIndex}>
                                                                        <img
                                                                            src={image}
                                                                            className="img-fluid rounded"
                                                                            alt={`Review Image ${imgIndex + 1}`}
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Recommendation */}
                <div className="card mb-4" id="recommendation">
                    <div className="card-body">
                        <h5>Recommendation</h5>
                        <p className="text-muted">You might also like:</p>
                        <div className="row d-flex ms-1">
                            <Productpreview filterTerm={product.pname} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Carousel Modal */}
            <div className="modal fade" id="imageModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content bg-dark text-white">
                        <div className="modal-body p-0">
                            <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    {product.images?.map((image, index) => (
                                        <div
                                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                                            key={index}
                                        >
                                            <img src={image} className="d-block w-100 img-fluid" alt={`Product Image ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                                <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target="#productCarousel"
                                    data-bs-slide="prev"
                                >
                                    <span className="carousel-control-prev-icon"></span>
                                </button>
                                <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target="#productCarousel"
                                    data-bs-slide="next"
                                >
                                    <span className="carousel-control-next-icon"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
}