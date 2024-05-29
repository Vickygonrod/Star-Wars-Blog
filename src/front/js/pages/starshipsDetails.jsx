import React, { useContext} from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

export const StarshipsDetails = () => {

    const {store} = useContext(Context);
    const params = useParams();
    

    const imgError = (event) => {
        event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
      }

    return (
        <div className="container">
        {!store.starships[params.id] ? 'No hay datos' :
            <div className="row">
                <div className="row border text-light">
                    <div className="col-12">
                        <div className="card-header row">
                            <h4 className="card-title col-10">{store.starships[params.id].name}</h4>
                            <span className="col-2 text-secondary"><Link to="/starships/" className="btn-secondary">X</Link>  </span>
                        </div>
                    </div>
                    <div className="col-6">
                        <img src= {`https://starwars-visualguide.com/assets/img/starships/${params.id_id}.jpg`} alt={store.starships[params.id].name} className="img-top-alt" onError={imgError}/>
                    </div>    
                    <div className="text-left col-6">
                        <div className="card-body">
                            <p className="card-text">Model: {store.starships[params.id].model}</p>
                            <p className="card-text">Mass: {store.starships[params.id].mass}</p>
                            <p className="card-text">Manufacturer: {store.starships[params.id].manufacturer}</p>
                            <p className="card-text">Length: {store.starships[params.id].length}</p>
                            <p className="card-text">Max Atmosphering Speed: {store.starships[params.id].max_atmosphering_speed}</p>
                            <p className="card-text">Crew: {store.starships[params.id].crew}</p>
                            <p className="card-text">Passengers: {store.starships[params.id].passengers}</p>
                            <p className="card-text">Cargo_Capacity: {store.starships[params.id].cargo_capacity}</p>
                            <p className="card-text">Hyperdrive Rating: {store.starships[params.id].hyperdrive_rating}</p>

                        </div>
                    </div>
                </div>
            </div>
        }
        </div>

    )
}