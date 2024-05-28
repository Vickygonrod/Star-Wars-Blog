import React from "react";
import { Link } from "react-router-dom";
import starWarsLogo from "../../img/star-wars-logo.png"

export const Navbar = () => {
	return (
		
	<nav className="navbar navbar-expand-lg mx-1 navbar-dark">
  		<div className="container-fluid">
		  <Link className="navbar-brand" to="/">
		  <img src={starWarsLogo} alt="Star wars Logo" height={"50"} />
		</Link>
    	<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      		<span className="navbar-toggler-icon"></span>
    	</button>
    	<div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
      		<ul className="navbar-nav me-auto mb-2 mb-lg-0">
        		<li className="nav-item">
					<Link className="nav-link text-warning" to="/characters">Characters</Link>
				</li>
        		<li className="nav-item">
					<Link className="nav-link text-warning" to="/planets">Planets</Link>
        		</li>
				<li className="nav-item">
					<Link className="nav-link text-warning" to="/starships">Starships</Link>				</li>
        		<li className="nav-item">
					<Link className="nav-link text-secondary" to="#">Contacts</Link>
        		</li>
        		<li className="nav-item dropdown">
          			<a className="nav-link dropdown-toggle text-danger" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Favourites</a>
          			<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            		<li><a className="dropdown-item" href="#">Action</a></li>
            		<li><a className="dropdown-item" href="#">Another action</a></li>
          			</ul>
        		</li>
        
      		</ul>
      
    	</div>
  		</div>
	</nav>
	
	);
};
