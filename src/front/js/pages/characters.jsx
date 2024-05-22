import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/characters.css";

export const Characters = () => {
const {store , actions} = useContext(Context);

    return(
        <div className="container mt-4">
            <h2 className="text-light mb-4">Characters</h2>
        {!store.characters ? "No hay datos" :
        <div className="row">  
        <div className="col-4">
            <div className="card " >                
            {store.characters.map((item)=> 
                <div className="card">
                <img src={`https://starwars-visualguide.com/assets/img/characters/1.jpg`} alt="" />
                <div className="card-body">                                   
                <h5>{item.name}</h5>
                <a href="#" className="text-warning">Details</a>    
                </div> 
                </div>
                )}  
                </div>
            </div>
         </div>
        }
        </div>

    )
}