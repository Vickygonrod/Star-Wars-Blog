import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/characters.css";
import { Link } from "react-router-dom";

export const Characters = () => {
const {store , actions} = useContext(Context);

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
                <Link to={`/charactersdetails/${index}`} className="text-warning">Details</Link>    
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