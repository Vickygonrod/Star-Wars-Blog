import React, { useContext } from "react";
import { Link } from "react-router-dom";
import starWarsLogo from "../../img/star-wars-logo.png"
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

    const handleRemoveFavorite = (name) => {
        actions.removeFavorite(name);
    };

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
					<Link className="nav-link text-secondary" to="/contacts">Contacts</Link>
        		</li>
        		<li className="nav-item dropdown">
          			<a className="nav-link dropdown-toggle text-danger" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"> 
					Favorites {store.favorites.length}</a>
          			<ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
					  {store.favorites.length > 0 ? (
                        store.favorites.map((item, index) => (
                            <li key={index} className="dropdown-item text-danger ">

                               <span><h7> {item.name} </h7></span>
                               <span><p> {item.type}</p></span>
							   <span 
							   title="Delete"
							   style={{ cursor: "pointer" }}
							   onClick={() => handleRemoveFavorite(item.name)}>
                                <i className="fas fa-trash-alt fs-7 text-danger mx-2"></i>
                                </span>
                            
                            </li>
                        ))
                    ) : (
                        <li className="dropdown-item">Empty list</li>
                    )}
					</ul>
        		</li>
        
      		</ul>
      
    	</div>
  		</div>
	</nav>
	
	);
};
