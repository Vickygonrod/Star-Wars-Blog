import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Contacts = () => {
    const {actions, store} = useContext(Context);
    const [editingContact, setEditingContact] = useState(null);
    const [editingContactName, setEditingContactName] = useState("");

    const startEditingContact = (contact) => {
        setEditingContact(contact);
        setEditingContactName(contact.name);
    };

    const saveContact = async (contact) => {
        await actions.editContact(contact.id, { name: editingContactName });
        setEditingContact(null);
    };
    
    useEffect(() =>{
        actions.deleteContact();
        actions.editContact();
    }, [])
    
    
    return (
        <div className="container text-light">
            <h4 className="mb-3">Contacts</h4>
            {store.contacts.map((item, id)=>

                <div key={id} className="row text-light">
                <ul className="list-group list-group-dark col-md-6 col-sm-8">
                    <li className="list-group-item mb-4 rounded bg-dark text-light">
                    {editingContact && editingContact.id === item.id ? (
                                <div className="d-flex">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editingContactName}
                                        onChange={(e) => setEditingContactName(e.target.value)}
                                    />
                                    <button
                                        className="btn btn-secondary ms-2"
                                        onClick={() => saveContact(item)}
                                    >
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {item.name}
                                    <div id="icons">
                                        <span onClick={() => startEditingContact(item)}>
                                            <i className="fas fa-regular fa-pen-to-square fs-7 text-warning mx-2"></i>
                                        </span>
                                        <span onClick={() => actions.deleteContact(item.id)}>
                                            <i className="fas fa-trash-alt fs-7 text-danger mx-2"></i>
                                        </span>
                                    </div>
                                </>
                            )}
                        </li>
                </ul>
                </div>
            )}
                <Link to="/addcontact" className="btn btn-secondary">Add contact</Link>
        </div>
    )
}