import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Pages/Login';
import Home from './Pages/Home';
import Register from './Pages/Register';



function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
    </Router>
  )
}


export default App;