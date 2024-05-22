import React from "react";
import { Link } from "react-router-dom";
import starWarsLogo from "../../img/star-wars-logo.png"

export const Navbar = () => {
	return (
		
			<>
		<nav className="navbar navbar-expand-lg navbar-custom mx-1">
	  <div className="container">
		<Link className="navbar-brand" to="/">
		  <img src={starWarsLogo} alt="Star wars Logo" height={"50"} />
		</Link>
		<button className="navbar-toggler bg-dark" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
		  <span className="navbar-toggler-icon"></span>
		</button>
		<div className="collapse navbar-collapse justify-content-end" id="navbarNav">
		  <ul className="navbar-nav">
			<li className="nav-item">
			  <Link className="nav-link text-warning" to="/characters">Characters</Link>
			</li>
			<li className="nav-item">
			  <Link className="nav-link text-warning" to="#">Planets</Link>
			</li>
			<li className="nav-item">
			  <Link className="nav-link text-warning" to="#">Spaceships</Link>
			</li>
			<li className="nav-item">
			  <Link className="nav-link text-danger" to="#">Favorites</Link>
			</li>
		  </ul>
		</div>
	  </div>
	</nav>
	</>
	
	);
};
