import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from "./common/header/Header";
import Details from './screens/details/Details'
import Home from "./screens/home/Home";

function App() {

  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/movie/:id" children={<Details />} />
          <Route path="/" children={<Home />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
