import Sidebar from "../Components/Sidebar";
import Header from "../Components/Sellerheader";
import React, { useState, useEffect } from 'react';

export function Sellerproducts(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [activeTab, setActiveTab] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [filterOption, setFilterOption] = useState('');

 
  const mockProducts = [
    {
      id: 1,
      name: 'Product Name',
      productId: 'ID:012986377',
      sku: 'Pink',
      quantity: 392,
      retailPrice: 19999.99,
      updatedOn: '03/09/2025\n12:11 PM',
      status: 'Active',
      itemCount: 5
    },
    {
      id: 2,
      name: 'Product Name', 
      productId: 'ID:012986377',
      sku: '128GB',
      quantity: 21,
      retailPrice: 104000.99,
      updatedOn: '01/02/2025\n03:21 AM',
      status: 'Inactive',
      itemCount: 2
    }
  ];

  const tabCounts = {
    All: 3298,
    Active: 3271,
    Inactive: 837,
    'Out of Stock': 837,
    Draft: '',
    Deleted: ''
  };

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(products.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
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
          >
            Add new product
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
                <th style={{ fontWeight: '600', color: '#424242', padding: '16px 12px', fontSize: '14px' }}>
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
              {products.map((product, index) => (
                <React.Fragment key={product.id}>
                  <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '16px 12px', verticalAlign: 'middle' }}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                      />
                    </td>
                    <td style={{ padding: '16px 12px', verticalAlign: 'middle' }}>
                      <div className="d-flex align-items-center">
                        <div 
                          className="me-3"
                          style={{ 
                            width: '48px', 
                            height: '48px', 
                            backgroundColor: '#f5f5f5',
                            border: '1px solid #e0e0e0',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <div style={{ 
                            width: '24px', 
                            height: '24px', 
                            backgroundColor: '#ddd',
                            borderRadius: '2px'
                          }} />
                        </div>
                        <div>
                          <div style={{ 
                            fontSize: '14px', 
                            fontWeight: '500', 
                            color: '#212121',
                            marginBottom: '2px'
                          }}>
                            {product.name}
                          </div>
                          <div style={{ fontSize: '12px', color: '#757575' }}>
                            {product.productId}
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
                      {product.sku}
                    </td>
                    <td style={{ 
                      fontSize: '14px', 
                      color: '#424242', 
                      padding: '16px 12px', 
                      verticalAlign: 'middle' 
                    }}>
                      {product.quantity} 
                      <i className="fas fa-edit ms-2" style={{ fontSize: '12px', color: '#999' }} />
                    </td>
                    <td style={{ 
                      fontSize: '14px', 
                      color: '#424242', 
                      padding: '16px 12px', 
                      verticalAlign: 'middle' 
                    }}>
                      {formatPrice(product.retailPrice)} 
                      <i className="fas fa-edit ms-2" style={{ fontSize: '12px', color: '#999' }} />
                    </td>
                    <td style={{ 
                      fontSize: '12px', 
                      color: '#757575', 
                      padding: '16px 12px', 
                      verticalAlign: 'middle',
                      whiteSpace: 'pre-line'
                    }}>
                      {product.updatedOn}
                    </td>
                    <td style={{ padding: '16px 12px', verticalAlign: 'middle' }}>
                      <div className="d-flex align-items-center">
                        <span 
                          className="badge me-3"
                          style={{ 
                            backgroundColor: product.status === 'Active' ? '#4CAF50' : '#f44336',
                            color: 'white',
                            fontSize: '11px',
                            padding: '4px 8px',
                            fontWeight: '500'
                          }}
                        >
                          {product.status}
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
                            <li><a className="dropdown-item" href="#">Edit</a></li>
                            <li><a className="dropdown-item" href="#">Duplicate</a></li>
                            <li><a className="dropdown-item" href="#">View Details</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item text-danger" href="#">Delete</a></li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="7" style={{ 
                      padding: '12px', 
                      backgroundColor: '#fafafa', 
                      borderBottom: index === products.length - 1 ? 'none' : '1px solid #f0f0f0'
                    }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <span style={{ fontSize: '12px', color: '#757575' }}>
                          {product.itemCount} items
                        </span>
                        <button 
                          className="btn btn-link p-0"
                          style={{ 
                            fontSize: '12px', 
                            color: '#2196F3', 
                            textDecoration: 'none',
                            fontWeight: '500'
                          }}
                        >
                          Expand <i className="fas fa-chevron-down ms-1" style={{ fontSize: '10px' }} />
                        </button>
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
        
        </>
        
    );
}