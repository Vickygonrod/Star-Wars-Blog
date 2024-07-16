import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditContact = () => {
    const { store, actions } = useContext(Context);
    const id  = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        const contact = store.contacts.find(contact => contact.id === parseInt(id));
        if (contact) {
            setName(contact.name);
            setEmail(contact.email);
            setPhone(contact.phone);
            setAddress(contact.address);
        }
    }, [id, store.contacts]);

    const saveContact = async (updatedContact) => {
        const uri = `https://playground.4geeks.com/contact/agendas/VictoriaG/contacts/${id}`;

        const options = {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(updatedContact)
        };

        const response = await fetch(uri, options);

        if (!response.ok) {
            console.log("Error", response.status, response.statusText);
        }

        actions.getContacts(); // Refresh the contact list after saving
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const dataToUpdate = {
            "name": name,
            "email": email,
            "phone": phone,
            "address": address
        };

        saveContact(dataToUpdate);
        navigate('/contacts');
    };

    const handleClear = () => {
        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
    };

    return (
        <div className="container mt-5 text-light">
            <div className='row'>
                <h2 className='col-10'>Edit Contact</h2>
                <span className='col-2 pl-0 pr-1'><Link to="/contacts"><h5 className='text-secondary float-end'>X</h5></Link>
                </span>
            </div>
            <div className="rounded p-3">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            className="form-control"
                            id="address"
                            name="address"
                            rows="3"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                        ></input>
                    </div>
                    <button type="submit" className="btn btn-warning">Update</button>
                    <button type="button" className="btn btn-danger mx-3" onClick={handleClear}>Clear</button>
                </form>
            </div>
        </div>
    )
}