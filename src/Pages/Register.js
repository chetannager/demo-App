import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, useHistory, Redirect } from 'react-router-dom'

const getJWTToken = () => {
    return localStorage.getItem("JWT_TOKEN");
}
function Register() {
    const history = useHistory();
    const JWT_TOKEN = localStorage.getItem("JWT_TOKEN")
    const [isLoggedIn, setisLoggedIn] = useState(true)

    useEffect(() => {
        if (JWT_TOKEN == null) {
            setisLoggedIn(false)
        }
    }, [])

    if (isLoggedIn === true) {
        return <Redirect to="/" />
    }
    return (
        <React.Fragment>
            <h1>Register</h1>
        </React.Fragment>
    )
}

export default Register
