import { Link } from "react-router-dom"

export function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg "  style={{backgroundColor:'#273F4F'}}>
        <div className="container-fluid">
          <a className="navbar-brand" style={{color:'#FE7743'}} href="/">Shop Name</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex" style={{
                width: '100%',
                fontSize: '16px',
                boxSizing: 'border-box',
              }} role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                <Link to="/resultpage" className="btn btn-primary me-2" type="submit">Search</Link>
              </form>
            <Link to="/Cartpage" style={{background:"#FE7743", color:'#EFEEEA'}} className="btn me-2">Cart</Link>
            <Link to="/loginpage" style={{background:"#FE7743", color:'#EFEEEA'}} className="btn me-2">Login</Link>
            <Link to="/profilepage" style={{background:"#FE7743", color:'#EFEEEA'}} className="btn">Profile</Link>
          </div>
        </div>
      </nav>
    );
}
