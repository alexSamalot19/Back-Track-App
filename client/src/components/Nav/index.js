import React, { Component } from "react";
import "./style.css";
import Button from "../Button";
import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    if (this.props.page === "home") {
      return (
        <nav className="navbar navbar-dark bg-dark back-track-nav" type="dark">
          <Link to={"./"}>
            <Button type="dark" className="input-lg">
              Home
            </Button>
          </Link>
          <Link to={"./MakeTopic"}>
            <Button type="dark" className="input-lg">
              Edit Topics
            </Button>
          </Link>
          <Link to={"./MakeStudent"}>
            <Button type="dark" className="input-lg">
              New User
            </Button>
          </Link>
        </nav>
      );
    } else {
      return (
        <nav className="navbar navbar-dark bg-dark back-track-nav" type="dark">
          <Link to={"../"}>
            <Button type="dark" className="input-lg">
              Home
            </Button>
          </Link>
          <Link to={"../MakeTopic"}>
            <Button type="dark" className="input-lg">
              Edit Topics
            </Button>
          </Link>
          <Link to={"../MakeStudent"}>
            <Button type="dark" className="input-lg">
              New User
            </Button>
          </Link>
        </nav>
      );
    }
  }
}

export default Nav;
