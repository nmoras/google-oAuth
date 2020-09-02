import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Home from './components/Home';
import Google from './components/Google';


function App() {
  return (
    <div className="App">
      <Router>
      {/* <Home /> */}
      <Route exact path="/" component={Home} />
      <Route exact path="/google/redirect" component={Google} />
      </Router>
      

    </div>
  );
}

export default App;
