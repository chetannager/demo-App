import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, useHistory, Redirect } from 'react-router-dom'
import Header from '../components/Header';

const getJWTToken = () => {
  return localStorage.getItem("JWT_TOKEN");
}

function Home() {
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
      <Header/>
      <h1>Hello World</h1>
    </React.Fragment>
  )
}

export default Home
