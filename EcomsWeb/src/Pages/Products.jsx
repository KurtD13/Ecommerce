import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "../Components/Navbar";
import { Productpreview } from "../Components/Productpreview";
import { Footer } from "../Components/Footer";

export function Products() {
    const { productId } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [variationData, setVariationData] = useState([]);
    const [shopData, setShopData] = useState([]);
    const [imageData, setImageData] = useState([]);
    const [reviewData, setReviewData] = useState([]);
    const [reviewerInfo, setReviewerInfo] = useState([]);
    const [quantity, setQuantity] = useState(1); // State for quantity
    const [selectedVariation, setSelectedVariation] = useState(null); // State for selected variation
    const userKey = localStorage.getItem("userkey"); // Get user key from localStorage
    const [previewImages, setPreviewImages] = useState([]);  

    
        const handleAddToCart = async () => {
        if (!userKey || userKey === "0") {
            alert("Please login first!");
            navigate("/login");
            return;
        }
        if (!product) {
            alert("Product not found.");
            return;
        }

        const ptotal = product.pprice * quantity; // Calculate total price

        const cartData = {
            userkey: userKey,
            pquantity: quantity,
            variation: selectedVariation || null, // Allow null
            productkey: product.pid,
            ptotal: ptotal,
        };

        try {
            const response = await axios.post("http://localhost:3000/api/cart", cartData);
            if (response.status === 200) {
                alert("Product added to cart successfully!");
            }
        } catch (err) {
            console.error("Error adding to cart:", err);
            alert("Failed to add product to cart. Please try again.");
        }
    };

    const [newReview, setNewReview] = useState({
        reviewtitle: "",
        reviewdesc: "",
        reviewimage1: "",
        reviewimage2: "",
        reviewimage3: "",
        reviewimage4: "",
        reviewscore: 5,
        productkey: productId, // assumes productId is from useParams()
        userkey: userKey,      // userKey from localStorage
        });

        const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/reviews", newReview);
            // Append new review to reviewData to trigger update in average rating
            setReviewData([...reviewData, response.data]);
            // Reset the review fields
            setNewReview({
            reviewtitle: "",
            reviewdesc: "",
            reviewimage1: "",
            reviewimage2: "",
            reviewimage3: "",
            reviewimage4: "",
            reviewscore: 5,
            productkey: productId,
            userkey: userKey,
            });
            // Hide the modal programmatically
            const modalEl = document.getElementById("writeReviewModal");
            const modal = bootstrap.Modal.getInstance(modalEl);
            modal.hide();
        } catch (err) {
            console.error("Error submitting review:", err);
            alert("Error submitting review. Please try again.");
        }
        };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/preview`);
                setPreviewImages(response.data); // Set the images data
            } catch (err) {
                setError(err.message);
            }
        };
        fetchProduct();
    }, []);

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
                const response = await axios.get("http://localhost:3000/api/image");
                setImageData(response.data || []); // Set the product data
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    

    const filteredpreviewImages = previewImages.filter(
        (p) => p.productkey?.toString() === productId?.toString()
    );

    const filteredImages = imageData.filter(
        (p) => p.productkey?.toString() === productId?.toString()
    );

    const filteredReviews = reviewData.filter(
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

    // Update product rating whenever roundedAverageScore (and product) changes
    useEffect(() => {
        if (product) {
            const updateProductRating = async () => {
                try {
                    await axios.put(`http://localhost:3000/api/product/${product.pid}`, {
                        pratings: roundedAverageScore,
                    });
                } catch (err) {
                    console.error("Error updating product rating:", err);
                }
            };
            updateProductRating();
        }
    }, [roundedAverageScore, product]);

    if (loading) {
        return <p>Loading product details...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>Error: {error}</p>;
    }

    if (!product) {
        return <p>Product not found.</p>;
    }
    // Compute whether the current user already submitted a review for this product
    const userReviewExists = reviewData.some(
    (review) =>
        review.productkey?.toString() === productId?.toString() &&
        review.userkey?.toString() === userKey?.toString()
    );

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                {/* Product Display */}
                <div className="card mb-4 position-relative shadow-lg" id="product-display">
                    <div className="card-body row">
                        <div className="col-md-5">
                            <div className="img-wrapper mb-3">
                                <div id="previewCarousel" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-indicators">
                                        {filteredpreviewImages.map((image, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            data-bs-target="#previewCarousel"
                                            data-bs-slide-to={index}
                                            className={index === 0 ? "active" : ""}
                                            aria-current={index === 0 ? "true" : ""}
                                            aria-label={`Slide ${index + 1}`}
                                        ></button>
                                        ))}
                                    </div>
                                    <div className="carousel-inner">
                                        {filteredpreviewImages.map((image, index) => (
                                        <div
                                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                                            key={image.pimages}
                                        >
                                            <img
                                            src={image.pimages}
                                            className="d-block w-100 img-fluid"
                                            alt={image.previewname}
                                            style={{ cursor: "pointer" }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#imageModal"
                                            />
                                        </div>
                                        ))}
                                    </div>
                                    <button
                                        className="carousel-control-prev"
                                        type="button"
                                        data-bs-target="#previewCarousel"
                                        data-bs-slide="prev"
                                    >
                                        <i class="bi bi-caret-left-fill text-dark"
                                            style={{ fontSize: "2rem", cursor: "pointer" }}
                                        ></i>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button
                                        className="carousel-control-next"
                                        type="button"
                                        data-bs-target="#previewCarousel"
                                        data-bs-slide="next"
                                    >
                                        <i class="bi bi-caret-right-fill text-dark"
                                            style={{ fontSize: "2rem", cursor: "pointer" }}
                                        ></i>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                    </div>
                                
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
                            {/* Variation Selection */}
                            <div className="d-flex align-items-center mb-3" style={{ gap: "10px" }}>
                                <div style={{ minWidth: "100px", fontWeight: 500 }}>Variation:</div>
                                <div>
                                    {filteredVariation.length > 0 ? (
                                        filteredVariation.map((variation) => (
                                            <button
                                                type="button"
                                                className={`btn btn-outline-secondary btn-sm me-1 ${
                                                    selectedVariation === variation.pvid ? "active" : ""
                                                }`}
                                                key={variation.pvid}
                                                onClick={() => setSelectedVariation(variation.pvid)}
                                            >
                                                {variation.pvname}
                                            </button>
                                        ))
                                    ) : (
                                        <p className="text-muted">No variations available</p>
                                    )}
                                </div>
                            </div>
                            {/* Quantity Input */}
                            <div className="d-flex align-items-center mb-3" style={{ gap: "10px" }}>
                                <div style={{ minWidth: "100px", fontWeight: 500 }}>Quantity:</div>
                                <div>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        value={quantity}
                                        min="1"
                                        max={product?.stock || 1}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        style={{ width: "80px" }}
                                    />
                                </div>
                            </div>
                            <button className="btn me-2" style={{ background: "#FE7743", color: "#EFEEEA"  }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e8602c")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FE7743")}
                            onClick={handleAddToCart}>
                                Add to Cart
                            </button>
                            <button className="btn btn-success">Buy Now</button>
                        </div>
                    </div>
                </div>

                {/* Seller Info */}
                <div className="card mb-4 shadow-lg" id="seller-info">
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
                <div className="card mb-4 shadow-lg" id="product-information">
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
                            {   filteredImages.map((image) => (
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
                <div className="card mb-4 shadow-lg" id="ratings-reviews">
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <h5>Ratings & Reviews</h5>
                            </div>
                            <div className="col text-end">
                                <button
                                    className="btn btn-outline-success btn-sm"
                                    data-bs-toggle="modal"
                                    data-bs-target="#writeReviewModal"
                                    >
                                    Write a Review
                                </button>
                            </div>
                        </div>
                        
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
                                    <div className="col-md-3" key={reviewId}>
                                        <div
                                            className="card p-2 shadow-lg"
                                            style={{ minHeight: "200px", maxHeight: "200px", overflowY: "auto" }}
                                        >
                                            <div className="row">
                                                
                                                <div className="d-flex align-items-center mb-2">
                                                {reviewer ? (
                                                    <>
                                                        <img
                                                            src={reviewer.consumerimage ||  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}
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
                                                <div className="row">
                                                    <div className="col">
                                                        <small className="text-muted ps-1 pe-1"> {review.reviewscore}</small>
                                                    {"★".repeat(review.reviewscore)}
                                                    {"☆".repeat(5 - review.reviewscore)}
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
                                            <p className="small fw-bold">{review.reviewtitle}</p>
                                            <div className="card p-1">
                                                <p className="small">{review.reviewdesc}</p>
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
                <div className="card mb-4 shadow-lg" id="recommendation">
                    <div className="card-body">
                        <h5>Recommendation</h5>
                        <p className="text-muted">You might also like:</p>
                        <div className="row d-flex ms-1">
                            <Productpreview filterTerm={product.pname} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="writeReviewModal" tabIndex="-1" aria-labelledby="writeReviewModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <form className="modal-content" onSubmit={handleSubmitReview}>
                <div className="modal-header">
                    <h5 className="modal-title" id="writeReviewModalLabel">Write a Review</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="mb-3">
                    <label className="form-label">Review Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newReview.reviewtitle}
                        onChange={(e) => setNewReview({ ...newReview, reviewtitle: e.target.value })}
                        required
                    />
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Review Description</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={newReview.reviewdesc}
                        onChange={(e) => setNewReview({ ...newReview, reviewdesc: e.target.value })}
                        required
                    ></textarea>
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Review Image URL 1</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newReview.reviewimage1}
                        onChange={(e) => setNewReview({ ...newReview, reviewimage1: e.target.value })}
                    />
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Review Image URL 2</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newReview.reviewimage2}
                        onChange={(e) => setNewReview({ ...newReview, reviewimage2: e.target.value })}
                    />
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Review Image URL 3</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newReview.reviewimage3}
                        onChange={(e) => setNewReview({ ...newReview, reviewimage3: e.target.value })}
                    />
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Review Image URL 4</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newReview.reviewimage4}
                        onChange={(e) => setNewReview({ ...newReview, reviewimage4: e.target.value })}
                    />
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Review Score (1-5)</label>
                    <input
                        type="number"
                        className="form-control"
                        value={newReview.reviewscore}
                        onChange={(e) => setNewReview({ ...newReview, reviewscore: Number(e.target.value) })}
                        min="1"
                        max="5"
                        required
                    />
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" className="btn btn-primary">Submit Review</button>
                </div>
                </form>
            </div>
            </div>

            <Footer/>
        </>
    );
}