import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/characters.css";
import { Link } from "react-router-dom";

export const Starships = () => {
const {store} = useContext(Context);

const imgError = (event) => {
    event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
  }

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
                <Link to={`/starshipsdetails/${index}`} className="text-warning">Details</Link>    
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