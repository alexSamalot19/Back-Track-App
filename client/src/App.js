import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// import "./App.css";
import Home from "./pages/home";
import MakeTopic from "./pages/MakeTopic";
import MakeStudent from "./pages/MakeStudent";
import User from "./pages/User";

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/MakeTopic" component={MakeTopic} />
      <Route path="/MakeStudent" component={MakeStudent} />
      <Route path="/students/:id" component={User} />
    </Switch>
  </div>
);

export default App;
