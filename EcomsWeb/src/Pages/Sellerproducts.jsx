import Sidebar from "../Components/Sidebar";
import Header from "../Components/Sellerheader";
import React, { useState, useEffect } from 'react';
import axios from "axios";


export function Sellerproducts(){
    
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [activeTab, setActiveTab] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [filterOption, setFilterOption] = useState('');
    const [variationInfo, setVariationInfo] = useState([]);
    const [productsInfo, setProductsInfo] = useState([]);
    const shopKey = localStorage.getItem("shopkey");
    const userkey = localStorage.getItem("userkey");
    const [selectedPid, setSelectedPid] = useState("");     
    const [selectedpvid, setSelectedpvid] = useState("");  
    const [selectedImageId, setSelectedImageId] = useState(null);
    const [selectedPreviews, setSelectedPreviews] = useState(null);
   
    const handleSelect = (pimageid) => {
            setSelectedImageId(pimageid === selectedImageId ? null : pimageid); // toggle selection
          };

    const handleSelectPreview = (imageid) => {
      setSelectedPreviews(imageid === selectedPreviews ? null : imageid); // toggle selection
    };

     const handleSelectVariation = (pvid) => {
      setSelectedpvid(pvid === selectedpvid ? null : pvid); // toggle selection
    };


    const [newProduct, setNewProduct] = useState({
    pname: "",
    pprice: "",
    pimageurl: "",
    pdesc: "",
    stock: 0,
    shopkey: shopKey
    });

    const [newVariation, setNewVariation] = useState({
    pvname: "", 
    pvimage: "",
    productkey: ""
    });

    const [updateProduct, setUpdateProduct] = useState({
    pname : "", 
    pprice : "", 
    pdesc : "", 
    pimageurl : "", 
    stock : "", 
    is_available : true
    });
    const handleCreateProduct = async (e) => {
      e.preventDefault();
      try {
        // Create the shop
        const response = await axios.post("http://localhost:3000/api/product", newProduct);
        if (response.status === 200) {
          alert("Product created successfully!");

        }
      } catch (err) {
        console.error("Error creating shop:", err);
        alert("Failed to create shop. Please try again.");
      }
    };

    const handleCreateVariation = async (e) => {
      e.preventDefault();
      try {
        // Create the shop
        const response = await axios.post("http://localhost:3000/api/variation", newVariation);
        if (response.status === 200) {
          alert("Variation created successfully!");

        }
      } catch (err) {
        console.error("Error creating Variation:", err);
        alert("Failed to create Variation. Please try again.");
      }
    };

     const [newImage, setNewImage] = useState({
      pimagename: "", 
      pimage: "",
      productkey:""
      });


    const handleAddImage = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:3000/api/image", newImage);
        if (response.status === 200) {
          alert("Image created successfully!");

        }
      } catch (err) {
        console.error("Error creating Image:", err);
        alert("Failed to create Image. Please try again.");
      }
    };

    const [newPreview, setNewPreview] = useState({
      previewname: "", 
      pimages: "",
      productkey:""
      });


    const handleAddPreview = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:3000/api/preview", newPreview);
        if (response.status === 200) {
          alert("Image created successfully!");

        }
      } catch (err) {
        console.error("Error creating Image:", err);
        alert("Failed to create Image. Please try again.");
      }
    };




    const handleEditButtonClick = (product) => {
      setUpdateProduct({
        pname: product.pname,
        pprice: product.pprice,
        pdesc: product.pdesc,
        pimageurl: product.pimageurl,
        stock: product.stock,
        is_available: product.is_available,
      });
    };

    
     
      

      const handleDelete = async (e) => {
         try {
            if (selectedImageId) {
              const productResponse = await axios.delete(`http://localhost:3000/api/image/${selectedImageId}`);
              setSelectedImageId(null); // reset after delete
              if (productResponse.status === 200) {
              alert("Product is deleted successfully!");
            }
            }
          } catch (err) {
          console.error("Error deleting image:", err);
          alert("Failed to deleting image. Please try again.");
        }
        };

        const handlePreviewsDelete = async (e) => {
         try {
            if (selectedPreviews) {
              const productResponse = await axios.delete(`http://localhost:3000/api/preview/${selectedPreviews}`);
              setSelectedPreviews(null); // reset after delete
              if (productResponse.status === 200) {
              alert("Product image is deleted successfully!");
            }
            }
          } catch (err) {
          console.error("Error deleting image:", err);
          alert("Failed to deleting image. Please try again.");
        }
        };
        



    const handleEditProduct = async (e) => {
      e.preventDefault();
      try {
        const productResponse = await axios.put(`http://localhost:3000/api/product/${selectedPid}`, updateProduct);
        if (productResponse.status === 200) {
          alert("Product is updated successfully!");

        }
      } catch (err) {
        console.error("Error updating Product:", err);
        alert("Failed to updating Product. Please try again.");
      }
    };

    const handleDeleteProducts = async (e) => {
      try {
        const productResponse = await axios.delete(`http://localhost:3000/api/product/${selectedPid}`);
        if (productResponse.status === 200) {
          alert("Product is deleted successfully!");

        }
      } catch (err) {
        console.error("Error deleting Product:", err);
        alert("Failed to deleting Product. Please try again.");
      }
    };

    const handleDeleteVariation = async (e) => {
      try {
        const productResponse = await axios.delete(`http://localhost:3000/api/variation/${selectedpvid}`);
        if (productResponse.status === 200) {
          alert("Variation is deleted successfully!");

        }
      } catch (err) {
        console.error("Error deleting variation:", err);
        alert("Failed deleting variation . Please try again.");
      }
    };

   useEffect(() => {
  const fetchshopData = async () => {
    try {
      const productresponse = await axios.get(`http://localhost:3000/api/product/shop/${shopKey}`);
      const variationResponse = await axios.get(`http://localhost:3000/api/variation`);
      const imageResponse = await axios.get(`http://localhost:3000/api/image`);
      const previewResponse = await axios.get(`http://localhost:3000/api/preview`);
      const products = productresponse.data;
      const variations = variationResponse.data;
      const images = imageResponse.data;
      const preview = previewResponse.data;
      

      
      // Merge productsInfo and variationInfo
      const mergedData = products.map(product => ({
        ...product,
        variations: variations
          .filter(variation => variation.productkey === product.pid)
          .map(variation => ({
            pvname: variation.pvname,
            pvimage: variation.pvimage,
            pvid: variation.pvid,
            productkey: variation.productkey
          })),
          
        images: images
          .filter(images => images.productkey === product.pid)
          .map(images => ({
            pimagename: images.pimagename,
            pimage: images.pimage,
            pimageid: images.pimageid
          })),

          preview: preview
          .filter(preview => preview.productkey === product.pid)
          .map(images => ({
            previewname: images.previewname,
            pimages: images.pimages,
            imageid: images.imageid
          })),
          
      }));



      setProductsInfo(mergedData);
    } catch (error) {
      console.error('Error fetching shop data:', error);
    }
  };
  fetchshopData();
}, [shopKey]);

  const tabCounts = {
    All: 3298,
    Active: 3271,
    Inactive: 837,
    'Out of Stock': 837,
    Draft: '',
    Deleted: ''
  };

  

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(productsInfo.map(p => p.pid));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId) => {
    setSelectedPid(productId === selectedPid ? "" : productId); // toggle selection
    
  };

  const formatPrice = (price) => {
    return `Php ${price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  };
    return(
        <>
        <Header />
        
        <div style={{ backgroundColor: '#f5f5f5', height: '100vh', padding: '0', display: 'flex' }}>
        <div style={{ width: '250px' }}>
            <Sidebar />
        </div>
        <div style={{ backgroundColor: '#f5f5f5', flexGrow: 1, padding: '20px', overflowY: 'auto' }}>
        
                
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0" style={{ fontWeight: 'bold', color: '#333', fontSize: '24px' }}>
            Manage Products
          </h4>
          <button 
            className="btn"
            style={{ 
              backgroundColor: '#4CAF50', 
              color: 'white', 
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
              padding: '6px 12px',
              fontWeight: '500'
              
            }}
             data-bs-toggle="modal"
             data-bs-target="#createProduct"
          >
            Add new Product
          </button>
        </div>

        <div className="mb-4">
          <ul className="nav" style={{ borderBottom: '2px solid #ddd', paddingBottom: '0' }}>
            {Object.entries(tabCounts).map(([tab, count]) => (
              <li className="nav-item me-4" key={tab}>
                <button
                  className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                  style={{ 
                    backgroundColor: 'transparent',
                    color: '#666',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    padding: '8px 0',
                    borderBottom: activeTab === tab ? '2px solid #2196F3' : 'none',
                    marginBottom: '-2px'
                  }}
                >
                  {tab} {count && <span style={{ color: '#999' }}>{count}</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
          <div style={{ flex: '1', minWidth: '250px', maxWidth: '300px' }}>
            <div className="position-relative">
              <input
                type="text"
                className="form-control"
                placeholder="Search by product name, I..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  fontSize: '14px', 
                  paddingRight: '35px',
                  height: '38px',
                  border: '1px solid #ddd'
                }}
              />
              <i 
                className="fas fa-search position-absolute" 
                style={{ 
                  right: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: '#999',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>
          
          <div style={{ minWidth: '120px' }}>
            <select 
              className="form-select"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              style={{ 
                fontSize: '14px',
                height: '38px',
                border: '1px solid #ddd'
              }}
            >
              <option value="">Price</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
          
          <div style={{ minWidth: '120px' }}>
            <select 
              className="form-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ 
                fontSize: '14px',
                height: '38px',
                border: '1px solid #ddd'
              }}
            >
              <option value="">Category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
            </select>
          </div>
          
          <div style={{ minWidth: '120px' }}>
            <div className="position-relative">
              <select 
                className="form-select"
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
                style={{ 
                  fontSize: '14px',
                  height: '38px',
                  border: '1px solid #ddd',
                  paddingLeft: '35px'
                }}
              >
                <option value="">Filter</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
              <i 
                className="fas fa-filter position-absolute" 
                style={{ 
                  left: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: '#999',
                  fontSize: '12px'
                }}
              />
            </div>
          </div>
          
          <div>
            <button 
              className="btn btn-outline-secondary"
              onClick={() => {
                setSearchTerm('');
                setPriceFilter('');
                setCategoryFilter('');
                setFilterOption('');
              }}
              style={{ 
                fontSize: '14px',
                height: '38px',
                border: '1px solid #ddd',
                minWidth: '70px'
              }}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="d-flex align-items-center mb-3">
          <span style={{ fontSize: '14px', color: '#666', marginRight: '16px' }}>
            Selected: 0
          </span>
          <button 
            className="btn me-2"
            style={{ 
              backgroundColor: '#4CAF50', 
              color: 'white', 
              fontSize: '12px',
              padding: '6px 12px',
              border: 'none'
            }}
          >
            Activate
          </button>
          <button 
            className="btn me-2"
            style={{ 
              backgroundColor: '#f44336', 
              color: 'white', 
              fontSize: '12px',
              padding: '6px 12px',
              border: 'none'
            }}
          >
            Deactivate
          </button>
          <button 
            className="btn"
            style={{ 
              backgroundColor: '#757575', 
              color: 'white', 
              fontSize: '12px',
              padding: '6px 12px',
              border: 'none'
            }}
          >
            Delete
          </button>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <table className="table mb-0" style={{ fontSize: '14px' }}>
            <thead style={{ backgroundColor: '#fafafa', borderBottom: '1px solid #e0e0e0' }}>
              <tr>
                <th style={{ 
                  width: '50px', 
                  fontWeight: '600', 
                  color: '#424242', 
                  padding: '16px 12px',
                  fontSize: '14px'
                }}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleSelectAll}
                  />
                </th>
                <th style={{ fontWeight: '600', color: '#424242', padding: '16px 12px', fontSize: '14px' }}>
                  Product
                </th>
                <th style={{ fontWeight: '600', color: '#424242', padding: '16px 40px', fontSize: '14px' }}>
                  SKU
                </th>
                <th style={{ fontWeight: '600', color: '#424242', padding: '16px 12px', fontSize: '14px' }}>
                  Quantity
                </th>
                <th style={{ fontWeight: '600', color: '#424242', padding: '16px 12px', fontSize: '14px' }}>
                  Retail Price
                </th>
                <th style={{ fontWeight: '600', color: '#424242', padding: '16px 12px', fontSize: '14px' }}>
                  Updated on
                </th>
                <th style={{ fontWeight: '600', color: '#424242', padding: '16px 12px', fontSize: '14px' }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {productsInfo.map((product) => (
                <React.Fragment key={product.pid}>
                  <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '16px 12px', verticalAlign: 'middle' }}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedProducts.includes(product.pid)}
                        onChange={() => handleSelectProduct(product.pid)}
                      />
                    </td>
                    <td style={{ padding: '16px 12px', verticalAlign: 'middle' }}>
                      <div className="d-flex align-items-center">
                        <img 
                          className="me-3"
                          src={product.pimageurl}
                          style={{ 
                            width: '48px', 
                            height: '48px', 
                            backgroundColor: '#f5f5f5',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                        </img>
                        <div>
                          <div style={{ 
                            fontSize: '14px', 
                            fontWeight: '500', 
                            color: '#212121',
                            marginBottom: '2px'
                          }}>
                            {product.pname}
                          </div>
                          <div style={{ fontSize: '12px', color: '#757575' }}>
                            Product Id: {product.pid}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ 
                      fontSize: '14px', 
                      color: '#424242', 
                      padding: '16px 12px', 
                      verticalAlign: 'middle' 
                    }}>
                  <div className="row">
                    <div className="col-2">
                       <div className="dropdown">
                          <button 
                            className="btn dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            style={{ 
                              backgroundColor: '#757575',
                              color: 'white',
                              fontSize: '11px',
                              border: 'none'
                            }}
                          >
                            <i class="bi bi-pencil-fill"></i>
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end">
                            <li><button
                              key={product.pid}
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#createVariation"
                              onClick={() => setSelectedPid(product.pid)}
                            >
                            Add
                            </button></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button 
                            className="dropdown-item text-danger" 
                            data-bs-toggle="modal"
                            data-bs-target="#deleteVariation"
                            onClick={() => setSelectedPid(product.pid)}
                            >Delete</button>
                            </li>
                          </ul>
                        </div>
                    </div>
                    <div className="col-5"> <select
                          className="form-select form-select-sm w-auto "
                          value={product.variation || ""}
                        >
                          {product.variations && product.variations.length > 0 ? (
                            product.variations.map((variation, index) => (
                              <option key={index} value={variation.pvname} onClick={() => setActiveTab(variation.pvname)}>
                                {variation.pvname}
                              </option>
                            ))
                          ) : (
                            <option>No Variations</option>
                          )}
                        </select></div>
                    
                  </div>  
                    </td>
                    <td style={{ 
                      fontSize: '14px', 
                      color: '#424242', 
                      padding: '16px 12px', 
                      verticalAlign: 'middle' 
                    }}>
                      {product.stock} 
    
                    </td>
                    <td style={{ 
                      fontSize: '14px', 
                      color: '#424242', 
                      padding: '16px 12px', 
                      verticalAlign: 'middle' 
                    }}>
                      {formatPrice(product.pprice)} 
        
                    </td>
                    <td style={{ 
                      fontSize: '12px', 
                      color: '#757575', 
                      padding: '16px 12px', 
                      verticalAlign: 'middle',
                      whiteSpace: 'pre-line'
                    }}>
                      {(product.update_timestamp).substring(0,10)}
                    </td>
                    <td style={{ padding: '16px 12px', verticalAlign: 'middle' }}>
                      <div className="d-flex align-items-center">
                        <span 
                          className="badge me-3"
                          style={{ 
                            backgroundColor: product.is_available  ? '#4CAF50' : '#f44336',
                            color: 'white',
                            fontSize: '11px',
                            padding: '4px 8px',
                            fontWeight: '500'
                          }}
                        >
                          {product.is_available ? "Active" : "Inactive"}
                        </span>
                        <div className="dropdown">
                          <button 
                            className="btn dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            style={{ 
                              backgroundColor: '#757575',
                              color: 'white',
                              fontSize: '11px',
                              padding: '4px 8px',
                              border: 'none',
                              fontWeight: '500'
                            }}
                          >
                            More
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end">
                            <li><button 
                            className="dropdown-item" 
                            data-bs-toggle="modal"
                            data-bs-target="#updateProduct"
                            onClick={() => {
                                      handleEditButtonClick(product);
                                      setSelectedPid(product.pid);
                                    }}
                            >
                            Edit</button></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button 
                            className="dropdown-item text-danger"
                            onClick={() => {
                                      handleDeleteProducts();
                                      setSelectedPid(product.pid);}}
                            
                            >Delete</button></li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                          <td colSpan="7" style={{ 
                            padding: '12px', 
                            backgroundColor: '#fafafa', 
                            // borderBottom: index === products.length - 1 ? 'none' : '1px solid #f0f0f0'
                          }}>
                      
                            <div className="mb-2">
                              {/* Row content */}
                              <div className="d-flex justify-content-between align-items-center">
                                <span>{product.name}</span>
                                
                                {/* Expand Button */}
                                <button 
                                  className="btn btn-link p-0"
                                  style={{ 
                                    fontSize: '12px', 
                                    color: '#2196F3', 
                                    textDecoration: 'none',
                                    fontWeight: '500'
                                  }}
                                  data-bs-toggle="collapse" 
                                  data-bs-target={`#collapseImages-${product.pid}`} 
                                  aria-expanded="false" 
                                  aria-controls={`collapseImages-${product.pid}`}
                                  onClick={() => setSelectedPid(product.pid)}
                                >
                                  Expand <i className="fas fa-chevron-down ms-1" style={{ fontSize: '10px' }} />
                                </button>
                              </div>

                              <div className="collapse" id={`collapseImages-${product.pid}`}>
                                <div className="row d-flex">
                                        <div className="col-2 card">
                                          <p className="fw-bold text-center pt-2">Product Description Images</p>
                                          <button 
                                          className="btn btn-outline-success w-100 mb-1"
                                          data-bs-toggle="modal" 
                                          data-bs-target={`#productImage`} 
                                          onClick={() => setSelectedPid(product.pid)}
                                          >Add Pictures</button>
                                          <button
                                            className="btn btn-outline-danger w-100"
                                            disabled={!selectedImageId}
                                            onClick={handleDelete}
                                          >
                                            Delete Picture
                                          </button>
                                            </div>

                                        <div className="col-4 card gap-2">
                                          <div className="row">
                                          {product.images && product.images.length > 0 ? (
                                            product.images.map((image) => (
                                               <div className="col-3 pt-2">
                                                  <img
                                                key={image.pimageid}
                                                src={image.pimage}
                                                onClick={() => handleSelect(image.pimageid)}
                                                className={`img-thumbnail ${selectedImageId === image.pimageid ? 'border border-3 border-primary' : ''}`}
                                                style={{
                                                  maxHeight: '100px',
                                                  maxWidth: '100px',
                                                  minHeight: '100px',
                                                  minWidth: '100px',
                                                  cursor: 'pointer',
                                                }}
                                                alt=""
                                              />
                                              </div>
                                              
                                            ))
                                          ) : (
                                            <div>No Images</div>
                                          )}
                                           </div>
                                        </div>


                                        <div className="col-2 card pt-2">
                                          <p className="fw-bold text-center">Product Preview Images</p>
                                          <button 
                                          className="btn btn-outline-success w-100 mb-1"
                                          data-bs-toggle="modal" 
                                          data-bs-target={`#previewImage`} 
                                          onClick={() => setSelectedPid(product.pid)}
                                          >Add Pictures</button>
                                          <button
                                            className="btn btn-outline-danger w-100"
                                            disabled={!selectedPreviews}
                                            onClick={handlePreviewsDelete}
                                          >
                                            Delete Picture
                                          </button>
                                            </div>

                                        <div className="col-4 card gap-2">
                                          <div className="row">
                                            

                                            
                                          {product.preview && product.preview.length > 0 ? (
                                            product.preview.map((images) => (
                                              <div className="col-3 border-0">
                                              <img
                                                key={images.imageid}
                                                src={images.pimages}
                                                onClick={() => handleSelectPreview(images.imageid)}
                                                className={`img-thumbnail ${selectedPreviews === images.imageid ? 'border border-3 border-primary' : ''}`}
                                                style={{
                                                  maxHeight: '100px',
                                                  maxWidth: '100px',
                                                  minHeight: '100px',
                                                  minWidth: '100px',
                                                  cursor: 'pointer',
                                                }}
                                              />
                                               </div>
                                            ))
                                          ) : (
                                            <div>No Images</div>
                                          )}

                                         
                                          </div>
                                        </div>
                                    </div>
                                  </div>
                            </div>
                          


                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
                    

            {/* Create Product Modal */}
              <div
                className="modal fade"
                id="createProduct"
                tabIndex="-1"
                aria-labelledby="createProductLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <form className="modal-content" onSubmit={handleCreateProduct}>
                    <div className="modal-header">
                      <h5 className="modal-title" id="createProductLabel">
                        Create Product
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        {/* Product Name */}
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Product Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={newProduct.pname}
                            onChange={(e) =>
                              setNewProduct({ ...newProduct, pname: e.target.value })
                            }
                            required
                          />
                        </div>
                        {/* Product Image */}
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Product Image</label>
                          <input
                            type="text"
                            className="form-control"
                            value={newProduct.pimageurl}
                            onChange={(e) =>
                              setNewProduct({ ...newProduct, pimageurl: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      
                      {/* Product Price */}
                      <div className="mb-3">
                        <label className="form-label">Product Cost</label>
                        <input
                          type="text"
                          className="form-control"
                          value={newProduct.pprice}
                          onChange={(e) =>
                            setNewProduct({ ...newProduct, pprice: e.target.value })
                          }
                          required
                        />
                      </div>
                      
                      {/* Product Description */}
                      <div className="mb-3">
                        <label className="form-label">Product Description</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          value={newProduct.pdesc}
                          onChange={(e) =>
                            setNewProduct({ ...newProduct, pdesc: e.target.value })
                          }
                          required
                        ></textarea>
                      </div>
                      
                      {/* Stock */}
                      <div className="mb-3">
                        <label className="form-label">Stock</label>
                        <input
                          type="text"
                          className="form-control"
                          value={newProduct.stock}
                          onChange={(e) =>
                            setNewProduct({ ...newProduct, stock: e.target.value })
                          }
                          required
                        />
                      </div>
                      
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-success">
                        Create Product
                      </button>
                      
                    </div>
                  </form>
                </div>
              </div>


               {/* Create Image Modal */}
              <div
                className="modal fade"
                id="productImage"
                tabIndex="-1"
                aria-labelledby="productImageLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <form className="modal-content" onSubmit={handleAddImage}>
                    <div className="modal-header">
                      <h5 className="modal-title" id="productImageLabel">
                        Create AddImage
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        {/* Product Name */}
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Product Image Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={newImage.pimagename}
                            onChange={(e) =>
                              setNewImage({ ...newImage, pimagename: e.target.value })
                            }
                            required
                          />
                        </div>
                        {/* Product Image */}
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Product Image URL</label>
                          <input
                            type="text"
                            className="form-control"
                            value={newImage.pimage}
                            onChange={(e) =>
                              setNewImage({ ...newImage, pimage: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      
                    </div>
                    <div className="modal-footer">
                      <button 
                      type="submit" 
                      className="btn btn-success"
                       onClick={() =>
                          setNewImage({ ...newImage, productkey: selectedPid })
                        }>
                        Add Image
                      </button>
                      
                    </div>
                  </form>
                </div>
              </div>

               {/* Create Image Preview Modal */}
              <div
                className="modal fade"
                id="previewImage"
                tabIndex="-1"
                aria-labelledby="previewImageLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <form className="modal-content" onSubmit={handleAddPreview}>
                    <div className="modal-header">
                      <h5 className="modal-title" id="previewImageLabel">
                        Add Preview Image
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        {/* Product Name */}
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Product Image Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={newPreview.previewname}
                            onChange={(e) =>
                              setNewPreview({ ...newPreview, previewname: e.target.value })
                            }
                            required
                          />
                        </div>
                        {/* Product Image */}
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Product Image URL</label>
                          <input
                            type="text"
                            className="form-control"
                            value={newPreview.pimages}
                            onChange={(e) =>
                              setNewPreview({ ...newPreview, pimages: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      
                    </div>
                    <div className="modal-footer">
                      <button 
                      type="submit" 
                      className="btn btn-success"
                       onClick={() =>
                          setNewPreview({ ...newPreview, productkey: selectedPid })
                        }>
                        Add Image
                      </button>
                      
                    </div>
                  </form>
                </div>
              </div>


              {/* Update Product Modal */}
              <div
                className="modal fade"
                id="updateProduct"
                tabIndex="-1"
                aria-labelledby="updateProductLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <form className="modal-content" onSubmit={handleEditProduct}>
                    <div className="modal-header">
                      <h5 className="modal-title" id="updateProductLabel">
                        Edit Product
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        {/* Product Name */}
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Product Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={updateProduct.pname}
                            onChange={(e) =>
                              setUpdateProduct({ ...updateProduct, pname: e.target.value })
                            }
                            required
                          />
                        </div>
                        {/* Product Image */}
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Product Image</label>
                          <input
                            type="text"
                            className="form-control"
                            value={updateProduct.pimageurl}
                            onChange={(e) =>
                              setUpdateProduct({ ...updateProduct, pimageurl: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      
                      {/* Product Price */}
                      <div className="mb-3">
                        <label className="form-label">Product Cost</label>
                        <input
                          type="text"
                          className="form-control"
                          value={updateProduct.pprice}
                          onChange={(e) =>
                            setUpdateProduct({ ...updateProduct, pprice: e.target.value })
                          }
                          required
                        />
                      </div>
                      
                      {/* Product Description */}
                      <div className="mb-3">
                        <label className="form-label">Product Description</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          value={updateProduct.pdesc}
                          onChange={(e) =>
                            setUpdateProduct({ ...updateProduct, pdesc: e.target.value })
                          }
                          required
                        ></textarea>
                      </div>
                      
                      {/* Stock */}
                      <div className="mb-3">
                        <label className="form-label">Stock</label>
                        <input
                          type="text"
                          className="form-control"
                          value={updateProduct.stock}
                          onChange={(e) =>
                            setUpdateProduct({ ...updateProduct, stock: e.target.value })
                          }
                          required
                        />
                      </div>
                      {/* Availability */}
                      <div className="mb-3">
                        <label className="form-label">Is it available?</label>
                        <div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="availability"
                              value="true"
                              checked={updateProduct.is_available === true}
                              onChange={(e) =>
                                setUpdateProduct({ ...updateProduct, is_available: e.target.value === "true" })
                              }
                            />
                            <label className="form-check-label">Yes</label>
                          </div>

                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="availability"
                              value="false"
                              checked={updateProduct.is_available === false}
                              onChange={(e) =>
                                setUpdateProduct({ ...updateProduct, is_available: e.target.value === "true" })
                              }
                            />
                            <label className="form-check-label">No</label>
                          </div>
                        </div>
                      </div>

                      
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-success">
                        Update Product
                      </button>
                      
                    </div>
                  </form>
                </div>
              </div>

              {/* Create Variation Modal */}
              <div
                className="modal fade"
                id="createVariation"
                tabIndex="-1"
                aria-labelledby="createVariationLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <form className="modal-content" onSubmit={handleCreateVariation}>
                    <div className="modal-header">
                      <h5 className="modal-title" id="createVariation">
                        Create Variation
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        {/* Variation Name */}
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Variation Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={newVariation.pvname}
                            onChange={(e) =>
                              setNewVariation({ ...newVariation, pvname: e.target.value })
                            }
                            required
                          />
                        </div>
                        {/* Product Image */}
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Variation Image</label>
                          <input
                            type="text"
                            className="form-control"
                            value={newVariation.pvimage}
                            onChange={(e) =>
                              setNewVariation({ ...newVariation, pvimage: e.target.value })
                            }
                          
                          />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="submit"
                        onClick={() =>
                          setNewVariation({ ...newVariation, productkey: selectedPid })
                        }
                        className="btn btn-success"
                      >
                        Create Variation
                      </button>
                    </div>

                  </form>
                </div>
              </div>

              {/* Delete Variation Modal */}
              <div
                className="modal fade"
                id="deleteVariation"
                tabIndex="-1"
                aria-labelledby="deleteVariationLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <form className="modal-content" onSubmit={handleDeleteVariation}>
                    <div className="modal-header">
                      <h5 className="modal-title" id="deleteVariation">
                        Delete Variation
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        {/* Variation Name */}
                        {productsInfo.map((product) => (
                           
                            product.variations.map((vari) => (
                              vari.productkey === selectedPid && (
                                  <div className="col-3 pt-2">
                                    <div
                                    key={vari.pvid}
                                    value={vari.pvid}
                                    onClick={() => handleSelectVariation(vari.pvid)}
                                    className={`${selectedpvid === vari.pvid ? 'card text-center border-3 border border-warning' : 'text-center card'}`}
                                    style={{
                                      cursor: 'pointer',
                                  }}
                                  alt=""
                                    >
                                      {vari.pvname}
                                    </div>

                                </div>
                              )
                                
                              ))
                            ))}
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="submit"
                        className="btn btn-danger"
                      >
                        Delete Variation
                      </button>
                    </div>

                  </form>
                </div>
              </div>
             

          

              
        
        </>
        
    );
}