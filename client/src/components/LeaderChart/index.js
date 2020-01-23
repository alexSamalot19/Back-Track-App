import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import API from "../../utils/API";
import Container from "../Container";
import { Table, Avatar, Spin, Icon, Modal } from "antd";

class LeaderChart extends Component {
  state = {
    isFetchingData: false,
    hasData: false,
    chartData: {
      labels: ["Boston", "Worcester", "Amherst"],
      datasets: [{ label: "Population", data: [100, 200, 300] }]
    }
  };

  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics = () => {
    this.setState({
      isFetchingData: true
    });
    API.getTopic()
      .then(res =>
        this.setState({
          topics: res.data,
          isFetchingData: false,
          hasData: true
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    const { hasData, topics, isFetchingData, chartData } = this.state;
    if (hasData) {
      console.log(topics[0].name);
      console.log(topics[0].user);
      console.log(topics[0].hours);

      let barLabels = [topics[0].user, topics[1].user, topics[2].user];
      let barLabel = topics[0].name;
      let barData = [topics[0].hours, topics[1].hours, topics[2].hours];

      let barChart = {
        labels: barLabels,
        datasets: [{ label: barLabel, data: barData }]
      };
      return (
        <div className="chart">
          <Bar data={barChart} options={{ maintainAspectRatio: false }} />
        </div>
      );
    } else {
      return (
        <div className="chart">
          <Bar data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      );
    }

    if (isFetchingData) {
      return (
        <Container>
          <Spin />
        </Container>
      );
    }
  }
}

export default LeaderChart;
