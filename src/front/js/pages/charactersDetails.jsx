import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const CharactersDetails = () => {

    const {store} = useContext(Context);
    const params = useParams();

     
    

    return (
        <>
        

        <div className="container">
        {!store.characters[params.id] ? 'No hay datos' :
            <div className="row">
                <div className="col-row-6 col-row-sm-5 col-row-md-4 col-row-lg-3 col-row-xl-2">
                    <div className="container card">
                        <div className="card-header"><h4 className="card-title col-10">{store.characters[params.id].name}</h4>
                            <span className="col-2 text-secondary"><Link to="/characters/" className="btn-secondary">X</Link>  </span>
                        </div>
                        <img src= {`https://starwars-visualguide.com/assets/img/characters/${params.id_id}.jpg`} alt="name" className="img-top-alt"/>
                        <div className="card-body text-left">
                            <p className="card-text">Height: {store.characters[params.id].height}</p>
                            <p className="card-text">Mass: {store.characters[params.id].mass}</p>
                            <p className="card-text">Hair color: {store.characters[params.id].hair_color}</p>
                            <p className="card-text">Skin color: {store.characters[params.id].skin_color}</p>
                            <p className="card-text">Eye color: {store.characters[params.id].eye_color}</p>
                            <p className="card-text">Birth year: {store.characters[params.id].birth_year}</p>
                            <p className="card-text">Gender: {store.characters[params.id].gender}</p>
                        </div>
                        <div className="card-footer text-body-warning">
                        <span id="heart"><i className="fa-regular fa-heart"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        }
        </div>



                </>
    )
}