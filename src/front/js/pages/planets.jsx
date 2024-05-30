import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/characters.css";
import { Link } from "react-router-dom";
import Tatooine from "../../img/Tatooine_TPM.webp"

export const Planets = () => {
const {store , actions} = useContext(Context);
const [favorites, setFavorites] = useState(store.favorites.map(item => item.name));


const toggleFavorite = (name) => {
    if (favorites.includes(name)) {
        const updatedFavorites = favorites.filter(item => item !== name);
        setFavorites(updatedFavorites);
        actions.removeFavorite(name);
    } else {
        setFavorites([...favorites, name]);
        actions.addFavorites({ name, type: "Planet" });
    }
};

const isFavorite = (name) => favorites.includes(name);

const handlePlanet = (url) => {
    actions.settingPlanetUrl(url);
};
const imgError = (event) => {
    event.target.src = Tatooine;
  }

    return(
        <div className="container mt-4">
            <h4 className="text-light mb-4">Planets</h4>
        {!store.planets ? "No hay datos" :
        <div className="row">  
            {store.planets.map((item , index)=> 
        <div className="col-4" key={index}>
            <div className="card ">
                <img src={`https://starwars-visualguide.com/assets/img/planets/${index+1}.jpg`} alt={item.name} onError={imgError}/>
                <div className="card-body">                                   
                <h5>{item.name}</h5>
                <div className="d-flex justify-content-between">
                    <Link to={`/planetsdetails/${item.uid}`} onClick={() => handlePlanet(item.url)} className="text-warning">Details</Link>    
                    <span onClick={() => toggleFavorite(item.name)} className="align-items-end">
                        <i title="Add Favorite" style={{ cursor: "pointer" }} className={isFavorite(item.name) ? "fas fa-heart text-danger fs-5" : "far fa-heart text-danger fs-5"}></i>
                    </span>
                </div>
                
                </div> 
                </div>
        </div>
            
                )}  
        </div>
        }
        </div>

    )
}