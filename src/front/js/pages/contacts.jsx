import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Contacts = () => {
    const { actions, store } = useContext(Context);
 
   
    useEffect(() =>{
        actions.deleteContact();
        actions.editContact();
    }, [])
    
    
    return (
        <div className="container text-light ">
            <h4 className="mb-3 d-flex justify-content-center ">Contacts</h4>
            {store.contacts.map((item, id)=>

                <div key={id} className="row text-light d-flex justify-content-center">
                <ul className="list-group list-group-dark col-md-6 col-sm-8">
                    <li className="list-group-item mb-4 rounded bg-dark text-light">
                    
                                    {item.name}
                                    <div id="icons">
                                        <Link to={`/editcontact/${item.id}`}>
                                            <i className="fas fa-regular fa-pen-to-square fs-7 text-warning mx-2"></i>
                                        </Link>
                                        <span onClick={() => actions.deleteContact(item.id)}>
                                            <i className="fas fa-trash-alt fs-7 text-danger mx-2"></i>
                                        </span>
                                    </div>
                                
                          
                        </li>
                </ul>
                </div>
            )}
                <div className="d-flex justify-content-center">
                <Link to="/addcontact" className="btn btn-secondary  ">Add contact</Link>
                </div>
        </div>
    )
}