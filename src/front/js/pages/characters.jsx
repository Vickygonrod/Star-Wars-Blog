import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/characters.css";
import { Link } from "react-router-dom";

export const Characters = () => {
const {store , actions} = useContext(Context);
const [favorites, setFavorites] = useState(store.favorites.map(item => item.name));


const toggleFavorite = (name) => {
    if (favorites.includes(name)) {
        const updatedFavorites = favorites.filter(item => item !== name);
        setFavorites(updatedFavorites);
        actions.removeFavorite(name);
    } else {
        setFavorites([...favorites, name]);
        actions.addFavorites({ name, type: "Character" });
    }
};

const isFavorite = (name) => favorites.includes(name);

    return(
        <div className="container mt-4">
            <h4 className="text-light mb-4">Characters</h4>
        {!store.characters ? "No hay datos" :
        <div className="row">  
            {store.characters.map((item , index)=> 
        <div className="col-4">
            <div className="card " >                
                <div className="card " id={index}>
                <img src={`https://starwars-visualguide.com/assets/img/characters/${index+1}.jpg`} alt="" />
                <div className="card-body">                                   
                <h5>{item.name}</h5>
                <div className="card-body d-flex justify-content-between ml-0 pl-0">

                <Link id="details" to={`/charactersdetails/${index}`} className="text-warning ml-0 pl-0"><h6>Details</h6></Link>    
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