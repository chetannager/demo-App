import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Pages/Login';
import Home from './Pages/Home';
import Content from './components/Content';
import Register from './Pages/Register';
import Header from './components/Header';
import Customers from './Pages/Customers';
import MyAccount from './Pages/MyAccount';



function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/customers" component={Customers} />
      <Route path="/my-account" component={MyAccount} />
    </Router>
  )
}


export default App;