import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/characters.css";
import { Link } from "react-router-dom";

export const Starships = () => {
const {store} = useContext(Context);
const [favorites, setFavorites] = useState(store.favorites.map(item => item.name));

const imgError = (event) => {
    event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';

  }

    const toggleFavorite = (name) => {
        if (favorites.includes(name)) {
            const updatedFavorites = favorites.filter(item => item !== name);
            setFavorites(updatedFavorites);
            actions.removeFavorite(name);
        } else {
            setFavorites([...favorites, name]);
            actions.addFavorites({ name, type: "Starship" });
        }
    };
    
    const isFavorite = (name) => favorites.includes(name);


    return(
        <div className="container mt-4">
            <h4 className="text-light mb-4">Starships</h4>
        {!store.starships ? "No hay datos" :
        <div className="row">  
            {store.starships.map((item , index)=> 
        <div className="col-4">
            <div className="card " >                
                <div className="card " key={index}>
                <img src={`https://starwars-visualguide.com/assets/img/starships/${index+6}.jpg`} alt={item.name} onError={imgError}/>
                <div className="card-body">                                   
                <h5>{item.name}</h5>
                <div className="card-body d-flex justify-content-between">
                <Link to={`/starshipsdetails/${index}`} className="text-warning align-items-start ml-0 pl-0"> Details </Link>    
                <span onClick={() => toggleFavorite(item.name)} className="align-items-end">
                <i title="Add Favorite" style={{ cursor: "pointer" }} className={isFavorite(item.name) ? "fas fa-heart text-danger fs-5" : "far fa-heart text-danger fs-5"}></i>
                </span>
                
                </div>
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