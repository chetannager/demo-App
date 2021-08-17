import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, useHistory, Redirect } from 'react-router-dom'
import Header from '../components/Header';
import { isJwtExpired } from 'jwt-check-expiration';
import { makeStyles } from '@material-ui/core/styles';
import jwt_decode from "jwt-decode";

const getJWTToken = () => {
  return localStorage.getItem("JWT_TOKEN");
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


function Home() {
  const classes = useStyles();
  const history = useHistory();
  const JWT_TOKEN = localStorage.getItem("JWT_TOKEN")
  const [isLoggedIn, setisLoggedIn] = useState(true)
  const [userDetails, setUserDetails] = useState({})

  useEffect(() => {
    if (JWT_TOKEN == null) {
      setisLoggedIn(false)
    } else {
      if (isJwtExpired(JWT_TOKEN)) {
        setisLoggedIn(false);
      } else {
        setUserDetails(jwt_decode(JWT_TOKEN))
        setisLoggedIn(true);
        console.log(userDetails);
      }
    }
  }, [])

  if (isLoggedIn === false) {
    return <Redirect to="/login" />
  }
  return (
    <React.Fragment>
      <Header />

      <table style={{ marginTop: '75px', width: '100%' }}>
        <tr>
          <th>Profile Image</th>
          <td><img src={"https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"} style={{ borderRadius: '50%', width: '50px', height: '50px' }} /></td>
        </tr>

        <tr>
          <th>Full Name</th>
          <td>{userDetails.userFullName}</td>
        </tr>

        <tr>
          <th>Email Address</th>
          <td>{userDetails.userEmailAddress}</td>
        </tr>

        <tr>
          <th>Score</th>
          <td>{userDetails.userScore}</td>
        </tr>
      </table>
    </React.Fragment>
  )
}

export default Home
