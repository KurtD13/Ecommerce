import { Link } from "react-router-dom";
import React from "react";

const Sidebar = () => {
  const linkStyle = {
    display: "block",
    padding: "8px 12px",
    borderRadius: "6px",
    color: "#6c757d", 
    textDecoration: "none",
    marginBottom: "8px",
    transition: "all 0.2s ease",
  };

  const linkHoverStyle = {
    color: "#FE7743",
    backgroundColor: "rgba(254, 119, 67, 0.1)",
  };


  const [hovered, setHovered] = React.useState(null);

  return (
    <div
      className="d-flex flex-column p-3"
      style={{ width: "220px", backgroundColor: "#EFEEEA", height: "100vh" }}
    >
      <div className="mb-4 fw-bold" style={{ color: "#4a4a4a" }}>
        Dashboard
      </div>
      {[
        { to: "/my-shop", label: "My Shop" },
        { to: "/sellerproducts", label: "My Products" },
        { to: "/orders", label: "Orders" },
        { to: "/refund-returns", label: "Cancelled Orders" },
      ].map(({ to, label }, i) => (
        <Link
          key={to}
          to={to}
          style={
            hovered === i
              ? { ...linkStyle, ...linkHoverStyle, cursor: "pointer" }
              : { ...linkStyle, cursor: "pointer" }
          }
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
