import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={{backgroundColor: '#FE7743', color: 'white', padding: '1rem'}}>
      <Link to="/" className="btn" style={{color: 'white', textDecoration: 'none'}}>
        <h3 className="fw-bold">EXOtique Seller Center</h3>
      </Link>
    </header>
  )
}
