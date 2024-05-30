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
                <div className="row border text-light">
                    <div className="col-12">
                        <div className="card-header row">
                            <h4 className="card-title col-11">{store.currentPlanet.properties.name}</h4>
                            <span className="col-1 text-secondary px-0"><Link to="/planets/" className="btn-secondary float-end">X</Link>  </span>
                        </div>
                    </div>
                    <div className="col-6">
                        <img src={`https://starwars-visualguide.com/assets/img/planets/${store.currentPlanet.uid}.jpg`}
                        className="img-fluid rounded-start" onError={(e) => e.target.src = Tatooine}
                       
                    />
                    </div>
                    <div className="text-left col-6">
                        <div className="card-body">
                        
                            <p className="card-text">Diameter: {store.currentPlanet.properties.diameter}</p>
                            <p className="card-text">Rotation Period: {store.currentPlanet.properties.rotation_period}</p>
                            <p className="card-text">Orbital Period: {store.currentPlanet.properties.orbital_period}</p>
                            <p className="card-text">Gravity: {store.currentPlanet.properties.gravity}</p>
                            <p className="card-text">Population: {store.currentPlanet.properties.population}</p>
                            <p className="card-text">Climate: {store.currentPlanet.properties.climate}</p>
                            <p className="card-text">Terrain: {store.currentPlanet.properties.terrain}</p>
                            <p className="card-text">Surface Water: {store.currentPlanet.properties.surface_water}</p>
                        </div>
                        </div>
                    </div>
                </div>
            }
        </div>

    )
}