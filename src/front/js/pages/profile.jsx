import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Login from "./signIn.jsx";


export const Profile = () => {

    const {store, actions} = useContext(Context)

    


    return (


    <>
    {store.accessToken ? 
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="card col-md-6">
                    <h2 className="card-title text-center mb-3 display-5">
                        Profile
                    </h2>
                <div className="card-body">
                    <h5> Email: {store.userData.email}</h5>
                </div>
            </div>
        </div>
    </div>
    :
    <Login />
}
    </>
    )
}