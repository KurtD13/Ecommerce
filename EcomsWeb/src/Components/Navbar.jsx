import { Link } from "react-router-dom"

export function Navbar(){
    return(
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Shop</a>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link to="/" class="nav-link active" aria-current="page" href="#">Home</Link>
              </li>
              <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                <Link to="/resultpage" class="btn btn-primary" type="submit">Search</Link>
              </form>
            </ul>
            <Link to="/Cartpage" class="btn btn-outline-danger me-2">Cart</Link>
            <Link to="/loginpage" class="btn btn-outline-success">Login</Link>
          </div>
        </div>
      </nav>
    );
}
