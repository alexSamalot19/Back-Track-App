import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import API from "../../utils/API";

class LeaderChart extends Component {
  state = {
    students: [],
    topics: [],
    isFetchingData: false,
    hasData: false,
    chartData: {
      labels: ["Boston", "Worcester", "Amherst"],
      datasets: [{ label: "Population", data: [100, 200, 300] }]
    }
  };

  componentDidMount() {
    this.fetchTopics();
    this.fetchStudents();
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

  fetchStudents = () => {
    this.setState({
      isFetching: false
    });
    API.getStudent()
      .then(res =>
        this.setState({
          students: res.data,
          isFetching: false
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    const { students, hasData, topics, isFetchingData, chartData } = this.state;

    let barLabel = "Top Contributors";
    let barData = [];
    let i = 0;
    let pieLabels = [];
    let pieData = [];
    let topicUser = "";

    for (let s = 0; s < students.length; s++) {
      pieLabels[s] = String([
        students[s].first_name + " " + students[s].last_name
      ]);
      pieData[s] = 0;
    }

    for (let t = 0; t < topics.length; t++) {
      topicUser = topics[t].user;
      console.log(topicUser);
      console.log(pieLabels[0]);
      for (let s = 0; s < students.length; s++) {
        if (topicUser === pieLabels[s]) {
          pieData[s] = pieData[s] + topics[t].hours;
        }
      }
    }

    let pieChart = {
      labels: pieLabels,
      datasets: [
        {
          label: pieLabels,
          data: pieData,
          backgroundColor: [
            "#0074D9",
            "#FF4136",
            "#2ECC40",
            "#FF851B",
            "#7FDBFF",
            "#B10DC9",
            "#FFDC00",
            "#001f3f",
            "#39CCCC",
            "#01FF70",
            "#85144b",
            "#F012BE",
            "#3D9970",
            "#111111",
            "#AAAAAA"
          ]
        }
      ]
    };
    return (
      <div className="chart">
        <Pie data={pieChart} options={{ maintainAspectRatio: false }} />
      </div>
    );
  }
}

export default LeaderChart;
