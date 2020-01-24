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
    if (hasData && this.props.showState) {
      let barLabels = [];
      let barLabel = topics[0].name;
      let barData = [];

      let barChart = {
        labels: barLabels,
        datasets: [{ label: barLabel, data: barData }]
      };

      topics.forEach(chartTheData);

      function chartTheData(item, index) {
        barLabels[index] = item.user;
        barData[index] = item.hours;
      }

      return (
        <div className="chart">
          <Bar data={barChart} options={{ maintainAspectRatio: false }} />
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default LeaderChart;
