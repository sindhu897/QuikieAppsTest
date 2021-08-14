import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,Redirect
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import HeroCards from "./components/herocards.js";
import logo from '../src/Assets/QuikieAppsLogo.png'
import SavedData from "./components/savedData.js";
import CryptoData from "./components/cryptodata.js";

function App() {
  return (
    <Router>
      <div className="main">
        <div className="head-class">
            <img src={logo} alt=''/>
        </div>
        <HeroCards/>

        <Switch>

          <Route exact path="/">
            <Redirect to="/home" /> 
          </Route>
          
          <Route path="/home">
            <CryptoData />
          </Route>

          <Route path="/view">
            <SavedData />
          </Route>

        </Switch>
      </div>
      
    </Router>
  );
}

export default App;
