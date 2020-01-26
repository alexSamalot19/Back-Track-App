/* global gapi */
import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Nav from "../components/Nav";
import Input from "../components/Input";
import Button from "../components/Button";
import API from "../utils/API";
import moment from "moment";
import { Container, Row, Col } from "../components/Grid";
import { GOOGLE_API_KEY, CALENDAR_ID } from "../config.js";
import { Link } from "react-router-dom";
import { List, ListItem } from "../components/List";
import LeaderChart from "../components/LeaderChart";
import UserTopicForm from "../components/UserTopicForm";
import { Table, Avatar, Spin, Icon, Modal } from "antd";

class User extends Component {
  state = {
    student: {
      topics: ["E.g.: Volunteer", "E.g.: Chaperone"]
    },
    time: moment().format("dd, Do MMMM, h:mm A"),
    events: [],
    isBusy: false,
    isEmpty: false,
    showLeader: false,
    showCalendar: false,
    isLoading: true,
    isAddTopicModalVisible: false,
    hasStudent: false
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

  openAddTopicModal = () => this.setState({ isAddTopicModalVisible: true });
  closeAddTopicModal = () => this.setState({ isAddTopicModalVisible: false });

  handleCalendarSubmit = event => {
    this.getEvents();
    this.setState({
      showCalendar: !this.state.showCalendar
    });
  };

  handleLeaderboard = event => {
    this.setState({
      showLeader: !this.state.showLeader
    });
  };

  handleTopicModal = event => {
    this.setState({
      isAddTopicModalVisible: !this.state.isAddTopicModalVisible
    });
  };

  fetchStudents = () => {
    this.setState({
      isFetching: false
    });
    API.getAStudent(this.props.match.params.id)
      .then(res =>
        this.setState({
          student: res.data,
          isFetching: false,
          hasStudent: true
        })
      )
      .catch(err => console.log(err));
    console.log(this.props.match.params.id);
  };

  render() {
    const {
      hasStudent,
      showCalendar,
      showLeader,
      time,
      events,
      isAddTopicModalVisible,
      student
    } = this.state;

    let topicsList = student.topics.map(topic => {
      return <LeaderChart showState={showLeader} topicFilter={topic} />;
    });

    let eventsList = events.map(function(event) {
      if (hasStudent) {
        let nameFilter = student.first_name;

        console.log(event.summary.substring(0, nameFilter.length));
        let eventUser = event.summary.substring(0, nameFilter.length);
        if (showCalendar && eventUser === nameFilter) {
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
          Your Events
        </Button>

        <Button
          onClick={this.handleLeaderboard}
          type="dark"
          className="input-lg"
        >
          Leaderboard
        </Button>

        <Button
          onClick={this.handleTopicModal}
          type="dark"
          className="input-lg"
        >
          Log Hours
        </Button>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://calendar.google.com/calendar/r/week?tab=mc&pli=1"
        >
          <Button type="dark" className="input-lg">
            Calendar
          </Button>
        </a>

        <Container>
          <Row>
            <Col size="xs-12">
              <div className="upcoming-meetings">
                <div className="current-time">{time}, 2020</div>
                <div className="list-group">
                  {/* {this.state.isLoading && loadingState} */}
                  {showCalendar && events.length > 0 && eventsList}
                  {/* {this.state.isEmpty && emptyState} */}
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <ul>{showLeader && topicsList}</ul>
          </Row>
          <Row>
            {/* <LeaderChart showState={showLeader} /> */}

            <Modal
              title={
                this.state.student.first_name +
                " " +
                this.state.student.last_name +
                " Add Your Hours for the: " +
                this.state.student.topics
                  .toString()
                  .split(/[,]+/)
                  .join("/")
              }
              visible={isAddTopicModalVisible}
              onOk={this.closeAddTopicModal}
              onCancel={this.closeAddTopicModal}
              width={1000}
            >
              <UserTopicForm
                userName={this.state.student.name}
                userTopics={this.state.student.topics}
              />
            </Modal>
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
