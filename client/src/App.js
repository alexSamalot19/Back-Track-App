import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// import "./App.css";
import Home from "./pages/home";
import MakeTopic from "./pages/MakeTopic";

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/MakeTopic" component={MakeTopic} />
    </Switch>
  </div>
);

export default App;
