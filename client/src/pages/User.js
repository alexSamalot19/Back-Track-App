/* global gapi */
import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Nav from "../components/Nav";
import Input from "../components/Input";
import Button from "../components/Button";
import API from "../utils/API";
import moment from "moment";
import { RecipeList, RecipeListItem } from "../components/RecipeList";
// import { EventList, EventListItem } from "./components/Calendar";
import { Container, Row, Col } from "../components/Grid";
import { GOOGLE_API_KEY, CALENDAR_ID } from "../config.js";
import { Link } from "react-router-dom";
import { List, ListItem } from "../components/List";
import LeaderChart from "../components/LeaderChart";

class User extends Component {
  state = {
    weather: [],
    student: [],
    recipeSearch: "",
    time: moment().format("dd, Do MMMM, h:mm A"),
    events: [],
    isBusy: false,
    isEmpty: false,
    isLoading: true
  };

  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  componentDidMount = () => {
    this.getEvents();
    this.fetchStudents();
  };

  handleCalendarSubmit = event => {
    this.getEvents();
  };

  handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    API.getRecipes(this.state.recipeSearch)
      .then(res => {
        this.setState({ recipes: res.data });
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  fetchStudents = () => {
    this.setState({
      isFetching: false
    });
    API.getAStudent(this.props.match.params.id)
      .then(res =>
        this.setState({
          student: res.data,
          isFetching: false
        })
      )
      .catch(err => console.log(err));
    console.log(this.props.match.params.id);
  };

  handleWeatherSubmit = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    API.getWeather()
      .then(res => {
        this.setState({ weather: res.data });
        console.log("I tried");
        console.log(res);
      })
      .catch(err => console.log(err));
    console.log("new");
    console.log(this.state.weather);

    this.setState({ weather: "sun" });

    console.log("cheating");
  };

  render() {
    // const { topics } = this.state.student;
    // const userTopics = topics;
    // console.log(userTopics);
    // // let topicsList = topics.map(function(topic) {
    // //   return <span className="badge">{topic}</span>;
    // // });

    const { time, events, student } = this.state;
    let nameFilter = student.first_name;
    // let nameFilterSize = student.first_name.length();
    console.log(nameFilter);
    let eventsList = events.map(function(event) {
      console.log(event.summary.substring(0, 3));
      let eventUser = event.summary.substring(0, 3);
      if (eventUser === nameFilter) {
        return (
          <a
            className="list-group-item"
            href={event.htmlLink}
            target="_blank"
            key={event.id}
          >
            {event.summary}{" "}
            <span className="badge">
              {moment(event.start.dateTime).format("h:mm a")},{" "}
              {moment(event.end.dateTime).diff(
                moment(event.start.dateTime),
                "minutes"
              )}{" "}
              minutes, {moment(event.start.dateTime).format("MMMM Do")}{" "}
            </span>
          </a>
        );
      }
    });

    return (
      <div>
        <Nav />
        <Jumbotron />
        <Button
          onClick={this.handleCalendarSubmit}
          type="dark"
          className="input-lg"
        >
          Refresh Calendar
        </Button>

        <Button
          onClick={this.handleWeatherSubmit}
          type="dark"
          className="input-lg"
        >
          Leaderboard (Weather)
        </Button>

        <Button
          onClick={this.handleWeatherSubmit}
          type="dark"
          className="input-lg"
        >
          Refresh Weather
        </Button>

        <Container>
          <Row>
            <Col size="xs-12">
              <div className="upcoming-meetings">
                <div className="current-time">{time}, 2020</div>
                <h1>Your Events</h1>
                <div className="list-group">
                  {/* {this.state.isLoading && loadingState} */}
                  {events.length > 0 && eventsList}
                  {/* {this.state.isEmpty && emptyState} */}
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <LeaderChart />
          </Row>
        </Container>
      </div>
    );
  }

  getEvents() {
    let that = this;
    function start() {
      console.log(GOOGLE_API_KEY);

      gapi.client
        .init({
          apiKey: GOOGLE_API_KEY
        })
        .then(function() {
          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?maxResults=11&orderBy=updated&timeMin=${moment().toISOString()}&timeMax=${moment()
              .endOf("day")
              .toISOString()}`
          });
        })
        .then(
          response => {
            let events = response.result.items;
            console.log(events);
            console.log(response);
            let sortedEvents = events.sort(function(a, b) {
              return (
                moment(b.start.dateTime).format("YYYYMMDD") -
                moment(a.start.dateTime).format("YYYYMMDD")
              );
            });
            if (events.length > 0) {
              that.setState(
                {
                  events: sortedEvents,
                  isLoading: false,
                  isEmpty: false
                }
                // ,
                // () => {
                //   that.setStatus();
                // }
              );
            } else {
              that.setState({
                isBusy: false,
                isEmpty: true,
                isLoading: false
              });
            }
          },
          function(reason) {
            console.log(reason);
          }
        );
    }
    gapi.load("client", start);
  }
}

export default User;
