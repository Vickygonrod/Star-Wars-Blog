import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const CharactersDetails = () => {

    const {store} = useContext(Context);
    const params = useParams();


    return (
        <>
        

        <div className="container">
        {!store.characters[params.character] ? 'No hay datos' :
            <div className="row border text-light">
                <div className="col-12">
                        <div className="card-header row">
                            <h4 className="card-title col-10">{store.characters[params.character].name}</h4>
                            <span className="text-secondary col-2 px-0"><Link to="/characters/" className="text-secondary float-end">X</Link></span>
                        </div>
                </div>
                <div className="col-6">
                    <img src= {`https://starwars-visualguide.com/assets/img/characters/${parseInt(params.character)+1}.jpg`} alt={store.characters[params.character].name} className="img-top-alt"/>
                </div>
                <div className="text-left col-6">
                    <div className="card-body">
                            <p className="card-text">Height: {store.characters[params.character].height}</p>
                            <p className="card-text">Mass: {store.characters[params.character].mass}</p>
                            <p className="card-text">Hair color: {store.characters[params.character].hair_color}</p>
                            <p className="card-text">Skin color: {store.characters[params.character].skin_color}</p>
                            <p className="card-text">Eye color: {store.characters[params.character].eye_color}</p>
                            <p className="card-text">Birth year: {store.characters[params.character].birth_year}</p>
                            <p className="card-text">Gender: {store.characters[params.character].gender}</p>
                    </div>
                    
                </div>
            </div>
                
        }
        </div>



                </>
    )
}