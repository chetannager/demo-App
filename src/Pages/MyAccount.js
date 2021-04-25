import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, useHistory, Redirect } from 'react-router-dom'
import Header from '../components/Header'
import { Breadcrumbs, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom'
const getJWTToken = () => {
    return localStorage.getItem("JWT_TOKEN");
  }

function MyAccount() {
    const history = useHistory();
    const JWT_TOKEN = localStorage.getItem("JWT_TOKEN")
    const [isLoggedIn, setisLoggedIn] = useState(true)

    useEffect(() => {
        if (JWT_TOKEN == null) {
            setisLoggedIn(false)
        }
    }, [])

    if (isLoggedIn === false) {
        return <Redirect to="/login" />
    }
    return (
        <React.Fragment>
            <Header />
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" to="/">
                    Home
                </Link>
                <Typography color="textPrimary">My Account</Typography>
            </Breadcrumbs>
            <h1>My Account</h1>
        </React.Fragment>
    )
}

export default MyAccount
