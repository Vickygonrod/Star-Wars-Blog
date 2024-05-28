import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Tatooine from "../../img/Tatooine_TPM.webp"
import { Link } from "react-router-dom";

export const PlanetDetails = () => {

    const {store, actions} = useContext(Context);

    useEffect(() => {
        actions.getCurrentPlanet();
      }, []);
    

    return (
        <div className="container">
            {!store.currentPlanet ? 'no hay datos' :
            <div className="row">
                <div className="col-row-6 col-row-sm-5 col-row-md-4 col-row-lg-3 col-row-xl-2">
                    <div className="container card">
                        <div className="card-header"><h4 className="card-title col-11">{store.currentPlanet.properties.name}</h4>
                            <span className="col-1 text-secondary"><Link to="/planets/" className="btn-secondary">X</Link>  </span>
                        </div>
                        <img src={`https://starwars-visualguide.com/assets/img/planets/${store.currentPlanet.uid}.jpg`}
                        className="img-fluid rounded-start" onError={(e) => e.target.src = Tatooine}
                       
                    />
                        
                        <div className="card-body text-left">
                            <p className="card-text">Diameter: {store.currentPlanet.properties.diameter}</p>
                            <p className="card-text">Rotation Period: {store.currentPlanet.properties.rotation_period}</p>
                            <p className="card-text">Orbital Period: {store.currentPlanet.properties.orbital_period}</p>
                            <p className="card-text">Gravity: {store.currentPlanet.properties.gravity}</p>
                            <p className="card-text">Population: {store.currentPlanet.properties.population}</p>
                            <p className="card-text">Climate: {store.currentPlanet.properties.climate}</p>
                            <p className="card-text">Terrain: {store.currentPlanet.properties.terrain}</p>
                            <p className="card-text">Surface Water: {store.currentPlanet.properties.surface_water}</p>
                        </div>
                        <div className="card-footer text-body-warning">
                        <span id="heart"><i className="fa-regular fa-heart"></i></span>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>

    )
}