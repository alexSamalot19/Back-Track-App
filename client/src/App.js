/* global gapi */
import React, { Component } from "react";
import Jumbotron from "./components/Jumbotron";
import Nav from "./components/Nav";
import Input from "./components/Input";
import Button from "./components/Button";
import API from "./utils/API";
import moment from "moment";
import { RecipeList, RecipeListItem } from "./components/RecipeList";
// import { EventList, EventListItem } from "./components/Calendar";
import { Container, Row, Col } from "./components/Grid";
import { GOOGLE_API_KEY, CALENDAR_ID } from "./config.js";
// import { gapi } from "gapi-script";

class App extends Component {
  state = {
    recipes: [],
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
  };

  handleCalendarSubmit = event => {
    this.getEvents();
  };

  handleMakeTopic = event => {
    this.getEvents();
  };

  handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    API.getRecipes(this.state.recipeSearch)
      .then(res => this.setState({ recipes: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    const { time, events } = this.state;

    let eventsList = events.map(function(event) {
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
    });

    return (
      <div>
        <Nav />
        <Jumbotron />
        <Button
          onClick={this.handleCalendarSubmit}
          type="success"
          className="input-lg"
        >
          Calendar
        </Button>

        <Button
          onClick={this.handleMakeTopic}
          type="success"
          className="input-lg"
        >
          Make Topic
        </Button>

        <Container>
          <Row>
            <Col size="md-12">
              {/* <form>
                <Container>
                  <Row>
                    <Col size="xs-9 sm-10">
                      <Input
                        name="recipeSearch"
                        value={this.state.recipeSearch}
                        onChange={this.handleInputChange}
                        placeholder="Search For a Recipe"
                      />
                    </Col>
                    <Col size="xs-3 sm-2">
                      <Button
                        onClick={this.handleFormSubmit}
                        type="success"
                        className="input-lg"
                      >
                        Search
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </form> */}
            </Col>
          </Row>
          <Row>
            <Col size="xs-12">
              <div className="upcoming-meetings">
                <div className="current-time">{time}, 2018</div>
                <h1>Upcoming Meetings</h1>
                <div className="list-group">
                  {/* {this.state.isLoading && loadingState} */}
                  {events.length > 0 && eventsList}
                  {/* {this.state.isEmpty && emptyState} */}
                </div>
              </div>
              {/* {!this.state.recipes.length ? (
                <h1 className="text-center">No Recipes to Display</h1>
              ) : (
                <RecipeList>
                  {this.state.recipes.map(recipe => {
                    return (
                      <RecipeListItem
                        key={recipe.title}
                        title={recipe.title}
                        href={recipe.href}
                        ingredients={recipe.ingredients}
                        thumbnail={recipe.thumbnail}
                      />
                    );
                  })}
                </RecipeList>
              )} */}
            </Col>
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

export default App;
